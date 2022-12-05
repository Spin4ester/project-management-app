import React from 'react';
import styles from './ModalFormButtons.module.css';
import { useTranslation } from 'react-i18next';

type Props = {
  btnYes: string;
  btnNo: string;
  onClickNo: () => void;
};

export const ModalFormButtons = ({ btnYes, btnNo, onClickNo }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <button className={styles.button}>{t(btnYes)}</button>
      <button className={styles.button} onClick={onClickNo}>
        {t(btnNo)}
      </button>
    </div>
  );
};
