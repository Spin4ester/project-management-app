import React, { Dispatch, SetStateAction } from 'react';
import styles from './ColumnTitleForm.module.css';
import CheckedIcon from '../../assets/icons/checked.png';
import CrossIcon from '../../assets/icons/cancel.png';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { fetchBoardColumns, updateColumn } from 'redux/SelectedBoardSlice';
import { IUserColumn } from 'common/types';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { AppDispatch } from 'redux/Store';

type Props = {
  column: IUserColumn;
  setTitleEditable: Dispatch<SetStateAction<boolean>>;
};

interface IFormValues {
  title: string;
}

export const ColumnTitleForm = (props: Props) => {
  const { t } = useTranslation();
  const boardId = useParams().id || '';
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormValues>();
  const dispatch = useDispatch<AppDispatch>();

  const closeUpdateColumnTitle = () => {
    props.setTitleEditable(false);
    reset();
  };

  const onSubmit = async (data: IFormValues) => {
    await dispatch(updateColumn({ ...props.column, title: data.title }));
    dispatch(fetchBoardColumns(boardId));
    closeUpdateColumnTitle();
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <input
        autoFocus
        defaultValue={props.column.title}
        className={styles.input}
        type="text"
        {...register('title', {
          required: { value: true, message: `${t('ThisFieldIsRequired')}` },
          minLength: { value: 2, message: `${t('AtLeast2symbols')}` },
          maxLength: { value: 30, message: `${t('MaxNameLength')}` },
        })}
      />
      <button className={styles.button}>
        <img src={CheckedIcon} alt={t('Update') || 'update'} />
      </button>
      <button className={styles.button} onClick={closeUpdateColumnTitle}>
        <img src={CrossIcon} alt={t('Cancel') || 'cancel'} />
      </button>
      <p className={styles.error}>{errors.title?.message?.toString()}</p>
    </form>
  );
};
