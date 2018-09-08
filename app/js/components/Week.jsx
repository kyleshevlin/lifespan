import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Week = ({ decadeBirthday, hasBeenLived }) => {
  const classes = classnames(
    'week',
    { 'is-decade-birthday': decadeBirthday },
    { 'has-been-lived': hasBeenLived }
  )

  return <div className={classes} />
}

Week.propTypes = {
  decadeBirthday: PropTypes.bool,
  hasBeenLived: PropTypes.bool
}

export default Week
