// GameBoard module

const DOM = (() => {
  return {
    dataName: document.querySelectorAll("[data-name]"),
    gameBox: document.querySelector(".game__box"),
    gamePlay: document.querySelector(".game__play"),
    gameChoice: document.querySelector(".game__choice"),
    gameEndBtn: document.querySelector(".game__end"),
    gameResult: document.querySelector(".game__result"),
    currentPlayer: document.querySelector(".game__current"),
    gameBtn: this.gamePlay.querySelectorAll("button"),
    eListen(elm, type, func) {
      elm.addEventListener(type, func);
    },
    eRemove(elm, type, func) {
      elm.removeEventListener(type, func);
    },
    classToggle(elm, cls) {
      elm.classList.toggle(cls);
    },
    classAdd(elm, cls) {
      elm.classList.add(cls);
    },
    elmAttr(elm, attr) {
      return elm.getAttribute(attr);
    },
    render(board) {
      for (let i = 0; i < gameBtn.length; i++) {
        if (board[i] === null) gameBtn[i].textContent = "";
        else gameBtn[i].textContent = board[i];
      }
    };

  };
})();

const GameBoard = (() => {
  const gameBoard = Array(9).fill(null);
  const getBoard = () => [...gameBoard];
  const resetBoard = () => Array(9).fill(null);
  const updateBoard = (mark, index) => {
    gameBoard[index] = mark;
  };
  return { getBoard, resetBoard, updateBoard };
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
