import { Board } from 'components/Board/Board';
import React from 'react';
import './Main.css';

export function Main() {
  return (
    <main className="main_container">
      <Board />
      <Board />
      <Board />
      <div>Add Board</div>
    </main>
  );
}
