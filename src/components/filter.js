import {createElement} from "../util";

export default class Filter {
  constructor(filterData) {
    this._filterData = filterData;

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
    return `<section class="main__filter filter container">
          ${this._filterData.map((filter) => `
          <input
            type="radio"
            id=filter__${filter.title.toLowerCase()}
            class="filter__input visually-hidden"
            name="filter"
            checked
          />
          <label for='filter__${filter.title.toLowerCase()}' class="filter__label">
            ${filter.title} <span class="filter__all-count">${filter.count}</span></label
          >`).join(``)}
        </section>`;
  }
}
