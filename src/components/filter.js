import AbstractComponent from "./abstract-component";

export default class Filter extends AbstractComponent {
  constructor(filterData) {
    super();
    this._filterData = filterData;
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
