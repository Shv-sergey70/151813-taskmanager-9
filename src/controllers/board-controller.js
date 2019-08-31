import Task from "../components/task";
import TaskEdit from "../components/task-edit";
import {renderElementIn, sortTypes, TASKS_COUNT_PER_LOAD} from "../util";
import Board from "../components/board";
import BoardTasks from "../components/board-tasks";
import NoTasks from "../components/no-tasks";
import Sort from "../components/sort";
import LoadMoreButton from "../components/load-more-button";

export default class BoardController {
  constructor(container, tasksData) {
    this._container = container;
    this._tasksData = tasksData.slice();
    this._boardContainer = new Board();
    this._boardTasksContainer = new BoardTasks();
    this._loadMoreButton = new LoadMoreButton();
    this._sort = new Sort();
    this._renderedTasks = [];
  }

  init() {
    const onLoadButtonClick = (evt) => {
      this._renderTasks(this._tasksData.splice(0, TASKS_COUNT_PER_LOAD));

      if (this._tasksData.length === 0) {
        evt.target.removeEventListener(`click`, onLoadButtonClick);
        evt.target.remove();
      }
    };

    if (this._tasksData.length === 0) {
      renderElementIn(this._boardContainer.getElement(), new NoTasks().getElement());
    } else {
      this._sort.getElement().addEventListener(`click`, (evt) => {
        if (!evt.target.classList.contains(`board__filter`)) {
          return;
        }

        this._boardTasksContainer.getElement().innerHTML = ``;

        switch (true) {
          case evt.target.dataset.sort === sortTypes.DEFAULT: {
            this._renderedTasks.forEach((task) => this._renderTask(task));

            break;
          }
          case evt.target.dataset.sort === sortTypes.DATE_UP: {
            this._renderedTasks.slice().sort((a, b) => a.dueDate - b.dueDate).forEach((task) => this._renderTask(task));

            break;
          }
          case evt.target.dataset.sort === sortTypes.DATE_DOWN: {
            this._renderedTasks.slice().sort((a, b) => b.dueDate - a.dueDate).forEach((task) => this._renderTask(task));

            break;
          }
        }
      });
      renderElementIn(this._boardContainer.getElement(), this._sort.getElement());

      this._renderTasks(this._tasksData.splice(0, TASKS_COUNT_PER_LOAD));

      renderElementIn(this._boardContainer.getElement(), this._boardTasksContainer.getElement());

      this._loadMoreButton.getElement().addEventListener(`click`, onLoadButtonClick);
      renderElementIn(this._boardContainer.getElement(), this._loadMoreButton.getElement());
    }

    renderElementIn(this._container, this._boardContainer.getElement());
  }

  _renderTask(taskData) {
    const task = new Task(taskData);
    const taskEdit = new TaskEdit(taskData);
    const taskEditTextarea = taskEdit.getElement().querySelector(`textarea.card__text`);

    task.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
      this._boardTasksContainer.getElement().replaceChild(taskEdit.getElement(), task.getElement());
      document.addEventListener(`keydown`, onEscKeydown);
    });

    taskEdit.getElement().querySelector(`.card__form`).addEventListener(`submit`, () => {
      this._boardTasksContainer.getElement().replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeydown);
    });

    const onEscKeydown = (evt) => {
      if ((evt.key === `Esc` || evt.key === `Escape`)) {
        this._boardTasksContainer.getElement().replaceChild(task.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeydown);
      }
    };

    taskEditTextarea.addEventListener(`focus`, () => document.removeEventListener(`keydown`, onEscKeydown));
    taskEditTextarea.addEventListener(`blur`, () => document.addEventListener(`keydown`, onEscKeydown));

    renderElementIn(this._boardTasksContainer.getElement(), task.getElement());
  }

  _renderTasks(tasksForRender) {
    tasksForRender.forEach((taskData) => this._renderTask(taskData));
    this._renderedTasks = this._renderedTasks.concat(tasksForRender);
  }
}
