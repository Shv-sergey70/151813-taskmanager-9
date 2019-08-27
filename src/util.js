export const getRandomInt = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

export const createElement = (template) => {
  const div = document.createElement(`div`);
  div.innerHTML = template;

  return div.firstChild;
};

export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const renderElementIn = (component, element, position = Position.BEFOREEND) => {
  switch (position) {
    case Position.AFTERBEGIN: {
      component.prepend(element);

      break;
    }
    case Position.BEFOREEND: {
      component.append(element);

      break;
    }
  }
};

export const TASKS_COUNT_PER_LOAD = 8;
