import Task from "../components/task";
import TaskEdit from "../components/task-edit";
import {createElement, isSpaceKeydown, Position, renderElementIn} from "../util";

export default class TaskController {
  constructor(container, taskData, onDataChange, onChangeView) {
    this._container = container;
    this._taskData = taskData;

    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
  }

  init() {
    const task = new Task(this._taskData);
    const taskEdit = new TaskEdit(this._taskData);
    const taskEditTextarea = taskEdit.getElement().querySelector(`textarea.card__text`);

    task.getElement().querySelector(`.card__btn--archive`).addEventListener(`click`, () => {
      const newTaskData = Object.assign({}, this._taskData);
      newTaskData.isArchive = !newTaskData.isArchive;
      this._onDataChange(newTaskData, this._taskData);
    });

    task.getElement().querySelector(`.card__btn--favorites`).addEventListener(`click`, () => {
      const newTaskData = Object.assign({}, this._taskData);
      newTaskData.isFavorite = !newTaskData.isFavorite;
      this._onDataChange(newTaskData, this._taskData);
    });

    taskEdit.getElement().querySelector(`.card__btn--archive`).addEventListener(`click`, (evt) => {
      evt.target.classList.toggle(`card__btn--disabled`);
    });

    taskEdit.getElement().querySelector(`.card__btn--favorites`).addEventListener(`click`, (evt) => {
      evt.target.classList.toggle(`card__btn--disabled`);
    });

    task.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
      this._container.getElement().replaceChild(taskEdit.getElement(), task.getElement());
      document.addEventListener(`keydown`, onEscKeydown);
    });

    taskEdit.getElement().querySelector(`.card__form`).addEventListener(`submit`, (evt) => {
      evt.preventDefault();

      const formData = new FormData(taskEdit.getElement().querySelector(`.card__form`));
      const entry = {
        description: formData.get(`text`),
        color: formData.get(`color`),
        tags: new Set(formData.getAll(`hashtag`)),
        dueDate: formData.get(`date`),
        repeatingDays: formData.getAll(`repeat`).reduce((accumulator, day) => {
          accumulator[day] = true;
          return accumulator;
        }, {
          'mo': false,
          'tu': false,
          'we': false,
          'th': false,
          'fr': false,
          'sa': false,
          'su': false,
        }),
        isFavorite: !taskEdit.getElement().querySelector(`.card__btn--favorites`).classList.contains(`card__btn--disabled`),
        isArchive: !taskEdit.getElement().querySelector(`.card__btn--archive`).classList.contains(`card__btn--disabled`)
      };

      document.removeEventListener(`keydown`, onEscKeydown);
      this._onDataChange(entry, this._taskData);
    });

    taskEdit.getElement().querySelector(`input[name='hashtag-input']`).addEventListener(`keydown`, (evt) => {
      if (isSpaceKeydown(evt.code)) {
        this._taskData.tags.add(evt.target.value);
        taskEdit.renderHashtag(evt.target.value);
        evt.target.value = ``;
      }
    });

    taskEdit.getElement().querySelector(`.card__hashtag-list`).addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`card__hashtag-delete`)) {
        evt.target.closest(`.card__hashtag-inner`).remove();
      }
    });

    const onEscKeydown = (evt) => {
      if ((evt.key === `Esc` || evt.key === `Escape`)) {
        this._container.getElement().replaceChild(task.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeydown);
      }
    };

    taskEditTextarea.addEventListener(`focus`, () => document.removeEventListener(`keydown`, onEscKeydown));
    taskEditTextarea.addEventListener(`blur`, () => document.addEventListener(`keydown`, onEscKeydown));

    renderElementIn(this._container.getElement(), task.getElement());
  }
}
