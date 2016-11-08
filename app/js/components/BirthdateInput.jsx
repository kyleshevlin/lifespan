import React from 'react'
import { connect } from 'react-redux'
import { birthdateUpdate } from '../actions'

const { func, string, number } = React.PropTypes

const BirthdateInput = React.createClass({
  propTypes: {
    birthdate: string,
    weeksLived: number,
    onBirthdateUpdate: func
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
  },

  handleChange (event) {
    this.props.onBirthdateUpdate(event.target.value)
  }
})

const mapStateToProps = (state) => {
  return {
    birthdate: state.birthdate,
    weeksLived: state.weeksLived
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBirthdateUpdate (value) {
      dispatch(birthdateUpdate(value))
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(BirthdateInput)
