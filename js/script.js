/* eslint-disable quotes */
/* eslint-disable no-useless-return */
// GameBoard module
const DOM = (() => ({
  dataName: document.querySelectorAll("[data-name]"),
  gameBox: document.querySelector(".game__box"),
  gamePlay: document.querySelector(".game__play"),
  gameChoice: document.querySelector(".game__choice"),
  gameEndBtn: document.querySelector(".game__end"),
  gameResult: document.querySelector(".game__result"),
  currentPlayer: document.querySelector(".game__current"),
  gameBtn: this.gamePlay.querySelectorAll("button"),
  restartBtn: this.gameEndBtn.firstElementChild,
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
    for (let i = 0; i < this.gameBtn.length; i += 1) {
      if (board[i] === null) this.gameBtn[i].textContent = "";
      else this.gameBtn[i].textContent = board[i];
    }
  },
}))();
// GameBoard module
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
  const getMark = () => mark;
  const getType = () => playerType;
  const setName = (name) => {
    playerName = name;
  };
  const setType = (type) => {
    playerType = type;
  };
  return { getName, getMark, setName, getType, setType };
};

// Controller module
const Controller = (() => {
  const player1 = Player("Player 1", "", "X");
  const player2 = Player("Player 2", "", "O");
  const player = {};
  const active = [player1];
  const updateBoard = (player, index) => {
    if (GameBoard.getBoard()[index] === null) {
      GameBoard.updateBoard(player.getMake(), index);
      return player;
    }
  };
  // returns result of a round
  const isWinner = (board) => {
    const cases = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < cases.length; i++) {
      const [a, b, c] = cases[i];
      if (board[a] === board[b] && board[a] === board[c])
        return player[board[a]];
    }
  };
  // change player's turn
  const playerTurn = (player) =>
    player.getName() === player1.getName() ? player2 : player1;
  // only change active player on condition true
  const takeTurn = (player, val) => {
    const returnPlayer = updateBoard(player, val);
    if (returnPlayer !== undefined) active[0] = playerTurn(player);
    DOM.render(GameBoard.getBoard());
    playRound();
  };
  // reset whole game
  const playAgain = () => {
    active[0] = player1;
    GameBoard.resetBoard();
  };
  // helper function to remove event
  const onBtnClick = (event) => {
    const btn = event.target;
    const id = DOM.elmAttr(btn, "data-id");
    takeTurn(active[0], +id);
  };
  // get random index from array with null elm
  const lowAiMove = () => {
    const gameBoard = GameBoard.getBoard()
      .map((elm, index) => {
        if (elm === null) return index;
      })
      .filter((elm) => typeof elm === "number");
    const random = Math.floor(Math.random() * gameBoard.length);
    return gameBoard[random];
  };
  // gets id from target btn
  const humanTurn = () => DOM.eListen(DOM.gamePlay, "click", onBtnClick);
  // get index from lowAiMove
  const aiTurn = () => takeTurn(active[0], lowAiMove());
  // start of game
  const playRound = () => {
    const roundResult = isWinner(GameBoard.getBoard());
    if (roundResult !== undefined) {
      DOM.gameResult.textContent = `Winner is ${roundResult}`;
      DOM.classToggle(DOM.restartBtn, "game--hidden");
      DOM.eRemove(DOM.gamePlay, "click", onBtnClick);
      playAgain();
      return;
    }
    if (GameBoard.getBoard().every((elm) => elm !== null) === true) {
      DOM.classToggle(DOM.restartBtn, "game--hidden");
      DOM.gameResult.textContent = "It's a draw";
      playAgain();
      return;
    }
    DOM.currentPlayer.textContent = `Turn :${active[0].getName()}`;
    if (active[0].getType() === "human") humanTurn();
    if (active[0].getType() === "ai") aiTurn();
  };
  // option for play mode
  DOM.eListen(DOM.gameChoice, "click", (event) => {
    let type = DOM.elmAttr(event.target, "data-type");
    if (type === null) return;
    type = type.split(" ");
    player1.setType(type[0]);
    player2.setType(type[1]);
    DOM.classToggle(DOM.gameBox, "game--none");
    DOM.classToggle(DOM.restartBtn, "game--hidden");
    // starts the round
    playRound();
  });
  // button to reset and restart game
  DOM.eListen(DOM.gameEndBtn, "click", (event) => {
    const btn = event.target;
    if (DOM.elmAttr(btn, "data-name") === "reset") {
      DOM.classToggle(DOM.gameChoice, "game--none");
      DOM.classToggle(DOM.gameBox, "game--none");
    }
    playAgain();
    DOM.render(GameBoard.getBoard());
    DOM.gameResult.textContent = "\xA0";
    DOM.classAdd(DOM.restartBtn, "game--hidden");
    if (DOM.elmAttr(btn, "data-name") === "restart") playRound();
  });
})();
