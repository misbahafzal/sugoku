export default {
  mapper,
  makeArray,
  getBoard,
  formatBoard,
};

//NOTE: just wrote these utils functions using Brute Force, it can be rewritten to gain more optimal algorithm complexity.

function mapper(data: any): any[] {
  let squares: any[] = [];
  Object.entries(SquareMapper).map((item) => {
    Object.entries(data.puzzle).map((puzzleItem) => {
      if (item[0] === puzzleItem[0]) {
        let square: any = item[1];
        square["value"] = Number(puzzleItem[1]);
        squares.push(square);
      }
    });
  });
  return squares;
}

//generates board to display on UI
function getBoard(arr: any) {
  let board = makeArray();
  const data = Object.values(mapper(arr));
  data.map((item) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        board[i][j].x = i;
        board[i][j].y = j;
        if (item.x === i && item.y === j) {
          board[i][j].val = item.value;
        }
        board[i][j] = setBlockValue(board[i][j]);
      }
    }
  });
  return board;
}

function setBlockValue(square: {
  x: number;
  y: number;
  val: number;
  b: number;
}) {
  if (square.x < 3) {
    if (square.y < 3) {
      square.b = 0;
    } else if (square.y > 5) {
      square.b = 6;
    } else {
      square.b = 3;
    }
  } else if (square.x > 5) {
    if (square.y < 3) {
      square.b = 2;
    } else if (square.y > 5) {
      square.b = 8;
    } else {
      square.b = 5;
    }
  } else {
    if (square.y < 3) {
      square.b = 1;
    } else if (square.y > 5) {
      square.b = 7;
    } else {
      square.b = 4;
    }
  }
  return square;
}

function makeArray(arr?: any[][]) {
  let board = Array(9)
    .fill([])
    .map(() => Array(9).fill(0));
  if (arr) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        board[i][j] = { x: i, y: j, val: arr[i][j], b: 0 };
        board[i][j] = setBlockValue(board[i][j]);
      }
    }
  } else {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        board[i][j] = { x: 0, y: 0, val: 0, b: 0 };
      }
    }
  }
  return board;
}

function formatBoard(puzzle: any[][]) {
  const formattedBoard = puzzle.map((row) => {
    return row.map((obj) => obj.val);
  });
  return formattedBoard;
}

//TODO: Use for loops to generate mapping. This helps in mapping with Sudoku API generator response to board[][]
export const SquareMapper = {
  A1: { x: 0, y: 0 },
  A2: { x: 0, y: 1 },
  A3: { x: 0, y: 2 },
  A4: { x: 0, y: 3 },
  A5: { x: 0, y: 4 },
  A6: { x: 0, y: 5 },
  A7: { x: 0, y: 6 },
  A8: { x: 0, y: 7 },
  A9: { x: 0, y: 8 },
  B1: { x: 1, y: 0 },
  B2: { x: 1, y: 1 },
  B3: { x: 1, y: 2 },
  B4: { x: 1, y: 3 },
  B5: { x: 1, y: 4 },
  B6: { x: 1, y: 5 },
  B7: { x: 1, y: 6 },
  B8: { x: 1, y: 7 },
  B9: { x: 1, y: 8 },
  C1: { x: 2, y: 0 },
  C2: { x: 2, y: 1 },
  C3: { x: 2, y: 2 },
  C4: { x: 2, y: 3 },
  C5: { x: 2, y: 4 },
  C6: { x: 2, y: 5 },
  C7: { x: 2, y: 6 },
  C8: { x: 2, y: 7 },
  C9: { x: 2, y: 8 },
  D1: { x: 3, y: 0 },
  D2: { x: 3, y: 1 },
  D3: { x: 3, y: 2 },
  D4: { x: 3, y: 3 },
  D5: { x: 3, y: 4 },
  D6: { x: 3, y: 5 },
  D7: { x: 3, y: 6 },
  D8: { x: 3, y: 7 },
  D9: { x: 3, y: 8 },
  E1: { x: 4, y: 0 },
  E2: { x: 4, y: 1 },
  E3: { x: 4, y: 2 },
  E4: { x: 4, y: 3 },
  E5: { x: 4, y: 4 },
  E6: { x: 4, y: 5 },
  E7: { x: 4, y: 6 },
  E8: { x: 4, y: 7 },
  E9: { x: 4, y: 8 },
  F1: { x: 5, y: 0 },
  F2: { x: 5, y: 1 },
  F3: { x: 5, y: 2 },
  F4: { x: 5, y: 3 },
  F5: { x: 5, y: 4 },
  F6: { x: 5, y: 5 },
  F7: { x: 5, y: 6 },
  F8: { x: 5, y: 7 },
  F9: { x: 5, y: 8 },
  G1: { x: 6, y: 0 },
  G2: { x: 6, y: 1 },
  G3: { x: 6, y: 2 },
  G4: { x: 6, y: 3 },
  G5: { x: 6, y: 4 },
  G6: { x: 6, y: 5 },
  G7: { x: 6, y: 6 },
  G8: { x: 6, y: 7 },
  G9: { x: 6, y: 8 },
  H1: { x: 7, y: 0 },
  H2: { x: 7, y: 1 },
  H3: { x: 7, y: 2 },
  H4: { x: 7, y: 3 },
  H5: { x: 7, y: 4 },
  H6: { x: 7, y: 5 },
  H7: { x: 7, y: 6 },
  H8: { x: 7, y: 7 },
  H9: { x: 7, y: 7 },
  I1: { x: 8, y: 0 },
  I2: { x: 8, y: 1 },
  I3: { x: 8, y: 2 },
  I4: { x: 8, y: 3 },
  I5: { x: 8, y: 4 },
  I6: { x: 8, y: 5 },
  I7: { x: 8, y: 6 },
  I8: { x: 8, y: 7 },
  I9: { x: 8, y: 8 },
};
