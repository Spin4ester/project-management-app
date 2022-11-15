import { DeveloperCard } from 'components/DeveloperCard/DeveloperCard';
import React from 'react';
import YouTube from 'react-youtube';
import styles from './Welcome.module.css';

export function Welcome() {
  return (
    <div className={styles.container}>
      <div className={styles.project_content}>
        <h2>Tik-Task</h2>
        <h4>Tik-Task is a Kanban type Project management app</h4>
      </div>
      <div className={styles.video_content}>
        <YouTube videoId="jfKfPfyJRdk" />
      </div>
      <div className={styles.developers_content}>
        <DeveloperCard name="Rustam" />
        <DeveloperCard name="Dasha" />
        <DeveloperCard name="Anya" />
      </div>
    </div>
  );
}
