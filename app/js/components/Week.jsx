import React from 'react'

const { bool } = React.PropTypes

const Week = React.createClass({
  propTypes: {
    inThePast: bool
  },

  render () {
    let weekClass = this.props.inThePast ? 'week is-in-the-past' : 'week'
    return (
      <div className={weekClass} />
    )
  }
})

export default Week
