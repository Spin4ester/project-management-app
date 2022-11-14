import { Task } from 'components/Task/Task';
import React from 'react';
import './Column.css';

export const Column = () => {
  return (
    <div className="column_container">
      <h5>Column Name</h5>
      <div className="column_content">
        <Task />
        <Task />
        <Task />
        <Task />
      </div>
    </div>
  );
};
