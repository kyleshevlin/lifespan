const React = require('react')
const { func, string, number } = React.PropTypes
const { connector } = require('./Store')

const BirthdateInput = React.createClass({
  propTypes: {
    birthdate: string,
    weeksLived: number,
    setBirthdate: func
  },

  handleChange (event) {
    this.props.setBirthdate(event.target.value)
  },

  render () {
    let weekInflection = 'weeks'

    if (this.props.weeksLived === 1) {
      weekInflection = 'week'
    }

    return (
      <div className='birthdate_form'>
        <h4>Enter your birthdate</h4>
        <input type='text' name='birthdate' placeholder='mm/dd/yyyy' value={this.props.birthdate} onChange={this.handleChange} />
        <div>
          <p>You have been alive for: {this.props.weeksLived} {weekInflection}</p>
        </div>
      </div>
    )
  }
})

module.exports = connector(BirthdateInput)
