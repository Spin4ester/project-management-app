import React, { useEffect } from 'react';
import styles from './BoardPreview.module.css';
import EditIcon from '../../assets/icons/edit.png';
import DeleteIcon from '../../assets/icons/delete.png';
import { RootState } from 'redux/Store';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllUserBoards } from 'common/asyncActions/fetchRequests';
import { IUserBoard } from 'common/types';
import {
  changeBoard,
  changeBoardPreview,
  deleteBoardPreview,
  deleteUserBoard,
  fetchUserBoards,
} from 'redux/BoardSlice';
import AddPreview from '../../assets/icons/add-preview.png';
import { openCreateBoardModal, openDeleteModal, openEditBoardModal } from 'redux/ModalSlice';
import { useTranslation } from 'react-i18next';

export const BoardPreview = () => {
  const { t } = useTranslation();
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const boardPreviews = useSelector((state: RootState) => state.board.previews);
  const isLoaded = useSelector((state: RootState) => state.board.isLoaded);
  const createBoardModal = useSelector((state: RootState) => state.modal.createBoardModal);
  const editBoardModal = useSelector((state: RootState) => state.modal.editBoardModal);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(boardPreviews);

  return (
    <>
      {boardPreviews.map((el) => (
        <div
          key={el._id}
          className={styles.container}
          onClick={() => {
            navigate(`/boards/${el._id}`);
          }}
        >
          <div className={styles.content}>
            <h6>{el.title}</h6>
            <div className={styles.icons_container}>
              <img
                className={styles.icon}
                src={EditIcon}
                alt="Edit"
                onClick={(e) => {
                  dispatch(changeBoardPreview(el._id));
                  e.stopPropagation();
                  dispatch(openEditBoardModal(true));
                }}
              ></img>
              <img
                className={styles.icon}
                src={DeleteIcon}
                alt="Delete"
                onClick={(e) => {
                  dispatch(deleteBoardPreview(el._id));
                  e.stopPropagation();
                  dispatch(openDeleteModal(true));
                }}
              ></img>
            </div>
          </div>
        </div>
      ))}
      <div className={styles.add_board} onClick={() => dispatch(openCreateBoardModal(true))}>
        <img src={AddPreview} alt="Add board" />
        <h6>{t('CreateBoard')}</h6>
      </div>
    </>
  );
};
