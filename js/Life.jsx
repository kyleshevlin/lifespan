const React = require('react')
const { arrayOf, object } = React.PropTypes
const Week = require('./Week')
const { connector } = require('./Store')

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

module.exports = connector(Life)
