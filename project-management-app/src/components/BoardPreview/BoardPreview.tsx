import React, { useEffect } from 'react';
import styles from './BoardPreview.module.css';
import EditIcon from '../../assets/icons/edit.png';
import DeleteIcon from '../../assets/icons/delete.png';
import { RootState } from 'Store';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllUserBoards } from 'common/asyncActions/fetchRequests';
import { IUserBoard } from 'common/types';
import { fetchUserBoards } from 'BoardSlice';

export const BoardPreview = () => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const boardPreviews = useSelector((state: RootState) => state.board.previews);
  const isLoaded = useSelector((state: RootState) => state.board.isLoaded);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const navigate = useNavigate();

  console.log(isLoaded);

  return (
    <>
      {boardPreviews.map((el) => (
        <div key={el._id} className={styles.container}>
          <div className={styles.content}>
            <div>
              <h6>Board Name</h6>
              <div>{el.owner}</div>
              <div>
                <img className={styles.icon} src={EditIcon} alt="Edit"></img>
                <img className={styles.icon} src={DeleteIcon} alt="Delete"></img>
              </div>
            </div>
            <p className={styles.description}>Board Description</p>
          </div>
        </div>
      ))}
    </>
  );
};
