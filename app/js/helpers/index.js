export const inflect = singular => plural => number =>
  number === 1 ? singular : plural
