import React from 'react'
import Week from './Week'

const Legend = () => (
  <div className="legend">
    <h4>Legend</h4>

    <div style={{ marginBottom: '.5em' }}>
      <Week />{' '}
      <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
        Week
      </span>
    </div>
    <div style={{ marginBottom: '.5em' }}>
      <Week hasBeenLived />{' '}
      <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
        Week You Have Lived
      </span>
    </div>
    <div style={{ marginBottom: '.5em' }}>
      <Week decadeBirthday />{' '}
      <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
        Week of Your Birthday, Every 10 Years
      </span>
    </div>
  </div>
)

export default Legend
