import axios from "axios";

export default {
  solve,
  grade,
  validate,
  solvePuzzle,
};

//checks if all values in 9x9 grid are filled
function solve(puzzle: { status: string; difficulty: string; board: any[][] }) {
  let s = true;
  for (let i = 0; i < puzzle.board.length; i++) {
    for (let j = 0; j < puzzle.board[i].length; j++) {
      if (puzzle.board[i][j].val === 0) {
        s = false;
      }
    }
  }
  return s;
}

// Grade assigns a difficulty to a puzzle
// hard: <27, medium: 28-32, easy: 33>
function grade(puzzle: {
  status: string;
  difficulty: string;
  board: any[][];
}): string {
  let z = 0;
  for (let i = 0; i < puzzle.board.length; i++) {
    for (let j = 0; j < puzzle.board[i].length; j++) {
      if (puzzle.board[i][j].val !== 0) {
        z++;
      }
    }
  }
  if (z <= 27) {
    return "hard";
  } else if (z >= 33) {
    return "easy";
  } else {
    return "medium";
  }
}

// CheckUniqueness is used while validating to make sure the value
// isn't repeated in the same row, col or box
function checkUniqueness(
  puzzle: { difficulty: string; status: string; board: any[][] },
  square: { x: number; y: number; val: number; b: number }
): boolean {
  for (let i = 0; i < puzzle.board.length; i++) {
    for (let j = 0; j < puzzle.board[i].length; j++) {
      if (
        square.x !== puzzle.board[i][j].x ||
        square.y !== puzzle.board[i][j].y
      ) {
        if (
          square.x == puzzle.board[i][j].x &&
          square.val === puzzle.board[i][j].val
        ) {
          return false;
        } else if (
          square.y == puzzle.board[i][j].y &&
          square.val == puzzle.board[i][j].val
        ) {
          return false;
        } else if (
          square.b == puzzle.board[i][j].b &&
          square.val == puzzle.board[i][j].val
        ) {
          return false;
        }
      }
    }
  }

  return true;
}

// Validate checks if the sudoku has a valid solution
function validate(puzzle: {
  difficulty: string;
  status: string;
  board: any[][];
}): boolean {
  for (let i = 0; i < puzzle.board.length; i++) {
    for (let j = 0; j < puzzle.board[i].length; j++) {
      if (puzzle.board[i][j].val != 0) {
        let r = checkUniqueness(puzzle, puzzle.board[i][j]);
        if (!r) {
          return false;
        }
      } else {
        return false;
      }
    }
  }
  return true;
}

const encodeBoard = (board: any[]) =>
  board.reduce(
    (result: string, row: string | number | boolean, i: number) =>
      result +
      `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? "" : "%2C"}`,
    ""
  );

const encodeParams = (params: any) =>
  Object.keys(params)
    .map((key) => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
    .join("&");

// didn't get much time to impelemnt solution logic for 9x9 sudoku.
// Hence, using https://sugoku.herokuapp.com/ API to retrieve solved solution.
// Solution status can either be "solved, unsolved, unsolvable or broken".
async function solvePuzzle(board: { board?: any[][] }): Promise<any> {
  try {
    const res = await axios.post(
      "https://sugoku.herokuapp.com/solve",

      encodeParams(board),
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    if (res.status === 200 && res.data) {
      return { solution: res.data.solution, status: res.data.status };
    }
  } catch (error) {
    return { success: false, msg: "Unable to solve board." };
  }
}
