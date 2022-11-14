import { BoardPreview } from 'components/BoardPreview/BoardPreview';
import React from 'react';
import './Main.css';

export function Main() {
  return (
    <main className="main_container">
      <BoardPreview />
      <BoardPreview />
      <BoardPreview />
      <div>Add Board</div>
    </main>
  );
}
