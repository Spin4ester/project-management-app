import { Task } from 'components/Task/Task';
import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styles from './Column.module.css';
import CloseIcon from '../../assets/icons/cancel.png';
import CheckedIcon from '../../assets/icons/checked.png';
import CrossIcon from '../../assets/icons/cross.png';

export const Column = (props) => {
  const [isTitleEditable, setTitleEditable] = useState(false);
  const [titleValue, setTitleValue] = useState(props.column.title);

  const children = props.column?.items?.map((element, index) => {
    return <Task item={element} key={element.id} index={index} onDeleteTask={props.onDeleteTask} />;
  });

  const addTask = (e: React.MouseEvent) => {
    e.preventDefault();
    const newId = 'newtask' + Math.random();
    props.onTaskAdd({ title: 'new task', id: newId }, props.droppableId);
  };

  const deleteColumn = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target) {
      const colId = (target.parentNode?.parentNode as HTMLElement)?.getAttribute('id');
      props.onDeleteColumn(colId);
    }
  };

  const showUpdateTitleForm = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target) {
      setTitleEditable(true);
    }
  };

  const notUpdateTitle = () => {
    setTitleEditable(false);
    setTitleValue(props.column.title);
  };

  const updateTitle = () => {
    setTitleEditable(false);
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
            <h5 className={styles.title} onClick={showUpdateTitleForm}>
              {props.column.title}
            </h5>
          </>
        )}
        {isTitleEditable && (
          <form className={styles.title_form}>
            <input
              value={titleValue}
              onChange={(e) => {
                setTitleValue(e.target.value);
              }}
            />
            <button className={styles.edit_btn} onClick={updateTitle}>
              <img src={CheckedIcon} alt="Update title" />
            </button>
            <button className={styles.edit_btn} onClick={notUpdateTitle}>
              <img src={CrossIcon} alt="Not update title" />
            </button>
          </form>
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
        <button onClick={addTask}>Add task</button>
      </div>
    </div>
  );
};
