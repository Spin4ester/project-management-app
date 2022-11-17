import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Profile.module.css';

export function Profile() {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.profile_content}>
        <h5>{t('Hello')}, CurrentUserName</h5>
        <img
          src="https://scontent.fbud7-3.fna.fbcdn.net/v/t1.6435-9/119920384_115330163654373_6210440884851267154_n.jpg?stp=cp0_dst-jpg_e15_fr_q65&_nc_cat=103&ccb=1-7&_nc_sid=85a577&efg=eyJpIjoidCJ9&_nc_ohc=5ItISnGs9qQAX92FT7e&_nc_ht=scontent.fbud7-3.fna&oh=00_AfDiNIt0nuUUkfNGeK7fg_iiw6l-6QqeCvQYmPLyKBRGVg&oe=639CD22D"
          alt="Profile pic"
        />
        <button className={styles.button}>{t('UpdateImage')}</button>
        <button className={styles.button}>{t('DeleteUser')}</button>
      </div>
      <div className={styles.profile_edit}>
        <input className={styles.input} placeholder="Edit name"></input>
        <input className={styles.input} placeholder="Edit password"></input>
        <button className={styles.button}>{t('UpdateProfile')}</button>
      </div>
    </div>
  );
}
