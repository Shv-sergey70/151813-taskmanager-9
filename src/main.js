import {createMenuTemplate} from './components/menu';
import {createSearchTemplate} from './components/search';
import {createFilterTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createLoadMoreButtonTemplate} from './components/load-more-button';
import {createTaskEditTemplate} from './components/task-edit';
import {createTaskTemplate} from './components/task';
import {generateTaskData} from "./data/task-data";
import {generateFilterData} from "./data/filter-data";

const TASKS_COUNT = 8;

const renderTemplateInComponent = (component, template) => {
  component.insertAdjacentHTML(`beforeend`, template);
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
renderTemplateInComponent(boardTasksContainer, createTaskEditTemplate(tasks.shift()));
tasks.forEach((task) => renderTemplateInComponent(boardTasksContainer, createTaskTemplate(task)));

renderTemplateInComponent(boardContainer, createLoadMoreButtonTemplate());
