import * as types from '../constants/actionTypes'

const weeksInLife = 4680
const initialWeeks = []

for (let i = 0; i < weeksInLife; i++) {
  initialWeeks.push({
    id: i + 1,
    inThePast: false
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

  return Object.assign({}, state, weeksState, { birthdate })
}

const updateWeeks = (state, action) => {
  const birthdateTime = new Date(action.value).getTime()
  const weeksLived = Math.floor((state.todayTime - birthdateTime) / (1000 * 3600 * 24 * 7))

  if (weeksLived < 0) {
    return initialWeeksState
  } else {
    const newWeeks = state.weeks.map((week, index) => {
      let inThePast = index < weeksLived
      return { id: week.id, inThePast }
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
