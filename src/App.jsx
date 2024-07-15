import React from 'react';
import Weather from './components/Weather'

function App() {
  return (
    <div className='mt-2 rounded-md border-solid border-2 border-black'>
      <h2 className='p-2 bg-black text-white text-left'>
        <strong>Weather Forecast App</strong>
      </h2>
      <Weather />
    </div>
  )
}

export default App
