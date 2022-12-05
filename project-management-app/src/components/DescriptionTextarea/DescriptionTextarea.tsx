import React from 'react';
import styles from './DescriptionTextarea.module.css';
import { useTranslation } from 'react-i18next';
import { UseFormRegister } from 'react-hook-form';
import { IFormValues } from 'common/types';

type Props = {
  description?: string;
  register: UseFormRegister<IFormValues>;
  errorMsg: string | undefined;
};

export const DescriptionTextarea = (props: Props) => {
  const { t } = useTranslation();
  const { register, errorMsg } = props;
  const { description } = props || '';

  return (
    <>
      <textarea
        className={`${styles.description}`}
        defaultValue={description}
        placeholder={t('Description') || ''}
        {...register('description', {
          required: { value: true, message: `${t('ThisFieldIsRequired')}` },
          minLength: { value: 2, message: `${t('AtLeast2symbols')}` },
          maxLength: { value: 30, message: `${t('MaxNameLength')}` },
        })}
      ></textarea>
      <p className={styles.authError} id="taskDescError">
        {errorMsg}
      </p>
    </>
  );
};
