import React from 'react'
import shevy, { bs } from './shevy'

const MILLISECONDS_IN_A_WEEK = 1000 * 60 * 60 * 24 * 7

const getWeeksForYears = n => n * 52

const getInitialWeeks = weeks =>
  Array(weeks)
    .fill()
    .map((_, idx) => ({
      id: idx,
      hasBeenLived: false,
      decadeBirthday: idx % 520 === 0,
    }))

const initialWeeks = getInitialWeeks(getWeeksForYears(90))

function validBirthdate(birthdate) {
  const pattern = /^(0[1-9]|1[0-2])[/](0[1-9]|[12]\d|3[01])[/](19|20)\d{2}$/
  return pattern.test(birthdate)
}

function handleBirthdateInput(state, action) {
  const { weeks } = state
  const birthdate = action.payload
  const nextWeeks = validBirthdate(birthdate)
    ? updateWeeks(state.weeks, birthdate)
    : getInitialWeeks(weeks.length)

  return { ...state, birthdate, weeks: nextWeeks }
}

function updateWeeks(weeks, date) {
  const birthdateTime = new Date(date).getTime()
  const todayTime = new Date().getTime()
  const weeksLived = Math.floor(
    (todayTime - birthdateTime) / MILLISECONDS_IN_A_WEEK
  )

  if (weeksLived < 0) {
    return weeks
  }

  const newWeeks = weeks.map((week, index) => ({
    ...week,
    hasBeenLived: index < weeksLived,
  }))

  return newWeeks
}

const initialState = {
  birthdate: '',
  lifeYears: 90,
  weeks: initialWeeks,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'BIRTHDATE_UPDATE':
      return handleBirthdateInput(state, action)

    case 'LIFEYEARS_UPDATE': {
      const lifeYears = Number(action.payload)
      const { birthdate } = state
      const nextWeeks = getInitialWeeks(getWeeksForYears(lifeYears))

      return {
        ...state,
        lifeYears,
        weeks: validBirthdate(birthdate)
          ? updateWeeks(nextWeeks, birthdate)
          : nextWeeks,
      }
    }

    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const { birthdate, lifeYears, weeks } = state

  const handleBirthdateChange = e => {
    dispatch({ type: 'BIRTHDATE_UPDATE', payload: e.target.value })
  }

  const handleLifeYearsChange = e => {
    dispatch({ type: 'LIFEYEARS_UPDATE', payload: e.target.value })
  }

  return (
    <div style={{ margin: '0 auto', width: '80%' }}>
      <div style={{ maxWidth: '65ch', marginBottom: bs(2) }}>
        <h1>Lifespan Visual</h1>
        <p>
          {`Your life, whether you pay attention or not, is steadily moving towards
        its inevitable conclusion. Sometimes, that conclusion seems so far away
        that it's hard to imagine how close it really is.`}
        </p>
        <p>
          {`Below, you will see a circle for every week in a ${lifeYears}-year lifespan. It's
        a lot of weeks. ${getWeeksForYears(
          lifeYears
        )} to be exact. Enter your birthdate into the inputs
        below and see how many weeks you have lived and how many you have
        remaining.`}
        </p>
      </div>
      <Inputs
        lifeYears={lifeYears}
        onBirthdateChange={handleBirthdateChange}
        onLifeYearsChange={handleLifeYearsChange}
      />
      <ResultsText lifeYears={lifeYears} weeks={weeks} />
      <Legend />
      <Life weeks={weeks} />
      <footer style={{ marginTop: bs(2), marginBottom: bs(2) }}>
        <p>
          Made with morbid fascination by{' '}
          <a href="https://twitter.com/kyleshevlin">Kyle Shevlin</a>
        </p>
      </footer>
    </div>
  )
}

function Input({ label, onChange, placeholder = '00', value }) {
  return (
    <div>
      <label
        htmlFor={label}
        style={{
          display: 'block',
          fontSize: shevy.h6.fontSize,
          fontWeight: 'bold',
          marginBottom: bs(0.25),
        }}
      >
        {label}
      </label>
      <input
        id={label}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          fontSize: shevy.h6.fontSize,
          padding: bs(0.25),
          width: '100%',
        }}
        type="text"
        value={value}
      />
    </div>
  )
}

const inflect = singular => plural => number =>
  number === 1 ? singular : plural

const weeksInflection = inflect('week')('weeks')

const INPUT_WIDTH = 150
const INTL_ORDER_KEY = 'kyleshevlin:lifespan:intlOrder'

function Inputs({ lifeYears, onBirthdateChange, onLifeYearsChange }) {
  const [day, setDay] = React.useState('')
  const [month, setMonth] = React.useState('')
  const [year, setYear] = React.useState('')
  const [intlOrder, setIntlOrder] = React.useState(() => {
    return JSON.parse(localStorage.getItem(INTL_ORDER_KEY)) || false
  })

  React.useEffect(() => {
    onBirthdateChange({ target: { value: `${month}/${day}/${year}` } })
  }, [day, month, year])

  React.useEffect(() => {
    localStorage.setItem(INTL_ORDER_KEY, JSON.stringify(intlOrder))
  }, [intlOrder])

  const toggleIntlOrder = () => {
    setIntlOrder(s => !s)
  }

  const reset = () => {
    setDay('')
    setMonth('')
    setYear('')
  }

  let dayMonth = [
    <Input
      key="month"
      label="Month"
      onChange={e => {
        setMonth(e.target.value)
      }}
      value={month}
    />,
    <Input
      key="day"
      label="Day"
      onChange={e => {
        setDay(e.target.value)
      }}
      value={day}
    />,
  ]

  if (intlOrder) {
    dayMonth.reverse()
  }

  return (
    <div style={{ marginBottom: bs(2) }}>
      <div
        style={{
          display: 'grid',
          gridGap: bs(0.5),
          gridTemplateColumns: `repeat(auto-fill, ${INPUT_WIDTH}px)`,
          alignItems: 'end',
          marginBottom: bs(0.5),
        }}
      >
        {dayMonth}
        <Input
          label="Year"
          onChange={e => {
            setYear(e.target.value)
          }}
          placeholder="0000"
          value={year}
        />
        <div>
          <button
            onClick={reset}
            style={{ padding: `${bs(0.25)} ${bs(0.5)}` }}
            type="button"
          >
            Reset
          </button>
        </div>
      </div>
      <div
        style={{
          marginBottom: bs(),
        }}
      >
        <label htmlFor="intlOrder">Use International Day/Month Order</label>
        <input
          checked={intlOrder}
          id="intlOrder"
          onChange={toggleIntlOrder}
          type="checkbox"
          value={intlOrder}
        />
      </div>
      <div style={{ width: INPUT_WIDTH }}>
        <Input
          label="Years to Calculate"
          onChange={onLifeYearsChange}
          value={lifeYears}
        />
      </div>
    </div>
  )
}

const yearsInflection = inflect('year')('years')

function ResultsText({ lifeYears, weeks }) {
  const weeksLived = weeks.filter(w => w.hasBeenLived).length
  const tilDeath = getWeeksForYears(lifeYears) - weeksLived

  return (
    <div style={{ marginBottom: bs(2) }}>
      <h4>Results</h4>
      <p>
        You have been alive for: {weeksLived} {weeksInflection(weeksLived)}
      </p>
      <p>
        {`You have ${tilDeath} ${weeksInflection(
          tilDeath
        )} until you're ${lifeYears} ${yearsInflection(lifeYears)} old.`}
      </p>
    </div>
  )
}

function Legend() {
  return (
    <div style={{ marginBottom: bs(2) }}>
      <h4>Legend</h4>

      <div
        style={{
          display: 'grid',
          gridGap: bs(0.25),
          gridTemplateRows: 'repeat(3, 1fr)',
        }}
      >
        <LegendItem>Week</LegendItem>
        <LegendItem hasBeenLived>Week you have lived</LegendItem>
        <LegendItem decadeBirthday>
          Week of your birthday, every 10 years
        </LegendItem>
      </div>
    </div>
  )
}

function LegendItem({ children, ...rest }) {
  return (
    <div>
      <Week {...rest} />{' '}
      <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
        {children}
      </span>
    </div>
  )
}

function Life({ weeks }) {
  return (
    <div>
      {weeks.map(week => (
        <Week key={week.id} {...week} />
      ))}
    </div>
  )
}

const getWeekBg = ({ decadeBirthday, hasBeenLived }) => {
  if (decadeBirthday) return '#12d4e1'
  if (hasBeenLived) return '#fd4300'
  return '#ddd'
}

function Week(props) {
  return (
    <div
      style={{
        backgroundColor: getWeekBg(props),
        borderRadius: '50%',
        display: 'inline-block',
        height: 14,
        margin: 2,
        transition: 'background-color .3s ease',
        verticalAlign: 'middle',
        width: 14,
      }}
    />
  )
}
