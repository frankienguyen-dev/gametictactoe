import { TURN } from './constants.js';
import { getCellElementAtIdx, getCellElementList, getCurrentTurnElement, getGameStatusElement } from './selectors.js';

// console.log(getCellElementAtIdx(4));
// console.log(getCellElementList());
// console.log(getGameStatusElement());
// console.log(getCurrentTurnElement());

/**
 * Global variables
 */
let currentTurn = TURN.CROSS;
let isGameEnded = false;
let cellValues = new Array(9).fill('');

function toggleTurn() {
  //toggle turn
  currentTurn = currentTurn === TURN.CIRCLE ? TURN.CROSS : TURN.CIRCLE;

  //update turn on DOM element
  const currentTurnElement = getCurrentTurnElement();
  if (currentTurnElement) {
    currentTurnElement.classList.remove('cross', 'circle');
    currentTurnElement.classList.add(currentTurn);
  }
}

function handleCellClick(cellElement, index) {
  //check click
  const isClick = cellElement.classList.contains(TURN.CROSS) || cellElement.classList.contains(TURN.CIRCLE);
  if (isClick) return;

  //set selected cell
  cellElement.classList.add(currentTurn);

  //toggle turn
  toggleTurn();

  console.log({ cellElement, index: index });
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
