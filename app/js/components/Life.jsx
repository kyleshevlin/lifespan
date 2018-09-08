import React from 'react'
import PropTypes from 'prop-types'
import Week from './Week'

const Life = ({ weeks }) => (
  <div className="life">
    {weeks.map(week => <Week key={week.id} {...week} />)}
  </div>
)

Life.propTypes = {
  weeks: PropTypes.arrayOf(PropTypes.object)
}

export default Life
