import React from 'react'
import store from './Store'
import { Provider } from 'react-redux'
import BirthdateInput from './components/BirthdateInput'
import Life from './components/Life'

const App = () => {
  return (
    <Provider store={store}>
      <div className='container'>
        <h1>Lifespan Visual</h1>
        <p>
          Your life, whether you pay attention or not, is steadily moving towards its inevitable conclusion. Sometimes, that conclusion seems so far away that it's hard to imagine how close it really is.
        </p>
        <p>
          Below, you will see a circle for every week in a 90-year lifespan. It's a lot of weeks. 4,680 to be exact. Enter your birthdate into the input below and see how many weeks you have lived, and how many you have remaining.
        </p>
        <BirthdateInput />
        <Life />
      </div>
    </Provider>
  )
}

export default App
