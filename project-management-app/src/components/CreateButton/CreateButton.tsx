import React from 'react';
import styles from './CreateButton.module.css';
import AddPreview from '../../assets/icons/add-preview.png';
import { useTranslation } from 'react-i18next';

type Props = {
  title: string;
  onClickFunc: () => void;
  type: 'wide' | 'narrow';
};

export const CreateButton = (props: Props) => {
  const { t } = useTranslation();
  const classes = `${styles.container} ${styles[props.type]}`;
  return (
    <div className={classes} onClick={props.onClickFunc}>
      <img src={AddPreview} alt={t(props.title) || 'create'} />
      <h6>{t(props.title)}</h6>
    </div>
  );
};
