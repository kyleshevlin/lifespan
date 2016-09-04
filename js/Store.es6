const Redux = require('redux')
const { connect } = require('react-redux')

const weeksInLife = 4680
const initialWeeks = []

for (let i = 0; i < weeksInLife; i++) {
  initialWeeks.push({
    id: i + 1,
    inThePast: false
  })
}

const initialState = {
  birthdate: '',
  weeks: initialWeeks,
  weeksLived: 0
}

const birthdateUpdateAction = (state, action) => {
  const birthdate = action.value
  const pattern = /^(0[1-9]|1[0-2])[\/](0[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$/
  let weeksState = {
    weeks: initialWeeks,
    weeksLived: 0
  }

  if (pattern.test(birthdate)) {
    weeksState = weeksUpdate(state.weeks, birthdate)
  }

  return Object.assign({}, state, { birthdate, weeks: weeksState.weeks, weeksLived: weeksState.weeksLived })
}

const weeksUpdate = (weeks, birthdate) => {
  const todayTime = new Date().getTime()
  const birthdateTime = new Date(birthdate).getTime()
  const weeksLived = Math.floor((todayTime - birthdateTime) / (1000 * 3600 * 24 * 7))

  if (weeksLived < 0) {
    return {
      weeks,
      weeksLived: 0
    }
  }

  const newWeeks = weeks.map((week, index) => {
    let inThePast = index < weeksLived
    return { id: week.id, inThePast }
  })

  return { weeks: newWeeks, weeksLived }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BIRTHDATE_UPDATE':
      return birthdateUpdateAction(state, action)

    default:
      return state
  }
}

const store = Redux.createStore(reducer, window.devToolsExtension && window.devToolsExtension())

const mapStateToProps = (state) => {
  return {
    birthdate: state.birthdate,
    weeks: state.weeks,
    weeksLived: state.weeksLived
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBirthdate (value) {
      dispatch({
        type: 'BIRTHDATE_UPDATE',
        value
      })
    }
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

module.exports = { connector, store }
