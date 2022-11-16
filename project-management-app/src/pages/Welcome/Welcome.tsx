import { DeveloperCard } from 'components/DeveloperCard/DeveloperCard';
import React from 'react';
import { useTranslation } from 'react-i18next';
import YouTube from 'react-youtube';
import styles from './Welcome.module.css';

export function Welcome() {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.project_content}>
        <h2>Tik-Task</h2>
        <h4>{t('KanbanTypeProjectManagementApp')}</h4>
      </div>
      <div className={styles.video_content}>
        <YouTube videoId="jfKfPfyJRdk" />
      </div>
      <div className={styles.developers_content}>
        <DeveloperCard name={t('Rustam')} />
        <DeveloperCard name={t('Dasha')} />
        <DeveloperCard name={t('Anya')} />
      </div>
    </div>
  );
}
