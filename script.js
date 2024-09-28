const Gameboard = (() => {
  const board = Array(9).fill(null);

  const getBoard = () => board;
  const resetBoard = () => board.fill(null);

  return { getBoard, resetBoard };
})();

const Player = (name, mark) => {
  return { name, mark };
};

const Game = (() => {
  let currentPlayerIndex = 0;
  const players = [
      Player(prompt("Enter name for Player 1 (X):"), 'X'),
      Player(prompt("Enter name for Player 2 (O):"), 'O')
  ];

  const gameStatus = () => {
      const board = Gameboard.getBoard();
      // Check for winning conditions
      const winningCombinations = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
          [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
          [0, 4, 8], [2, 4, 6]             // diagonals
      ];
      for (let combo of winningCombinations) {
          const [a, b, c] = combo;
          if (board[a] && board[a] === board[b] && board[a] === board[c]) {
              return `${players[currentPlayerIndex].name} wins!`;
          }
      }
      return board.every(cell => cell) ? "It's a tie!" : null;
  };

  const play = (index) => {
      const board = Gameboard.getBoard();
      if (!board[index]) {
          board[index] = players[currentPlayerIndex].mark;
          const status = gameStatus();
          if (status) {
              document.getElementById('status').textContent = status;
              return;
          }
          currentPlayerIndex = (currentPlayerIndex + 1) % 2;
      }
  };

  const resetGame = () => {
      Gameboard.resetBoard();
      currentPlayerIndex = 0;
      document.getElementById('status').textContent = '';
      render();
  };

  const render = () => {
      const gameContainer = document.getElementById('game-container');
      gameContainer.innerHTML = '';
      Gameboard.getBoard().forEach((cell, index) => {
          const cellDiv = document.createElement('div');
          cellDiv.classList.add('cell');
          cellDiv.textContent = cell;
          cellDiv.onclick = () => {
              play(index);
              render();
          };
          gameContainer.appendChild(cellDiv);
      });
  };

  document.getElementById('restart-btn').onclick = resetGame;

  return { render, resetGame };
})();

// Initial render
Game.render();
