const Redux = require('redux')
const { connect } = require('react-redux')

const weeksInLife = 4680
let initialWeeks = []

for (let i = 0; i < weeksInLife; i++) {
  initialWeeks.push({
    id: i + 1,
    inThePast: false
  })
}

const initialState = {
  birthdate: '',
  weeks: initialWeeks,
  weeksLived: ''
}

const calculation = (state, action) => {
  let birthdate = action.value
  let newWeeks = initialWeeks
  let diffWeeks = ''
  let pattern = /^(0[1-9]|1[0-2])[\/](0[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$/

  if (pattern.test(birthdate)) {
    let today = new Date()
    let birthday = new Date(birthdate)
    let timeDiff = Math.abs(today.getTime() - birthday.getTime())
    diffWeeks = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7))

    newWeeks = state.weeks.map((week, index) => {
      let inThePast = index < diffWeeks
      return {
        id: week.id,
        inThePast
      }
    })
  }

  return Object.assign(
    {},
    state,
    { birthdate, weeks: newWeeks, weeksLived: diffWeeks.toString()
    }
  )
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BIRTHDATE_UPDATE':
      return calculation(state, action)

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
