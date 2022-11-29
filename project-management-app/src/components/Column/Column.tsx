import { Task } from 'components/Task/Task';
import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styles from './Column.module.css';
import CloseIcon from '../../assets/icons/cancel.png';
import { openDeleteColumnModal } from 'redux/ModalSlice';
import { useDispatch } from 'react-redux';
import { CreateButton } from 'components/CreateButton/CreateButton';
import { ColumnTitleForm } from 'components/ColumnTitleForm/ColumnTitleForm';
import { IUserColumn } from 'common/types';
import { deleteBoardColumn } from 'redux/BoardSlice';

type TaskProps = {
  id: string;
  title: string;
};

type ColumnComponentProps = {
  column: IUserColumn;
  droppableId: string;
  onTaskAdd: (task: TaskProps, colId: string) => void;
  onDeleteTask: (colId: string, taskId: string) => void;
};

export const Column = (props: ColumnComponentProps) => {
  const [isTitleEditable, setTitleEditable] = useState(false);

  const children = props.column?.items?.map((element, index) => {
    return <Task item={element} key={element.id} index={index} onDeleteTask={props.onDeleteTask} />;
  });

  const dispatch = useDispatch();

  const addTask = () => {
    const newId = 'newtask' + Math.random();
    props.onTaskAdd({ title: 'new task', id: newId }, props.droppableId);
  };

  const deleteColumn = (e: React.MouseEvent) => {
    dispatch(deleteBoardColumn(props.column._id));
    dispatch(openDeleteColumnModal(true));
  };

  const showEditTitleForm = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target) setTitleEditable(true);
  };

  return (
    <div className={styles.container} id={props.droppableId}>
      <div className={styles.header}>
        {!isTitleEditable && (
          <>
            <img
              src={CloseIcon}
              alt="Delete column"
              onClick={deleteColumn}
              className={styles.delete_img}
            />
            <h5 className={styles.title} onClick={showEditTitleForm}>
              {props.column.title}
            </h5>
          </>
        )}
        {isTitleEditable && (
          <ColumnTitleForm column={props.column} setTitleEditable={setTitleEditable} />
        )}
      </div>
      <Droppable droppableId={props.droppableId} key={props.droppableId} type="task">
        {(provided) => {
          return (
            <div className={styles.content} {...provided.droppableProps} ref={provided.innerRef}>
              {children}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
      <div>
        <CreateButton title="CreateTask" onClickFunc={addTask} type="narrow" />
      </div>
    </div>
  );
};
