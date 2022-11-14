import React from 'react';
import './BoardPreview.css';
import EditIcon from '../../assets/icons/edit.png';
import DeleteIcon from '../../assets/icons/delete.png';

export const BoardPreview = () => {
  return (
    <div className="board-preview_container">
      <div className="board-preview_content">
        <div>
          <h6>Board Name</h6>
          <div>
            <img className="board-preview-icon" src={EditIcon} alt="Edit"></img>
            <img className="board-preview-icon" src={DeleteIcon} alt="Delete"></img>
          </div>
        </div>
        <p className="board-preview-description">Board Description</p>
      </div>
    </div>
  );
};
