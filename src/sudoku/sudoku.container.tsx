import * as React from "react";
import { Board, CellActivationHandler } from "./board";
import { IBoardItem } from "./board-item";

const makeState: (rows: number, cols: number) => IBoardItem[][] = (
  rows,
  cols
) => {
  const state = new Array(rows);
  for (let row = 0; row < state.length; row++) {
    const cells = new Array<IBoardItem>(cols)
      .fill({
        current: undefined,
        candidates: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        highlight: false,
        isSelected: false,
        position: {
          row,
          col: 0,
        },
      })
      .map((item, i) => ({ ...item, position: { ...item.position, col: i } }));
    state[row] = cells;
  }
  return state;
};

const makeNextStateForCellActivation = (
  state: IBoardItem[][],
  item: IBoardItem
) => {
  // it is not activated. activate it and the relevant row and column and neighbors.
  item.isSelected = true;
  item.highlight = true;
};

const highLightRowsColsAndNeighbors = (
  state: IBoardItem[][],
  item: IBoardItem
) => {
  // data is stored row based, we can highlight a row very easily
  state[item.position.row].forEach((i) => (i.highlight = true));

  // columns: read column and for each row update that position
  state.forEach((row) => (row[item.position.col].highlight = true));

  // find "top left" for the group of 9
  const col = item.position.col - (item.position.col % 3);
  const row = item.position.row - (item.position.row % 3);
  for (let r = row; r < row + 3; r++) {
    for (let c = col; c < col + 3; c++) {
      state[r][c].highlight = true;
    }
  }
};

const clearHighlighting = (state: IBoardItem[][]) => {
  state.forEach((row) => {
    row.forEach((item) => (item.highlight = false));
  });
};

export const Sudoku = () => {
  const [state, setState] = React.useState(makeState(9, 9));
  const lastSelected = React.useRef<IBoardItem | null>(null);
  const handleCellActivation: CellActivationHandler = (item) => {
    console.log("got cell item: " + JSON.stringify(item));
    if (lastSelected.current === item) {
      // no change
      return;
    }
    clearHighlighting(state);
    makeNextStateForCellActivation(state, item);
    if (lastSelected.current !== null) {
      lastSelected.current.isSelected = false;
    }
    lastSelected.current = item;
    highLightRowsColsAndNeighbors(state, item);
    setState([...state]);
  };
  return (
    <>
      <Board state={state} cellActivated={handleCellActivation} />
    </>
  );
};
