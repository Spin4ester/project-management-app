import { Column } from 'components/Column/Column';
import { CreateColumn } from 'components/Modals/CreateColumn';
import { DeleteModal } from 'components/Modals/DeleteModal';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  openCreateColumnModal,
  openCreateTaskModal,
  openDeleteColumnModal,
  openDeleteTaskModal,
} from 'redux/ModalSlice';
import { AppDispatch, RootState } from 'redux/Store';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import styles from './Board.module.css';
import {
  deleteColumn,
  deleteTask,
  fetchBoard,
  fetchBoardColumns,
  fetchUserTasks,
  updateColumnOrder,
  updateTaskOrder,
} from 'redux/SelectedBoardSlice';
import { CreateButton } from 'components/CreateButton/CreateButton';
import { useParams } from 'react-router-dom';
import { EditTask } from 'components/Modals/EditTask';
import { CreateTask } from 'components/Modals/CreateTask';
import { Loading } from 'components/Loading/Loading';
import { AuthError } from 'components/AuthError/AuthError';
import { t } from 'i18next';
import { Breadcrumb } from 'react-bootstrap';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';

export const Board = () => {
  const boardId = useParams().id || '';
  const userId = useSelector((state: RootState) => state.user.userId);
  const {
    columns,
    tasks,
    toBeDeleteColumn,
    toBeDeleteTask,
    isLoading,
    isAuthError,
    boardTitle,
    serverError,
  } = useSelector((state: RootState) => state.selectedBoard);

  const isOpenDeleteColumnModal = useSelector(
    (state: RootState) => state.modal.board.deleteColumnModal
  );

  const isOpenDeleteTaskModal = useSelector(
    (state: RootState) => state.modal.board.deleteTaskModal
  );

  const children = !columns
    ? []
    : [...columns]
        .sort((col1, col2) => col1.order - col2.order)
        .map((column, index) => {
          return (
            <Draggable key={column._id} draggableId={column._id} index={index}>
              {(provided) => {
                return (
                  <div
                    className={styles.draggable_column}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Column column={{ ...column }} key={column._id} droppableId={column._id} />
                  </div>
                );
              }}
            </Draggable>
          );
        });

  const addColumn = async () => {
    dispatch(openCreateColumnModal(true));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination, type } = result;
    const columnsCopy = [...columns].sort((col1, col2) => col1.order - col2.order);
    const tasksCopy = [...tasks].sort((task1, task2) => task1.order - task2.order);
    const sourcePosition = source.index;
    const destPosition = destination.index;
    switch (type) {
      case 'task':
        if (source.droppableId !== destination.droppableId) {
          const sourceColumn = columnsCopy.find((el) => el._id === source.droppableId);
          const destColumn = columnsCopy.find((el) => el._id === destination.droppableId);
          if (sourceColumn && destColumn) {
            const sourceTasks = tasksCopy.filter((task) => task.columnId === sourceColumn._id);
            const destTasks = tasksCopy.filter((task) => task.columnId === destColumn._id);
            const [removed] = sourceTasks.splice(sourcePosition, 1);
            destTasks.splice(destPosition, 0, removed);
            const newOrderSourceTasks = sourceTasks.map((el, index) => ({
              _id: el._id,
              order: index,
              columnId: sourceColumn._id,
            }));
            const newOrderDestTasks = destTasks.map((el, index) => ({
              _id: el._id,
              order: index,
              columnId: destColumn._id,
            }));
            dispatch(updateTaskOrder(newOrderSourceTasks.concat(newOrderDestTasks)));
          }
        } else {
          const column = columnsCopy.find((el) => el._id === source.droppableId);
          if (column) {
            const columnTasks = tasksCopy.filter((el) => el.columnId === column._id);
            const [removed] = columnTasks.splice(sourcePosition, 1);
            columnTasks.splice(destPosition, 0, removed);
            const newOrderTasks = columnTasks.map((el, index) => ({
              _id: el._id,
              order: index,
              columnId: el.columnId,
            }));
            dispatch(updateTaskOrder(newOrderTasks));
          }
        }
        break;
      case 'column':
        const [removed] = columnsCopy.splice(sourcePosition, 1);
        columnsCopy.splice(destPosition, 0, removed);
        const newOrderColumns = columnsCopy.map((col, index) => ({ _id: col._id, order: index }));
        dispatch(updateColumnOrder(newOrderColumns));
        break;
    }
    return;
  };

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBoardColumns(boardId));
    dispatch(fetchUserTasks(userId));
    dispatch(fetchBoard(boardId));
    dispatch(openCreateTaskModal(false));
  }, [boardId, dispatch, userId]);

  return (
    <>
      {!!serverError.statusCode && <ErrorMessage error={serverError} />}
      <div className={styles.breadcrumbs} key="breadcrumbs">
        <Breadcrumb>
          <Breadcrumb.Item href="/boards" className={styles.breadcrumbs_link}>
            {t('Workspace')}
          </Breadcrumb.Item>
          <Breadcrumb.Item active className={styles.breadcrumbs_active}>
            {boardTitle}
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={styles.container}>
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          <Droppable droppableId="columns" type="column" direction="horizontal">
            {(provided) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={styles.list}
                  id="columns"
                >
                  {children}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
        <div>
          <CreateButton title="CreateColumn" onClickFunc={addColumn} type="wide" />
        </div>
        <CreateColumn />
        <CreateTask />
        <EditTask />
        {isOpenDeleteColumnModal && (
          <DeleteModal
            onCancelClick={() => dispatch(openDeleteColumnModal(false))}
            onDeleteClick={async () => {
              await dispatch(deleteColumn({ boardId, columnId: toBeDeleteColumn }));
              dispatch(fetchBoardColumns(boardId));
              dispatch(fetchUserTasks(userId));
              dispatch(openDeleteColumnModal(false));
            }}
          />
        )}
        {isOpenDeleteTaskModal && (
          <DeleteModal
            onCancelClick={() => dispatch(openDeleteTaskModal(false))}
            onDeleteClick={async () => {
              await dispatch(
                deleteTask({ boardId, columnId: toBeDeleteColumn, taskId: toBeDeleteTask })
              );
              dispatch(fetchBoardColumns(boardId));
              dispatch(fetchUserTasks(userId));
              dispatch(openDeleteTaskModal(false));
            }}
          />
        )}
        {isLoading && <Loading />}
        {isAuthError && <AuthError />}
      </div>
    </>
  );
};
