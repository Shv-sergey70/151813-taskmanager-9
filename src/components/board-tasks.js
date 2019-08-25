import {createElement} from "../util";

export default class BoardTasks {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (this._element === null) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `<div class="board__tasks"></div>`;
  }
}
