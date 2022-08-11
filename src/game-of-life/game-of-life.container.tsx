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

export const GameOfLife = () => {
  const [state, setState] = React.useState(makeInitialState());
  React.useEffect(() => {
    const handle = window.setInterval(() => {
      console.log("computing next game state");
      updateGameState(state);
      setState([...state]);
    }, 2000);

    return () => window.clearTimeout(handle);
  }, []);
  return (
    <>
      <Board state={state} />
    </>
  );
};
