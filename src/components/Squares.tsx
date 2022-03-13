import { ReactChild, ReactFragment, ReactPortal } from "react";

function Square(props: {
  square: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined;
}) {
  return <div className="sudoku-board">{props.square}</div>;
}

export default Square;
