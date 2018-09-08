import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { WEEKS_IN_LIFE } from '../constants'
import { inflect } from '../helpers'

const weeksInflection = inflect('week')('weeks')

const BirthdateForm = ({ birthdate, weeksLived, onChange }) => {
  const til90 = WEEKS_IN_LIFE - weeksLived

  return (
    <div className="birthdate_form">
      <h4>Enter your birthdate</h4>
      <input
        className="birthdate_form-input"
        name="birthdate"
        onChange={onChange}
        placeholder="mm/dd/yyyy"
        type="text"
        value={birthdate}
      />

      <div>
        {weeksLived > 0 ? (
          <Fragment>
            <p>
              You have been alive for: {weeksLived}{' '}
              {weeksInflection(weeksLived)}
            </p>
            <p>
              {`You have ${til90} ${weeksInflection(
                til90
              )} until you're 90 years old.`}
            </p>
          </Fragment>
        ) : null}
      </div>
    </div>
  )
}

BirthdateForm.propTypes = {
  birthdate: PropTypes.string,
  weeksLived: PropTypes.number,
  onChange: PropTypes.func
}

export default BirthdateForm
