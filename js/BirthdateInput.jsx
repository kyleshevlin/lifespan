const React = require('react')
const { func, string } = React.PropTypes
const { connector } = require('./Store')

const BirthdateInput = React.createClass({
  propTypes: {
    birthdate: string,
    weeksLived: string,
    setBirthdate: func,
    submitBirthdate: func
  },

  handleChange (event) {
    this.props.setBirthdate(event.target.value)
  },

  handleSubmit (event) {
    this.props.submitBirthdate()
    event.preventDefault()
  },

  render () {
    let weekInflection = 'weeks'

    if (this.props.weeksLived === '') {
      weekInflection = ''
    } else if (this.props.weeksLived === '1') {
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
