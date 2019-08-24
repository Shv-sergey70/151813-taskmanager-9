import {createMenuTemplate} from './components/menu';
import {createSearchTemplate} from './components/search';
import {createFilterTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createLoadMoreButtonTemplate} from './components/load-more-button';
import {createTaskEditTemplate} from './components/task-edit';
import {createTaskTemplate} from './components/task';
import {generateTaskData} from "./data/task-data";
import {generateFilterData} from "./data/filter-data";
import {getRandomInt} from "./util";

const TASKS_COUNT_PER_LOAD = 8;
const TASKS_COUNT = getRandomInt(20, TASKS_COUNT_PER_LOAD);
let renderedTasksCount = 0;

const renderTemplateInComponent = (component, template) => {
  component.insertAdjacentHTML(`beforeend`, template);
};

const renderPartTasks = (tasksForRender, isRenderEditCard = false) => {
  if (isRenderEditCard) {
    renderTemplateInComponent(boardTasksContainer, createTaskEditTemplate(tasksForRender.shift()));
  }

  tasksForRender.forEach((task) => renderTemplateInComponent(boardTasksContainer, createTaskTemplate(task)));
};

const onLoadButtonClick = (evt) => {
  renderPartTasks(tasks.slice(renderedTasksCount, renderedTasksCount + TASKS_COUNT_PER_LOAD));
  renderedTasksCount += TASKS_COUNT_PER_LOAD;

  if (renderedTasksCount >= TASKS_COUNT) {
    evt.target.removeEventListener(`click`, onLoadButtonClick);
    evt.target.remove();
  }
};

const mainBlock = document.querySelector(`.main`);
const mainControlBlock = mainBlock.querySelector(`.main__control`);

const tasks = new Array(TASKS_COUNT).fill(``).map(generateTaskData);

renderTemplateInComponent(mainControlBlock, createMenuTemplate());
renderTemplateInComponent(mainBlock, createSearchTemplate());
renderTemplateInComponent(mainBlock, createFilterTemplate(generateFilterData(tasks)));
renderTemplateInComponent(mainBlock, createBoardTemplate());

const boardContainer = document.querySelector(`.board.container`);
const boardTasksContainer = boardContainer.querySelector(`.board__tasks`);

renderPartTasks(tasks.slice(renderedTasksCount, renderedTasksCount + TASKS_COUNT_PER_LOAD), true);
renderedTasksCount += TASKS_COUNT_PER_LOAD;

renderTemplateInComponent(boardContainer, createLoadMoreButtonTemplate());
document.querySelector(`.load-more`).addEventListener(`click`, onLoadButtonClick);
