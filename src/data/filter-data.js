export const generateFilterData = (tasks) => [
  {
    title: `All`,
    count: tasks.length,
  },
  {
    title: `Overdue`,
    count: tasks.filter((task) => task.dueDate < Date.now()).length,
  },
  {
    title: `Today`,
    count: tasks.filter((task) => new Date(task.dueDate).toDateString() === new Date().toDateString()).length,
  },
  {
    title: `Favorites`,
    count: tasks.filter((task) => task.isFavorite).length,
  },
  {
    title: `Repeating`,
    count: tasks.filter((task) => Object.values(task.repeatingDays).some((dayValue) => dayValue)).length,
  },
  {
    title: `Tags`,
    count: tasks.filter((task) => task.tags.size).length,
  },
  {
    title: `Archive`,
    count: tasks.filter((task) => task.isArchive).length,
  }];
