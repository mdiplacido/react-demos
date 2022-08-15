import * as React from "react";
import { Board } from "./board";
import { updateGameState } from "./update-game";

const makeInitialState = () => {
  return [
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ];
};

const makeRandom = (rows: number, cols: number) => {
  const state = new Array(rows);
  for (let row = 0; row < state.length; row++) {
    const cells = new Array(cols).fill(0);
    state[row] = cells;
    for (let col = 0; col < cells.length; col++) {
      if (Math.random() < 0.5) {
        cells[col] = 1;
      }
    }
  }
  return state;
};

export const GameOfLife = () => {
  const [state, setState] = React.useState(makeRandom(100, 100));
  React.useEffect(() => {
    const handle = window.setInterval(() => {
      console.log("computing next game state");
      const hasChanges = updateGameState(state);
      // hack for now, not the most efficient thing
      // we are causing a complete rerender
      // because we spread the top level state.
      // come up with a way to rerender and make
      // the grid only update cells that have changed...
      setState([...state]);
      if (!hasChanges) {
        console.log("finished, no state changes left");
        window.clearInterval(handle);
      }
    }, 200);

    return () => window.clearInterval(handle);
  }, []);
  return (
    <>
      <Board state={state} />
    </>
  );
};
