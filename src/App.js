import React from 'react'
import Weather from './components/Weather'
import { CitiesProvider } from './context/CitiesContext'

function App() {
  return (
    <>
      <CitiesProvider>
        <Weather/>
      </CitiesProvider>
    </>
   
  )
}

export default App
