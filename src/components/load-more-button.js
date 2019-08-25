import {createElement} from "../util";

export default class LoadMoreButton {
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
    return `<button class="load-more" type="button">load more</button>`;
  }
}
