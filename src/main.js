import Menu from './components/menu';
import Search from './components/search';
import Filter from './components/filter';
import {generateTaskData} from "./data/task-data";
import {generateFilterData} from "./data/filter-data";
import {getRandomInt, renderElementIn, TASKS_COUNT_PER_LOAD} from "./util";

import BoardController from './controllers/board-controller';

const TASKS_COUNT = getRandomInt(20, TASKS_COUNT_PER_LOAD);

const mainBlock = document.querySelector(`.main`);
const mainControlBlock = mainBlock.querySelector(`.main__control`);

const tasks = new Array(TASKS_COUNT).fill(``).map(generateTaskData);

renderElementIn(mainControlBlock, new Menu().getElement());
renderElementIn(mainBlock, new Search().getElement());
renderElementIn(mainBlock, new Filter(generateFilterData(tasks)).getElement());

new BoardController(mainBlock, tasks).init();
