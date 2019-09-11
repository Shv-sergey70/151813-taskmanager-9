import {availableTasksColors, getRandomInt} from "../util";

export const generateTaskData = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + (1 + getRandomInt(6)) * 24 * 3600 * 1000,
  repeatingDays: {
    'mo': false,
    'tu': false,
    'we': Boolean(Math.round(Math.random())),
    'th': false,
    'fr': Boolean(Math.round(Math.random())),
    'sa': false,
    'su': Boolean(Math.round(Math.random())),
  },
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
    `business`,
    `weekend`
  ].sort(() => 0.5 - Math.random()).slice(0, getRandomInt(3))),
  color: availableTasksColors[Math.floor(Math.random() * availableTasksColors.length)],
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random()))
});
