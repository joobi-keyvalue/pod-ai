import { months } from './dates';

export const getDate = (date: string) => {
  const dateVal = new Date(date);

  return `${dateVal.getDate()}  ${
    months[dateVal.getMonth() + 1]
  }, ${dateVal.getFullYear()}`;
};