import React from 'react'
import classnames from 'classnames'

const Week = ({ decadeBirthday, hasBeenLived }) => {
  const classes = classnames(
    'week',
    { 'is-decade-birthday': decadeBirthday },
    { 'has-been-lived': hasBeenLived }
  )

  return <div className={classes} />
}

export default Week
