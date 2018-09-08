import { WEEKS_IN_LIFE } from '../constants'
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

const initialState = Object.assign({}, initialWeeksState, {
  birthdate: '',
  todayTime: new Date().getTime()
})

const handleBirthdateInput = (state, action) => {
  const birthdate = action.value
  const pattern = /^(0[1-9]|1[0-2])[/](0[1-9]|[12]\d|3[01])[/](19|20)\d{2}$/
  let weeksState

  if (pattern.test(birthdate)) {
    weeksState = updateWeeks(state, action)
  } else {
    weeksState = initialWeeksState
  }

  return { ...state, ...weeksState, birthdate }
}

const updateWeeks = (state, action) => {
  const birthdateTime = new Date(action.value).getTime()
  const weeksLived = Math.floor(
    (state.todayTime - birthdateTime) / (1000 * 3600 * 24 * 7)
  )

  if (weeksLived < 0) {
    return initialWeeksState
  } else {
    const newWeeks = state.weeks.map((week, index) => {
      const hasBeenLived = index < weeksLived
      return { ...week, hasBeenLived }
    })

    return { weeks: newWeeks, weeksLived }
  }
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
