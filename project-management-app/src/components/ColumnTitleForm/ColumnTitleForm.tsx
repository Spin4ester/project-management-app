import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from './ColumnTitleForm.module.css';
import CheckedIcon from '../../assets/icons/checked.png';
import CrossIcon from '../../assets/icons/cross.png';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { fetchUserColumns, updateColumn } from 'redux/BoardSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/Store';
import { IUserColumn } from 'common/types';

type Props = {
  column: IUserColumn;
  setTitleEditable: Dispatch<SetStateAction<boolean>>;
};

export const ColumnTitleForm = (props: Props) => {
  const { t } = useTranslation();
  const userId = useSelector((state: RootState) => state.user.userId);
  const [titleValue, setTitleValue] = useState(props.column.title);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();

  const updateTitle = async () => {
    props.setTitleEditable(false);
    if (titleValue) {
      await dispatch(updateColumn({ ...props.column, title: titleValue }));
      dispatch(fetchUserColumns(userId));
    } else {
      setTitleValue(props.column.title);
    }
  };

  const notUpdateTitle = () => {
    props.setTitleEditable(false);
    setTitleValue(props.column.title);
  };

  return (
    <form className={styles.container}>
      <input
        value={titleValue}
        onChange={(e) => {
          setTitleValue(e.target.value);
        }}
      />
      <button className={styles.btn} onClick={updateTitle}>
        <img src={CheckedIcon} alt={t('Update') || 'update'} />
      </button>
      <button className={styles.btn} onClick={notUpdateTitle}>
        <img src={CrossIcon} alt={t('Cancel') || 'cancel'} />
      </button>
    </form>
  );
};
