import { DeveloperCard } from 'components/Developer-card/Developer-card';
import React from 'react';
import YouTube from 'react-youtube';
import './Welcome.css';

export function Welcome() {
  return (
    <div className="welcome_container">
      <div className="project_content">
        <h2>Tik-Task</h2>
        <h4>Tik-Task is a Kanban type Project management app</h4>
      </div>
      <div className="video_content">
        <YouTube videoId="jfKfPfyJRdk" />
      </div>
      <div className="developers_content">
        <DeveloperCard name="Rustam" />
        <DeveloperCard name="Dasha" />
        <DeveloperCard name="Anya" />
      </div>
    </div>
  );
}
