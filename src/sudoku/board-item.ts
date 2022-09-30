export interface IBoardItem {
  candidates: number[];
  current: number | undefined;
  highlight: boolean;
  isSelected: boolean;
  position: {
    row: number;
    col: number;
  };
}
