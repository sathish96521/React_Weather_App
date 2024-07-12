import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Weather from './components/Weather'

function App() {
  const [dataFromChild, setDataFromChild] = useState('');
  const handleDataFromChild = (data) => {
    setDataFromChild(data);
    // console.log("Data received from child:", data);
  };

  return (
    <div className='mt-2 rounded-md border-solid border-2 border-black'>
      <h2 className='p-2 bg-black text-white text-left'>
        <strong>
          Weather Forecast App
        </strong>
        {/* <strong>
          {dataFromChild ? `${dataFromChild} Forecast App` : 'Weather Forecast App'}
        </strong> */}
      </h2>
      <Weather onData={handleDataFromChild} />
    </div>
  )
}

export default App
