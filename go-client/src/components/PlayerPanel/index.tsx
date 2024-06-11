import React from 'react';

interface PlayerPanelProps {
  color: string; // 'black' or 'white'
  playerName: string;
}

const PlayerPanel: React.FC<PlayerPanelProps> = ({ color, playerName }) => {
  return (
    <div>
      <div>
        <p>Name: {playerName}</p>
        <p>Color: {color}</p>
      </div>
    </div>
  );
};

export default PlayerPanel;
