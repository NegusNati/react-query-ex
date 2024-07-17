import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
   <h1>Tan stack </h1>
  )
}

function wait (duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
}

export default App
