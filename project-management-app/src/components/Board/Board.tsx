import React from 'react';
import './Board.css';
import EditIcon from '../../assets/icons/edit.png';
import DeleteIcon from '../../assets/icons/delete.png';

export const Board = () => {
  return (
    <div className="board_container">
      <div className="board_content">
        <div>
          <h6>Board Name</h6>
          <div>
            <img className="board-icon" src={EditIcon} alt="Edit"></img>
            <img className="board-icon" src={DeleteIcon} alt="Delete"></img>
          </div>
        </div>
        <p className="board-description">Board Description</p>
      </div>
    </div>
  );
};
