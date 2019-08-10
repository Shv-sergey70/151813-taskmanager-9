import {createMenuTemplate} from './components/menu';
import {createSearchTemplate} from './components/search';
import {createFilterTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createLoadMoreButtonTemplate} from './components/load-more-button';
import {createTaskEditTemplate} from './components/task-edit';
import {createTaskTemplate} from './components/task';

const renderTemplateInComponent = (component, template) => {
  component.insertAdjacentHTML(`beforeend`, template);
};

const mainBlock = document.querySelector(`.main`);
const mainControlBlock = mainBlock.querySelector(`.main__control`);

renderTemplateInComponent(mainControlBlock, createMenuTemplate());
renderTemplateInComponent(mainBlock, createSearchTemplate());
renderTemplateInComponent(mainBlock, createFilterTemplate());
renderTemplateInComponent(mainBlock, createBoardTemplate());

const boardContainer = document.querySelector(`.board.container`);
const boardTasksContainer = boardContainer.querySelector(`.board__tasks`);

renderTemplateInComponent(boardTasksContainer, createTaskEditTemplate());
renderTemplateInComponent(boardTasksContainer, createTaskTemplate(`black`));
renderTemplateInComponent(boardTasksContainer, createTaskTemplate(`blue`));
renderTemplateInComponent(boardTasksContainer, createTaskTemplate(`yellow`));
renderTemplateInComponent(boardContainer, createLoadMoreButtonTemplate());
