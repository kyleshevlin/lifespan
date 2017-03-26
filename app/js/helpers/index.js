export function inflect (number, singular, plural) {
  return number === 1 ? singular : plural
}
