import Task from "../components/task";
import TaskEdit from "../components/task-edit";
import {renderElementIn} from "../util";
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import moment from 'moment';

export default class TaskController {
  constructor(container, taskData, onDataChange, onChangeView) {
    this._container = container;
    this._taskData = taskData;

    this._taskView = new Task(this._taskData);
    this._taskEdit = new TaskEdit(this._taskData);

    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
  }

  init() {
    flatpickr(this._taskEdit.getElement().querySelector(`input[name="date"]`), {
      altInput: true,
      enableTime: true,
      dateFormat: `Z`,
      altFormat: `d F, h:i K`,
      defaultDate: this._taskData.dueDate
    });
    const taskEditTextarea = this._taskEdit.getElement().querySelector(`textarea.card__text`);

    this._taskView.getElement().querySelector(`.card__btn--archive`).addEventListener(`click`, () => {
      const newTaskData = Object.assign({}, this._taskData);
      newTaskData.isArchive = !newTaskData.isArchive;
      this._onDataChange(newTaskData, this._taskData);
    });

    this._taskView.getElement().querySelector(`.card__btn--favorites`).addEventListener(`click`, () => {
      const newTaskData = Object.assign({}, this._taskData);
      newTaskData.isFavorite = !newTaskData.isFavorite;
      this._onDataChange(newTaskData, this._taskData);
    });

    this._taskEdit.getElement().querySelector(`.card__btn--archive`).addEventListener(`click`, (evt) => {
      evt.target.classList.toggle(`card__btn--disabled`);
    });

    this._taskEdit.getElement().querySelector(`.card__btn--favorites`).addEventListener(`click`, (evt) => {
      evt.target.classList.toggle(`card__btn--disabled`);
    });

    this._taskView.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
      this._onChangeView();
      this._container.getElement().replaceChild(this._taskEdit.getElement(), this._taskView.getElement());
      document.addEventListener(`keydown`, onEscKeydown);
    });

    this._taskEdit.getElement().querySelector(`.card__form`).addEventListener(`submit`, (evt) => {
      evt.preventDefault();

      const formData = new FormData(this._taskEdit.getElement().querySelector(`.card__form`));
      const entry = {
        description: formData.get(`text`),
        color: moment(formData.get(`color`)).format(`x`),
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
        isFavorite: !this._taskEdit.getElement().querySelector(`.card__btn--favorites`).classList.contains(`card__btn--disabled`),
        isArchive: !this._taskEdit.getElement().querySelector(`.card__btn--archive`).classList.contains(`card__btn--disabled`)
      };

      document.removeEventListener(`keydown`, onEscKeydown);
      this._onDataChange(entry, this._taskData);
    });

    const onEscKeydown = (evt) => {
      if ((evt.key === `Esc` || evt.key === `Escape`)) {
        this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeydown);
      }
    };

    taskEditTextarea.addEventListener(`focus`, () => document.removeEventListener(`keydown`, onEscKeydown));
    taskEditTextarea.addEventListener(`blur`, () => document.addEventListener(`keydown`, onEscKeydown));

    renderElementIn(this._container.getElement(), this._taskView.getElement());
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._taskEdit.getElement())) {
      this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
    }
  }
}
