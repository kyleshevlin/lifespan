import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { birthdateUpdate } from '../actions'
import BirthdateForm from '../components/BirthdateForm'

class BirthdateFormContainer extends Component {
  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.birthdateUpdate(e.target.value)
  }

  render() {
    const { birthdate, weeksLived } = this.props

    return (
      <BirthdateForm
        birthdate={birthdate}
        weeksLived={weeksLived}
        onChange={this.handleChange}
      />
    )
  }
}

BirthdateFormContainer.propTypes = {
  birthdate: PropTypes.string,
  weeksLived: PropTypes.number,
  birthdateUpdate: PropTypes.func
}

const mapStateToProps = state => ({
  birthdate: state.birthdate,
  weeksLived: state.weeksLived
})

const mapDispatchToProps = {
  birthdateUpdate
}

export default connect(mapStateToProps, mapDispatchToProps)(
  BirthdateFormContainer
)
