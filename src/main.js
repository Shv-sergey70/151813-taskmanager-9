import Menu from './components/menu';
import Search from './components/search';
import Filter from './components/filter';
import BoardContainer from './components/board-container';
import Sort from './components/sort';
import BoardTasks from "./components/board-tasks";
import NoTasks from "./components/no-tasks";
import LoadMoreButton from './components/load-more-button';
import TaskEdit from './components/task-edit';
import Task from './components/task';
import {generateTaskData} from "./data/task-data";
import {generateFilterData} from "./data/filter-data";
import {getRandomInt, renderElementIn} from "./util";

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
  const taskEditTextarea = taskEdit.getElement().querySelector(`textarea.card__text`);

  task.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    boardTasksContainer.replaceChild(taskEdit.getElement(), task.getElement());
    document.addEventListener(`keydown`, onEscKeydown);
  });

  taskEdit.getElement().querySelector(`.card__form`).addEventListener(`submit`, () => {
    boardTasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
    document.removeEventListener(`keydown`, onEscKeydown);
  });

  const onEscKeydown = (evt) => {
    if ((evt.key === `Esc` || evt.key === `Escape`)) {
      boardTasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeydown);
    }
  };

  taskEditTextarea.addEventListener(`focus`, () => document.removeEventListener(`keydown`, onEscKeydown));
  taskEditTextarea.addEventListener(`blur`, () => document.addEventListener(`keydown`, onEscKeydown));

  renderElementIn(boardTasksContainer, task.getElement());
};

const mainBlock = document.querySelector(`.main`);
const mainControlBlock = mainBlock.querySelector(`.main__control`);

const tasks = new Array(TASKS_COUNT).fill(``).map(generateTaskData);

renderElementIn(mainControlBlock, new Menu().getElement());
renderElementIn(mainBlock, new Search().getElement());
renderElementIn(mainBlock, new Filter(generateFilterData(tasks)).getElement());

const boardContainer = new BoardContainer().getElement();
const boardTasksContainer = new BoardTasks().getElement();

if (tasks.length === 0) {
  renderElementIn(boardContainer, new NoTasks().getElement());
} else {
  renderElementIn(boardContainer, new Sort().getElement());
  renderElementIn(boardContainer, boardTasksContainer);

  tasks.slice(renderedTasksCount, renderedTasksCount + TASKS_COUNT_PER_LOAD).forEach(renderTask);
  renderedTasksCount += TASKS_COUNT_PER_LOAD;

  const loadMoreButton = new LoadMoreButton();
  loadMoreButton.getElement().addEventListener(`click`, onLoadButtonClick);
  renderElementIn(boardContainer, loadMoreButton.getElement());
}

renderElementIn(mainBlock, boardContainer);
