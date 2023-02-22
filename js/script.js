// GameBoard module
const GameBoard = (() => {
  const gameBoard = [];
  gameBoard.length = 9;
  gameBoard.fill(null);
  const getBoard = () => [...gameBoard];
  const printBoard = () => console.log(gameBoard);
  const resetBoard = () => gameBoard.fill(null);
  const updateBoard = (mark, index) => {
    gameBoard[index] = mark;
  };
  return { getBoard, printBoard, resetBoard, updateBoard };
})();

// Player factory
const Player = (name, mark) => {
  let turn = false;
  const getName = () => name;
  const getMark = () => mark;
  // use to check player turn to play
  const getTurn = () => turn;
  // make current player unable to play
  const changeTurn = () => {
    turn = !turn;
  };
  return { getName, getMark, getTurn, changeTurn };
};

// Controller module
const Controller = (() => {
  const playerObj = {};
})();
