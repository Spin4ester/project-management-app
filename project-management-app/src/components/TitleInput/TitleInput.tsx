import React from 'react';
import styles from './TitleInput.module.css';
import { useTranslation } from 'react-i18next';
import { UseFormRegister } from 'react-hook-form';
import { IFormValues } from 'common/types';

type Props = {
  title?: string;
  register: UseFormRegister<IFormValues>;
  errorMsg: string | undefined;
};

export const TitleInput = (props: Props) => {
  const { t } = useTranslation();
  const { register, errorMsg } = props;
  const { title } = props || '';

  return (
    <>
      <input
        autoFocus
        autoComplete="off"
        className={`${styles.input}`}
        placeholder={t('Title') || ''}
        defaultValue={title}
        type="text"
        {...register('title', {
          required: { value: true, message: `${t('ThisFieldIsRequired')}` },
          minLength: { value: 2, message: `${t('AtLeast2symbols')}` },
          maxLength: { value: 30, message: `${t('MaxNameLength')}` },
        })}
      ></input>
      <p className={styles.authError} id="taskTitleError">
        {errorMsg}
      </p>
    </>
  );
};
