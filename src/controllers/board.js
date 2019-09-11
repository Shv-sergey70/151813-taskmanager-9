import {renderElementIn, sortTypes, TASKS_COUNT_PER_LOAD} from "../util";
import Board from "../components/board";
import BoardTasks from "../components/board-tasks";
import NoTasks from "../components/no-tasks";
import Sort from "../components/sort";
import LoadMoreButton from "../components/load-more-button";
import TaskController from "./task";

export default class BoardController {
  constructor(container, tasksData) {
    this._container = container;
    this._tasksData = tasksData.slice();
    this._boardContainer = new Board();
    this._boardTasksContainer = new BoardTasks();
    this._loadMoreButton = new LoadMoreButton();
    this._sort = new Sort();
    this._renderedTasks = [];

    this._subscriptions = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
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
            this._renderedTasks.forEach((taskData) => this._renderTask(taskData));

            break;
          }
          case evt.target.dataset.sort === sortTypes.DATE_UP: {
            this._renderedTasks.slice().sort((a, b) => a.dueDate - b.dueDate).forEach((taskData) => this._renderTask(taskData));

            break;
          }
          case evt.target.dataset.sort === sortTypes.DATE_DOWN: {
            this._renderedTasks.slice().sort((a, b) => b.dueDate - a.dueDate).forEach((taskData) => this._renderTask(taskData));

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

  _renderTasks(tasksForRender) {
    tasksForRender.forEach((taskData) => this._renderTask(taskData));
    this._renderedTasks = this._renderedTasks.concat(tasksForRender);
  }

  _rerenderTasks() {
    this._boardTasksContainer.getElement().innerText = ``;
    this._renderedTasks.forEach((taskData) => this._renderTask(taskData));
  }

  _renderTask(taskData) {
    const taskController = new TaskController(this._boardTasksContainer, taskData, this._onDataChange, this._onChangeView);
    taskController.init();
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
  }

  _onDataChange(newData, oldData) {
    this._renderedTasks[this._renderedTasks.findIndex((taskData) => taskData === oldData)] = newData;
    this._rerenderTasks();
  }

  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }
}
