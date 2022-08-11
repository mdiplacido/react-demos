import * as React from "react";
import "./board.css";

export const Board = ({ state }: { state: number[][] }) => {
  return (
    <div className="board-container">
      {state.map((cols, idx) => {
        return (
          <div className="flex-grid" key={idx}>
            {cols.map((alive, idx) => {
              return (
                <div
                  className={"cell" + (alive === 1 ? " alive" : "")}
                  key={idx}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
