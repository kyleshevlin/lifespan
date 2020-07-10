import React from 'react'
import { bs } from './shevy'

export const MILLISECONDS_IN_A_WEEK = 1000 * 60 * 60 * 24 * 7
export const WEEKS_IN_LIFE = 4680

const initialWeeks = []

for (let i = 1; i < WEEKS_IN_LIFE + 1; i++) {
  initialWeeks.push({
    id: i,
    hasBeenLived: false,
    decadeBirthday: i % 520 === 0,
  })
}

const initialWeeksState = {
  weeks: initialWeeks,
  weeksLived: 0,
}

function handleBirthdateInput(state, action) {
  const birthdate = action.payload
  const pattern = /^(0[1-9]|1[0-2])[/](0[1-9]|[12]\d|3[01])[/](19|20)\d{2}$/
  const weeksState = pattern.test(birthdate)
    ? updateWeeks(state, action)
    : initialWeeksState

  return { ...state, ...weeksState, birthdate }
}

const updateWeeks = (state, action) => {
  const birthdateTime = new Date(action.payload).getTime()
  const todayTime = new Date().getTime()
  const weeksLived = Math.floor(
    (todayTime - birthdateTime) / MILLISECONDS_IN_A_WEEK
  )

  if (weeksLived < 0) {
    return initialWeeksState
  }

  const newWeeks = state.weeks.map((week, index) => ({
    ...week,
    hasBeenLived: index < weeksLived,
  }))

  return { weeks: newWeeks, weeksLived }
}

const initialState = {
  birthdate: '',
  ...initialWeeksState,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'BIRTHDATE_UPDATE':
      return handleBirthdateInput(state, action)

    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const { birthdate, weeks, weeksLived } = state

  const handleBirthdateChange = e => {
    dispatch({ type: 'BIRTHDATE_UPDATE', payload: e.target.value })
  }

  return (
    <div className="container">
      <div className="intro">
        <h1>Lifespan Visual</h1>
        <p>
          {`Your life, whether you pay attention or not, is steadily moving towards
        its inevitable conclusion. Sometimes, that conclusion seems so far away
        that it's hard to imagine how close it really is.`}
        </p>
        <p>
          {`Below, you will see a circle for every week in a 90-year lifespan. It's
        a lot of weeks. ${WEEKS_IN_LIFE} to be exact. Enter your birthdate into the input
        below and see how many weeks you have lived and how many you have
        remaining.`}
        </p>
      </div>
      <BirthdateForm
        birthdate={birthdate}
        onChange={handleBirthdateChange}
        weeksLived={weeksLived}
      />
      <Life weeks={weeks} />
    </div>
  )
}

const inflect = singular => plural => number =>
  number === 1 ? singular : plural

const weeksInflection = inflect('week')('weeks')

function BirthdateForm({ birthdate, weeksLived, onChange }) {
  const til90 = WEEKS_IN_LIFE - weeksLived

  return (
    <div className="birthdate-wrap">
      <div className="birthdate_form">
        <label
          htmlFor="birthdate"
          style={{
            display: 'block',
            fontSize: bs(),
            fontWeight: 'bold',
            marginBottom: bs(0.5),
          }}
        >
          Enter Your Birthdate
        </label>
        <input
          className="birthdate_form-input"
          id="birthdate"
          name="birthdate"
          onChange={onChange}
          placeholder="mm/dd/yyyy"
          type="text"
          value={birthdate}
        />

        <div>
          {weeksLived > 0 ? (
            <>
              <p>
                You have been alive for: {weeksLived}{' '}
                {weeksInflection(weeksLived)}
              </p>
              <p>
                {`You have ${til90} ${weeksInflection(
                  til90
                )} until you're 90 years old.`}
              </p>
            </>
          ) : null}
        </div>
      </div>
      <Legend />
    </div>
  )
}

function Life({ weeks }) {
  return (
    <div className="life">
      {weeks.map(week => (
        <Week key={week.id} {...week} />
      ))}
    </div>
  )
}

function Week({ decadeBirthday, hasBeenLived }) {
  const classes = [
    'week',
    decadeBirthday && 'is-decade-birthday',
    hasBeenLived && 'has-been-lived',
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={classes} />
}

function Legend() {
  return (
    <div className="legend">
      <h4>Legend</h4>

      <div style={{ marginBottom: '.5em' }}>
        <Week />{' '}
        <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          Week
        </span>
      </div>
      <div style={{ marginBottom: '.5em' }}>
        <Week hasBeenLived />{' '}
        <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          Week You Have Lived
        </span>
      </div>
      <div style={{ marginBottom: '.5em' }}>
        <Week decadeBirthday />{' '}
        <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          Week of Your Birthday, Every 10 Years
        </span>
      </div>
    </div>
  )
}
