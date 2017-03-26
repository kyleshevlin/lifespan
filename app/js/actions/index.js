import * as types from '../constants/actionTypes'

export function birthdateUpdate (value) {
  return {
    type: types.BIRTHDATE_UPDATE,
    value
  }
}
