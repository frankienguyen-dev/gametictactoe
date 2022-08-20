import { TURN } from './constants.js';
import { getCellElementAtIdx, getCellElementList, getCurrentTurnElement, getGameStatusElement } from './selectors.js';
import { checkGameStatus } from './utils.js';

  console.log(checkGameStatus(['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X']));
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
  currentTurn = currentTurn === TURN.CROSS ? TURN.CIRCLE : TURN.CROSS;

  //update turn on DOM element
  const currentTurnElement = getCurrentTurnElement();
  if (currentTurnElement) {
    currentTurnElement.classList.remove(TURN.CIRCLE, TURN.CROSS);
    currentTurnElement.classList.add(currentTurn);
  }
}

function handleCellClick(cellElement, index) {
  //check click
  const isClick = cellElement.classList.contains(TURN.CROSS) || cellElement.classList.contains(TURN.CIRCLE);
  if (isClick) return;

  //selected cell
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
