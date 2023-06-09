import React from "react";

const GameModeSelector = ({ vsComputer, onChange }) => {
  return (
    <label className="play-against-computer">
      <input
        type="checkbox"
        checked={vsComputer}
        onChange={onChange}
      />
      Play against the computer
    </label>
  );
};

export default GameModeSelector;
