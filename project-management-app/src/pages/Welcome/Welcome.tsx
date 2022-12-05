import { DeveloperCard } from 'components/DeveloperCard/DeveloperCard';
import React from 'react';
import { useTranslation } from 'react-i18next';
// import YouTube from 'react-youtube';
import styles from './Welcome.module.css';
import RusPic from '../../assets/img/rustam.jpg';
import DashaPic from '../../assets/img/dasha.png';
import AnnPic from '../../assets/img/ann.png';

export function Welcome() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.project_content}>
        <h2 className={styles.logo}>
          <span>T</span>ik-<span>T</span>ask
        </h2>
        <h4>{t('KanbanTypeProjectManagementApp')}</h4>
      </div>
      <div className={styles.video_content}>{/* <YouTube videoId="jfKfPfyJRdk" /> */}</div>
      <div className={styles.developers_container}>
        <h3>{t('OurTeam')}:</h3>
        <div className={styles.developers_content}>
          <DeveloperCard
            name={t('Rustam')}
            location={t('BudapestHungary')}
            image={RusPic}
            tasks={['Backend Deploy', 'Design and layout', 'Boards Page']}
          />
          <DeveloperCard
            name={t('Dasha')}
            location={t('WarsawPoland')}
            image={DashaPic}
            tasks={['Profile Page', 'Authorization', 'Server Errors Handling']}
          />
          <DeveloperCard
            name={t('Anya')}
            location={t('MinskBelarus')}
            image={AnnPic}
            tasks={['Board Page', 'Drag and Drop', '404 page']}
          />
        </div>
      </div>
    </div>
  );
}
