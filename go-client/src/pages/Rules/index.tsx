// Rules.tsx
import React from 'react';

const RulesPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Rules of Go</h1>
      <p>
        Go is a two-player strategy board game that originated in ancient China. The game is played on a grid board, usually 19x19 intersections.
      </p>
      <p>
        The basic rules of Go are as follows:
      </p>
      <ol className="list-decimal ml-6">
        <li>Players take turns placing stones on the intersections.</li>
        <li>Stones of the same color form connected groups.</li>
        <li>A stone or connected group of stones is captured and removed from the board if it has no liberties (empty adjacent intersections).</li>
        <li>Passing is allowed, and the game ends when both players pass consecutively or agree to end.</li>
        <li>The player with the most territory (empty intersections surrounded by their stones) wins.</li>
      </ol>
      <p>
        These are basic rules, and there are more advanced rules regarding specific situations, scoring, and more.
      </p>
    </div>
  );
};

export default RulesPage;
