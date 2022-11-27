import React from 'react';
import styles from './DeveloperCard.module.css';
import Checked from '../../assets/icons/checked.png';

type Props = {
  name: string;
  location: string;
  image: string;
  tasks: string[];
};

export const DeveloperCard = ({ name, location, image, tasks }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={image} className={styles.photo}></img>
        <h3>{name}</h3>
        <h6>{location}</h6>
        <div className={styles.tasks}>
          {tasks.map((el) => (
            <div key={el} className={styles.task}>
              <div>{el}</div>
              <img src={Checked} alt="Task"></img>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
