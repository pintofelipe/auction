import { useState } from 'react'

import './App.css'
import './index.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <header className='flex justify-center underline hover:cursor-pointer mb-10'>
      <p className='text-8xl'>Auction</p>
    </header>
      <div className='grid-cols-2 grid container mx-auto'>
        <h1 className='text-6xl font-semibold bg-green-700 flex justify-center items-center'>Coco77</h1>
        <h3 className='flex justify-center text-9xl font-medium bg-purple-700'>77</h3>
      </div>
    </>
  )
}

export default App
