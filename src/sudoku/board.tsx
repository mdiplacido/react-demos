import * as React from "react";
import { IBoardItem } from "./board-item";
import "./board.css";

export type CellActivationHandler = (item: IBoardItem) => void;

const makeCellActivationHandler =
  (item: IBoardItem, handler: CellActivationHandler) => (e: any) =>
    handler(item);

// delete key will get translated to zero which means to clear the entry
export type NumberInputHandler = (item: IBoardItem, value: number) => void;

const makeKeyboardEventWrapper =
  (item: IBoardItem, handler: NumberInputHandler) =>
  (e: React.KeyboardEvent) => {
    if (e.key === "Delete") {
      handler(item, 0);
    }
    const n = +e.key;
    if (n > 0 && n < 10) {
      handler(item, n);
    }
  };

export const Board = ({
  state,
  cellActivated,
  numberInputHandler,
}: {
  state: IBoardItem[][];
  cellActivated: CellActivationHandler;
  numberInputHandler: NumberInputHandler;
}) => {
  return (
    <div className="board-container">
      {state.map((cols, rowIdx) => {
        return (
          <div className="flex-grid" key={rowIdx}>
            {cols.map((current, colIdx) => {
              return (
                <div
                  className={
                    "cell" +
                    ((colIdx + 1) % 3 === 0 && colIdx !== 8
                      ? " boarder-right"
                      : "") +
                    ((rowIdx + 1) % 3 === 0 && rowIdx !== 8
                      ? " boarder-bottom"
                      : "") +
                    (current.highlight ? " highlight" : "")
                  }
                  key={colIdx}
                  onClick={makeCellActivationHandler(current, cellActivated)}
                  tabIndex={0} // this index is needed to allow keyboard input
                  onKeyDown={makeKeyboardEventWrapper(
                    current,
                    numberInputHandler
                  )}
                >
                  {current.candidates.join(", ").trim()}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
