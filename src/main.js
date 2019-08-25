import Menu from './components/menu';
import Search from './components/search';
import Filter from './components/filter';
import Board from './components/board';
import LoadMoreButton from './components/load-more-button';
import TaskEdit from './components/task-edit';
import Task from './components/task';
import {generateTaskData} from "./data/task-data";
import {generateFilterData} from "./data/filter-data";
import {getRandomInt, Position, renderElementIn} from "./util";

const TASKS_COUNT_PER_LOAD = 8;
const TASKS_COUNT = getRandomInt(20, TASKS_COUNT_PER_LOAD);
let renderedTasksCount = 0;

const onLoadButtonClick = (evt) => {
  tasks.slice(renderedTasksCount, renderedTasksCount + TASKS_COUNT_PER_LOAD).forEach(renderTask);
  renderedTasksCount += TASKS_COUNT_PER_LOAD;

  if (renderedTasksCount >= TASKS_COUNT) {
    evt.target.removeEventListener(`click`, onLoadButtonClick);
    evt.target.remove();
  }
};

const renderTask = (taskData) => {
  const task = new Task(taskData);
  const taskEdit = new TaskEdit(taskData);

  task.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    boardTasksContainer.replaceChild(taskEdit.getElement(), task.getElement());
  });

  taskEdit.getElement().querySelector(`.card__form`).addEventListener(`submit`, () => {
    boardTasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
  });

  renderElementIn(boardTasksContainer, task.getElement());
};

const mainBlock = document.querySelector(`.main`);
const mainControlBlock = mainBlock.querySelector(`.main__control`);

const tasks = new Array(TASKS_COUNT).fill(``).map(generateTaskData);

renderElementIn(mainControlBlock, new Menu().getElement());
renderElementIn(mainBlock, new Search().getElement());
renderElementIn(mainBlock, new Filter(generateFilterData(tasks)).getElement());
renderElementIn(mainBlock, new Board().getElement());

const boardContainer = document.querySelector(`.board.container`);
const boardTasksContainer = boardContainer.querySelector(`.board__tasks`);

tasks.slice(renderedTasksCount, renderedTasksCount + TASKS_COUNT_PER_LOAD).forEach(renderTask);
renderedTasksCount += TASKS_COUNT_PER_LOAD;

const loadMoreButton = new LoadMoreButton();
loadMoreButton.getElement().addEventListener(`click`, onLoadButtonClick);
renderElementIn(boardContainer, loadMoreButton.getElement());
