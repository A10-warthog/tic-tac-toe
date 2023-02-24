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
const Player = (name, type, mark) => {
  let playerName = name;
  let playerType = type;
  const getName = () => playerName;
  const setName = (name) => {
    playerName = name;
  };
  const getMark = () => mark;
  const getType = () => playerType;
  const setType = (type) => {
    playerType = type;
  };
  return { getName, getMark, setName, getType, setType };
};

// Controller module
const Controller = (() => {
  const playerObj = {};
})();
