import { MILLISECONDS_IN_A_WEEK, WEEKS_IN_LIFE } from '../constants'
import * as types from '../constants/actionTypes'

const initialWeeks = []

for (let i = 1; i < WEEKS_IN_LIFE + 1; i++) {
  initialWeeks.push({
    id: i,
    hasBeenLived: false,
    decadeBirthday: i % 520 === 0
  })
}

const initialWeeksState = {
  weeks: initialWeeks,
  weeksLived: 0
}

const initialState = {
  ...initialWeeksState,
  birthdate: '',
  todayTime: new Date().getTime()
}

const handleBirthdateInput = (state, action) => {
  const birthdate = action.value
  const pattern = /^(0[1-9]|1[0-2])[/](0[1-9]|[12]\d|3[01])[/](19|20)\d{2}$/
  const weeksState = pattern.test(birthdate)
    ? updateWeeks(state, action)
    : initialWeeksState

  return { ...state, ...weeksState, birthdate }
}

const updateWeeks = (state, action) => {
  const birthdateTime = new Date(action.value).getTime()
  const weeksLived = Math.floor(
    (state.todayTime - birthdateTime) / MILLISECONDS_IN_A_WEEK
  )

  if (weeksLived < 0) {
    return initialWeeksState
  }

  const newWeeks = state.weeks.map((week, index) => ({
    ...week,
    hasBeenLived: index < weeksLived
  }))

  return { weeks: newWeeks, weeksLived }
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.BIRTHDATE_UPDATE:
      return handleBirthdateInput(state, action)

    default:
      return state
  }
}

export default rootReducer
