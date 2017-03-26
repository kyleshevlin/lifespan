import React, { PropTypes } from 'react'

const Week = ({ inThePast }) => {
  const weekClasses = inThePast ? 'week is-in-the-past' : 'week'

  return <div className={weekClasses} />
}

Week.propTypes = {
  inThePast: PropTypes.bool
}

export default Week
