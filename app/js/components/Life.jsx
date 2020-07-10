import React from 'react'
import Week from './Week'

const Life = ({ weeks }) => (
  <div className="life">
    {weeks.map(week => (
      <Week key={week.id} {...week} />
    ))}
  </div>
)

export default Life
