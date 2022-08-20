import { CELL_VALUE, GAME_STATUS, TURN } from './constants.js';
import {
  getCellElementAtIdx,
  getCellElementList,
  getCurrentTurnElement,
  getGameStatusElement,
  getReplayButtonElement,
} from './selectors.js';
import { checkGameStatus } from './utils.js';

// console.log(getCellElementAtIdx(4));
// console.log(getCellElementList());
// console.log(getGameStatusElement());
// console.log(getCurrentTurnElement());

/**
 * Global variables
 */
let currentTurn = TURN.CROSS;
let gameStatus = GAME_STATUS.PLAYING;
let cellValues = new Array(9).fill('');

function toggleTurn() {
  //toggle turn
  currentTurn = currentTurn === TURN.CROSS ? TURN.CIRCLE : TURN.CROSS;

  //update turn on DOM element
  const currentTurnElement = getCurrentTurnElement();
  if (currentTurnElement) {
    currentTurnElement.classList.remove(TURN.CIRCLE, TURN.CROSS);
    currentTurnElement.classList.add(currentTurn);
  }
}

//update game status
function updateGameStatus(newGameStatus) {
  gameStatus = newGameStatus;

  const gameStatusElement = getGameStatusElement();
  if (!gameStatusElement) return;

  gameStatusElement.textContent = newGameStatus;
}

//show replay button
function showReplayButton() {
  const replayButton = getReplayButtonElement();
  if(replayButton) replayButton.classList.add('show');
}

//highlight win cells
function highlightWinCells(winPositions) {
  if(!Array.isArray(winPositions) || winPositions.length !== 3) {
    throw new Error('Invalid win positions');
  }

  for(const position of winPositions) {
    const cell = getCellElementAtIdx(position);
    if(cell) cell.classList.add('win');
  }


}

function handleCellClick(cellElement, index) {
  //check click
  const isClicked = cellElement.classList.contains(TURN.CROSS) || cellElement.classList.contains(TURN.CIRCLE);
  const isEndGame = gameStatus !== GAME_STATUS.PLAYING;
  if (isClicked || isEndGame) return;

  //selected cell
  cellElement.classList.add(currentTurn);

  //update cellValues
  cellValues[index] = currentTurn === TURN.CIRCLE ? CELL_VALUE.CIRCLE : CELL_VALUE.CROSS;
  console.log(cellValues);

  //toggle turn
  toggleTurn();

  //check game status
  const game = checkGameStatus(cellValues);
  switch (game.status) {
    case GAME_STATUS.ENDED:
      //update game status
      updateGameStatus(game.status);

      //show replay button
      showReplayButton();
      break;

    case GAME_STATUS.O_WIN:
    case GAME_STATUS.X_WIN:
      //update game status
      updateGameStatus(game.status);

      //show replay button
      showReplayButton();

      //show highlight win cells
      highlightWinCells(game.winPositions);
      break;

    default:
    //playing
  }
}

function initCellElementList() {
  const cellElementList = getCellElementList();

  cellElementList.forEach((cellElement, index) => {
    cellElement.addEventListener('click', () => handleCellClick(cellElement, index));
  });
}
/**
 * TODOs
 *
 * 1. Bind click event for all cells
 * 2. On cell click, do the following:
 *    - Toggle current turn
 *    - Mark current turn to the selected cell
 *    - Check game state: win, ended or playing
 *    - If game is win, highlight win cells
 *    - Not allow to re-click the cell having value.
 *
 * 3. If game is win or ended --> show replay button.
 * 4. On replay button click --> reset game to play again.
 *
 */

(() => {
  initCellElementList();
})();
