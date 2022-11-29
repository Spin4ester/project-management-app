import { Column } from 'components/Column/Column';
import { CreateColumn } from 'components/Modals/CreateColumn';
import { CreateTask } from 'components/Modals/CreateTask';
import { DeleteModal } from 'components/Modals/DeleteModal';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  openCreateColumnModal,
  openDeleteColumnModal,
  openDeleteModal,
  openDeleteTaskModal,
} from 'redux/ModalSlice';
import { RootState } from 'redux/Store';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import styles from './Board.module.css';
import { createColumn, deleteColumn, fetchUserColumns, fetchUserTasks } from 'redux/BoardSlice';
import { CreateButton } from 'components/CreateButton/CreateButton';
import { useParams } from 'react-router-dom';

type TaskProps = {
  id: string;
  title: string;
};

export const Board = () => {
  const boardId = useParams().id || '';
  const userId = useSelector((state: RootState) => state.user.userId);
  const { columns, tasks, toBeDeleteColumn } = useSelector((state: RootState) => state.board);

  const isOpenDeleteColumnModal = useSelector(
    (state: RootState) => state.modal.board.deleteColumnModal
  );

  const onTaskAdd = (task: TaskProps, columnId: string) => {
    const columnsCopy = [...columns];
    columnsCopy.find((el) => el.id === columnId)?.items.push(task);
    setColumns([...columnsCopy]);
  };

  const onDeleteTask = (colId: string, taskId: string) => {
    const columnsCopy = [...columns];
    const col = columnsCopy.find((el) => el.id === colId);
    if (col) {
      col.items = col.items.filter((el) => el.id !== taskId);
    }
    setColumns([...columnsCopy]);
  };

  const children = columns.map((column, index) => {
    return (
      <Draggable key={column._id} draggableId={column._id} index={index}>
        {(provided) => {
          return (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <Column
                column={{ ...column }}
                key={column._id}
                droppableId={column._id}
                onTaskAdd={onTaskAdd}
                onDeleteTask={onDeleteTask}
              />
            </div>
          );
        }}
      </Draggable>
    );
  });

  const addColumn = async () => {
    dispatch(openCreateColumnModal(true));
    // await dispatch(
    //   createColumn({
    //     column: {
    //       title: 'New',
    //       order: 0,
    //     },
    //     boardId,
    //   })
    // );
    // dispatch(fetchUserColumns(userId));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination, type } = result;
    const columnsCopy = [...columns];
    const sourcePosition = source.index;
    const destPosition = destination.index;
    switch (type) {
      case 'task':
        if (source.droppableId !== destination.droppableId) {
          const sourceColumn = columnsCopy.find((el) => el.id === source.droppableId);
          const destColumn = columnsCopy.find((el) => el.id === destination.droppableId);
          if (sourceColumn && destColumn) {
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(sourcePosition, 1);
            destItems.splice(destPosition, 0, removed);
            sourceColumn.items = sourceItems;
            destColumn.items = destItems;
            setColumns([...columnsCopy]);
          }
        } else {
          const column = columnsCopy.find((el) => el.id === source.droppableId);
          if (column) {
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(sourcePosition, 1);
            copiedItems.splice(destPosition, 0, removed);
            column.items = copiedItems;
            setColumns([...columnsCopy]);
          }
        }
        break;
      case 'column':
        const [removed] = columnsCopy.splice(sourcePosition, 1);
        columnsCopy.splice(destPosition, 0, removed);
        setColumns([...columnsCopy]);
        break;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchUserColumns(userId));
    dispatch(fetchUserTasks(userId));
  }, [userId]);

  return (
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
      {isOpenDeleteColumnModal && (
        <DeleteModal
          onCancelClick={() => dispatch(openDeleteColumnModal(false))}
          onDeleteClick={async () => {
            await dispatch(deleteColumn({ boardId, columnId: toBeDeleteColumn }));
            dispatch(fetchUserColumns(userId));
            dispatch(fetchUserTasks(userId));
            dispatch(openDeleteColumnModal(false));
          }}
        />
      )}
      {/* <CreateTask /> */}
    </div>
  );
};
