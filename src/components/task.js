const mothsMap = {
  0: `January`,
  1: `Febrary`,
  2: `March`,
  3: `April`,
  4: `May`,
  5: `June`,
  6: `July`,
  7: `August`,
  8: `September`,
  9: `October`,
  10: `November`,
  11: `December`
};

export const createTaskTemplate = ({description, dueDate, color, repeatingDays, tags}) => `
<article class="card card--${color} ${Object.values(repeatingDays).some((dayValue) => dayValue) ? `card--repeat` : ``}">
  <div class="card__form">
    <div class="card__inner">
      <div class="card__control">
        <button type="button" class="card__btn card__btn--edit">
          edit
        </button>
        <button type="button" class="card__btn card__btn--archive">
          archive
        </button>
        <button
          type="button"
          class="card__btn card__btn--favorites card__btn--disabled"
        >
          favorites
        </button>
      </div>

      <div class="card__color-bar">
        <svg class="card__color-bar-wave" width="100%" height="10">
          <use xlink:href="#wave"></use>
        </svg>
      </div>

      <div class="card__textarea-wrap">
        <p class="card__text">${description}</p>
      </div>

      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <div class="card__date-deadline">
              <p class="card__input-deadline-wrap">
                <span class="card__date">${new Date(dueDate).getDate()} ${mothsMap[new Date(dueDate).getMonth()]}</span>
                <span class="card__time">${new Date(dueDate).getHours()}:${new Date(dueDate).getMinutes()}</span>
              </p>
            </div>
          </div>

          <div class="card__hashtag">
            <div class="card__hashtag-list">
              ${Array.from(tags).map((tag) => `
              <span class="card__hashtag-inner">
                <span class="card__hashtag-name">
                  #${tag}
                </span>
              </span>`).join(``)}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</article>`;
