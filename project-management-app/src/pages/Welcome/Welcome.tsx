import { DeveloperCard } from 'components/Developer-card/Developer-card';
import React from 'react';
import YouTube from 'react-youtube';
import './Welcome.css';

export function Welcome() {
  return (
    <div className="welcome_container">
      <div className="video_content">
        <YouTube videoId="jfKfPfyJRdk" />
      </div>
      <div className="project_content"></div>
      <div className="developers_content">
        <DeveloperCard name="Rustam" />
        <DeveloperCard name="Dasha" />
        <DeveloperCard name="Anya" />
      </div>
    </div>
  );
}
