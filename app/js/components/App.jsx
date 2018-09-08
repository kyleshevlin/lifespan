import React from 'react'
import { Provider } from 'react-redux'
import { WEEKS_IN_LIFE } from '../constants'
import store from '../store'
import BirthdateFormContainer from '../containers/BirthdateFormContainer'
import LifeContainer from '../containers/LifeContainer'

const App = () => (
  <Provider store={store}>
    <div className="container">
      <div className="intro">
        <h1>Lifespan Visual</h1>
        <p>
          {`Your life, whether you pay attention or not, is steadily moving towards
        its inevitable conclusion. Sometimes, that conclusion seems so far away
        that it's hard to imagine how close it really is.`}
        </p>
        <p>
          {`Below, you will see a circle for every week in a 90-year lifespan. It's
        a lot of weeks. ${WEEKS_IN_LIFE} to be exact. Enter your birthdate into the input
        below and see how many weeks you have lived and how many you have
        remaining.`}
        </p>
      </div>
      <BirthdateFormContainer />
      <LifeContainer />
    </div>
  </Provider>
)

export default App
