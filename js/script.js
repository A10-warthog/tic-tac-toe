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
