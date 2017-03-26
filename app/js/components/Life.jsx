import React, { PropTypes } from 'react'
import Week from './Week'

const Life = ({ weeks }) => (
  <div className='life'>
    {weeks.map(week => <Week inThePast={week.inThePast} key={week.id} />)}
  </div>
)

Life.propTypes = {
  weeks: PropTypes.arrayOf(PropTypes.object)
}

export default Life
