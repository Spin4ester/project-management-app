import { Column } from 'components/Column/Column';
import * as React from 'react';
import './Board.css';

const Board = () => {
  return (
    <div className="board_container">
      <Column />
      <Column />
      <Column />
    </div>
  );
};

export default Board;
