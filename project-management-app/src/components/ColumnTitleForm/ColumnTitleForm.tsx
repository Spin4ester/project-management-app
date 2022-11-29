import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from './ColumnTitleForm.module.css';
import CheckedIcon from '../../assets/icons/checked.png';
import CrossIcon from '../../assets/icons/cross.png';
import { useTranslation } from 'react-i18next';

type Props = {
  title: string;
  setTitleEditable: Dispatch<SetStateAction<boolean>>;
};

export const ColumnTitleForm = (props: Props) => {
  const { t } = useTranslation();
  const [titleValue, setTitleValue] = useState(props.title);

  const updateTitle = () => {
    props.setTitleEditable(false);
    if (!titleValue) setTitleValue(props.title);
  };

  const notUpdateTitle = () => {
    props.setTitleEditable(false);
    setTitleValue(props.title);
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
