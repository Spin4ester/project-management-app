import React from 'react';
import './Task.css';
import DeleteIcon from '../../assets/icons/delete.png';

export const Task = () => {
  return (
    <div className="task_container">
      <p>Task title</p>
      <img src={DeleteIcon} alt="Delete task" />
    </div>
  );
};
