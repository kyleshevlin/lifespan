const React = require('react')
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

module.exports = Week
