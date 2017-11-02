/**
 * Returns first N words of a text. Default is 25
 * @param text - string
 * @param length - number
 */
export const getFirstNWords = (text, length = 25) =>
  text
    .split(' ')
    .splice(0, length)
    .join(' ');
