import { Column } from 'components/Column/Column';
import { CreateColumn } from 'components/Modals/CreateColumn';
import { CreateTask } from 'components/Modals/CreateTask';
import { DeleteModal } from 'components/Modals/DeleteModal';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openDeleteColumnModal, openDeleteModal, openDeleteTaskModal } from 'redux/ModalSlice';
import { RootState } from 'redux/Store';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import styles from './Board.module.css';
import { deleteUserColumn } from 'redux/BoardSlice';
import AddPreview from '../../assets/icons/add-preview.png';
import { useTranslation } from 'react-i18next';

type TaskProps = {
  id: string;
  title: string;
};

export const Board = () => {
  const { t } = useTranslation();
  const [columns, setColumns] = useState([
    {
      id: 'first',
      title: 'first',
      items: [
        { id: 'task1', title: 'task 1' },
        { id: 'task2', title: 'task 2' },
      ],
    },
    {
      id: 'second',
      title: 'second',
      items: [
        { id: 'task3', title: 'task 3' },
        { id: 'task4', title: 'task 4' },
      ],
    },
  ]);
  const isOpenDeleteColumnModal = useSelector(
    (state: RootState) => state.modal.board.deleteColumnModal
  );
  const { toBeDeleteColumn } = useSelector((state: RootState) => state.board);

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

  const onDeleteColumn = (colId: string) => {
    const columnsNew = columns.filter((el) => el.id !== colId);
    setColumns([...columnsNew]);
  };

  const children = columns.map((column, index) => {
    return (
      <Draggable key={column.id} draggableId={column.id} index={index}>
        {(provided) => {
          return (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <Column
                column={column}
                key={column.id}
                droppableId={column.id}
                onTaskAdd={onTaskAdd}
                onDeleteTask={onDeleteTask}
                onDeleteColumn={onDeleteColumn}
              />
            </div>
          );
        }}
      </Draggable>
    );
  });

  const addColumn = () => {
    // e.preventDefault();
    const newId = 'new' + Math.random();
    const columnsCopy = [...columns];
    columnsCopy.push({ id: newId, title: 'New', items: [] });
    setColumns([...columnsCopy]);
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
        <button onClick={addColumn}>Add column</button>
      </div>
      {/* {createColumnModal && (
        <DeleteModal
          onCancelClick={() => dispatch(openDeleteModal(false))}
          onDeleteClick={async () => {
            await dispatch(deleteUserBoard(toBeDeleteBoard));
            dispatch(fetchUserBoards(userId));
            dispatch(openDeleteModal(false));
          }}
        />
      )} */}
      {/* <CreateColumn /> */}
      {isOpenDeleteColumnModal && (
        <DeleteModal
          onCancelClick={() => dispatch(openDeleteColumnModal(false))}
          onDeleteClick={async () => {
            await dispatch(deleteUserColumn(toBeDeleteColumn));
            // dispatch(fetchUserBoards(userId));
            dispatch(openDeleteModal(false));
          }}
        />
      )}
      {/* <CreateTask /> */}
    </div>
  );
};
