import React from 'react';
import styles from './BoardPreview.module.css';
import EditIcon from '../../assets/icons/edit.png';
import DeleteIcon from '../../assets/icons/delete.png';
import { AppDispatch, RootState } from 'redux/Store';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeBoardPreview, deleteBoardPreview, editBoardPreview } from 'redux/BoardSlice';
import AddPreview from '../../assets/icons/add-preview.png';
import { openCreateBoardModal, openDeleteModal, openEditBoardModal } from 'redux/ModalSlice';
import { useTranslation } from 'react-i18next';
import { IUserBoard } from 'common/types';

export const BoardPreview = () => {
  const { t } = useTranslation();
  const boardPreviews = useSelector((state: RootState) => state.board.previews);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const editBoard = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, el: IUserBoard) => {
    dispatch(changeBoardPreview(el._id));
    e.stopPropagation();
    dispatch(openEditBoardModal(true));
    dispatch(editBoardPreview(el.title));
  };

  const deleteBoard = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, el: IUserBoard) => {
    dispatch(deleteBoardPreview(el._id));
    e.stopPropagation();
    dispatch(openDeleteModal(true));
  };

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
                  editBoard(e, el);
                }}
              ></img>
              <img
                className={styles.icon}
                src={DeleteIcon}
                alt="Delete"
                onClick={(e) => {
                  deleteBoard(e, el);
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
