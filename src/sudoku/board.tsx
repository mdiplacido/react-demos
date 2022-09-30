import * as React from "react";
import { IBoardItem } from "./board-item";
import "./board.css";

export type CellActivationHandler = (item: IBoardItem) => void;

const makeCellActivationHandler =
  (item: IBoardItem, handler: CellActivationHandler) => (e: any) =>
    handler(item);

export const Board = ({
  state,
  cellActivated,
}: {
  state: IBoardItem[][];
  cellActivated: CellActivationHandler;
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
