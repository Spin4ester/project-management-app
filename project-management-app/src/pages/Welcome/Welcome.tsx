import { DeveloperCard } from 'components/DeveloperCard/DeveloperCard';
import React from 'react';
import { useTranslation } from 'react-i18next';
import YouTube from 'react-youtube';
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
      <YouTube className={styles.video_content} videoId="2cGSmp55ipg" />
      <div className={styles.developers_container}>
        <h3>{t('OurTeam')}:</h3>
        <div className={styles.developers_content}>
          <DeveloperCard
            name={t('Rustam')}
            location={t('BudapestHungary')}
            image={RusPic}
            tasks={[t('BackendDeploy'), t('DesignLayout'), t('BoardsPage')]}
          />
          <DeveloperCard
            name={t('Dasha')}
            location={t('WarsawPoland')}
            image={DashaPic}
            tasks={[t('ProfilePage'), t('Authorization'), t('ServerErrorsHandling')]}
          />
          <DeveloperCard
            name={t('Anya')}
            location={t('MinskBelarus')}
            image={AnnPic}
            tasks={[t('BoardPage'), t('DragNDrop'), t('ErrorPage')]}
          />
        </div>
      </div>
    </div>
  );
}
