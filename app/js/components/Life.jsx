import React from 'react'
import { connect } from 'react-redux'
import Week from './Week'

const { arrayOf, object } = React.PropTypes

const Life = React.createClass({
  propTypes: {
    weeks: arrayOf(object)
  },

  render () {
    return (
      <div className='life'>
        {
          this.props.weeks.map(week => {
            return <Week inThePast={week.inThePast} key={week.id} />
          })
        }
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {
    weeks: state.weeks
  }
}

export default connect(mapStateToProps)(Life)
