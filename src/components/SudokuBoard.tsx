import sudokuService from "../services/sugoKuService";
import { useEffect } from "react";
import ControlPanel from "./ControlPanel";
import React from "react";
import utilsService from "../utils/mapper";
import Square from "./Squares";

export default function SudokuBoard() {
  const maxLength = 1;
  const [state, setState] = React.useState({
    board: utilsService.makeArray(),
    difficulty: "",
    status: "",
  });

  const fetchBoard = async (difficulty: string) => {
    const response = await sudokuService.getPuzzle(difficulty);
    if (response) {
      const squares = utilsService.getBoard(response);
      setState({
        board: squares,
        difficulty: response.difficulty,
        status: "unsolved",
      });
    }
  };

  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    const newValue =
      +e.target.value === 1
        ? +e.target.value
        : parseInt(e.target.value.toString().substring(0, maxLength));
    let boardCopy = state.board;
    boardCopy[row][col].val = newValue;
    setState({
      ...state,
      board: boardCopy,
    });
  };

  const setup = () => {
    let square = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        square.push(
          <input
            key={i+''+j}
            type="number"
            className={'row'+ i+ ' col'+ j}
            required={true}
            value={state.board[i][j].val !== 0 ? state.board[i][j].val : ""}
            onChange={(e) => {
              if (e.target.value.length > 1) {
                e.preventDefault();
              } else {
                handleValueChange(e, i, j);
              }
            }}
          />
        );
      }
    }
    return square;
  };

  const handleButtonClick = (difficulty: string) => {
    fetchBoard(difficulty);
  };

  const handleClear = () => {
    setState({
      board: utilsService.makeArray(),
      difficulty: "",
      status: "",
    });
    setup();
  };
  const square = setup();

  useEffect(() => {
    fetchBoard("random");
  }, []);

  return (
    <div>
      <Square square={square}></Square>
      {/* <div className="sudoku-board">{square}</div> */}
      <ControlPanel
        state={state}
        updateState={setState}
        onLevelButtonClick={handleButtonClick}
        onClear={handleClear}
      ></ControlPanel>
    </div>
  );
}
