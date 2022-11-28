import { Column } from 'components/Column/Column';
import { CreateColumn } from 'components/Modals/CreateColumn';
import { CreateTask } from 'components/Modals/CreateTask';
import { DeleteModal } from 'components/Modals/DeleteModal';
import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { deleteUserBoard, fetchUserBoards } from 'redux/BoardSlice';
import { openDeleteModal } from 'redux/ModalSlice';
import { RootState } from 'redux/Store';
import { DragDropContext } from 'react-beautiful-dnd';
import styles from './Board.module.css';

export const Board = () => {
  const [columns, setColumns] = useState({
    first: {
      title: 'first',
      items: [
        { id: 'task1', title: 'task 1' },
        { id: 'task2', title: 'task 2' },
      ],
    },
    second: {
      title: 'second',
      items: [
        { id: 'task3', title: 'task 3' },
        { id: 'task4', title: 'task 4' },
      ],
    },
  });

  const onTaskAdd = (task, columnId) => {
    const col = columns;
    col[columnId].items.push(task);
    setColumns({ ...col });
  };

  const onDeleteTask = (colId, taskId) => {
    const col = columns;
    col[colId].items = col[colId].items.filter((el) => el.id !== taskId);
    setColumns({ ...col });
  };

  const onDeleteColumn = (colId) => {
    const col = columns;
    delete col[colId];
    setColumns({ ...col });
  };

  const children = Object.entries(columns).map(([columnId, column], index) => {
    return (
      <Column
        column={column}
        key={columnId}
        droppableId={columnId}
        index={index}
        onTaskAdd={onTaskAdd}
        onDeleteTask={onDeleteTask}
        onDeleteColumn={onDeleteColumn}
      />
    );
  });

  const addColumn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newId = 'new' + Math.random();
    const col = columns;
    col[newId] = { title: 'New', items: [] };
    setColumns({ ...col });
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  // const createColumnModal = useSelector((state: RootState) => state.modal.main.deleteItemModal);

  return (
    <div className={styles.container}>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
        <div className={styles.list}>{children}</div>
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
      {/* <CreateColumn />
      <DeleteModal onDeleteClick={() => {}} onCancelClick={() => {}} />
      <CreateTask /> */}
    </div>
  );
};
