export const createFilterTemplate = (filterData) => `<section class="main__filter filter container">
  ${filterData.map((filter) => `
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
