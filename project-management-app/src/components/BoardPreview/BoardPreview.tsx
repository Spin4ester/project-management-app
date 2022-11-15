import React from 'react';
import styles from './BoardPreview.module.css';
import EditIcon from '../../assets/icons/edit.png';
import DeleteIcon from '../../assets/icons/delete.png';

export const BoardPreview = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <h6>Board Name</h6>
          <div>
            <img className={styles.icon} src={EditIcon} alt="Edit"></img>
            <img className={styles.icon} src={DeleteIcon} alt="Delete"></img>
          </div>
        </div>
        <p className={styles.description}>Board Description</p>
      </div>
    </div>
  );
};
