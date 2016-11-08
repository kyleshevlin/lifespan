import { BIRTHDATE_UPDATE } from '../actionTypes'

export function birthdateUpdate (value) {
  return {
    type: BIRTHDATE_UPDATE,
    value
  }
}
