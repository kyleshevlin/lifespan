import React, { PropTypes } from 'react'
import { inflect } from '../helpers'

const BirthdateForm = ({ birthdate, weeksLived, onChange }) => {
  const inflection = inflect(weeksLived, 'week', 'weeks')

  return (
    <div className='birthdate_form'>
      <h4>Enter your birthdate</h4>
      <input
        type='text'
        name='birthdate'
        placeholder='mm/dd/yyyy'
        value={birthdate}
        onChange={onChange}
      />

      <div>
        <p>You have been alive for: {weeksLived} {inflection}</p>
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
