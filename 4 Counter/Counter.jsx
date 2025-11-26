import React from 'react'
import { useState } from 'react'
import './App.css'
export default function Counter () {
    const [count, setCount] = useState(0)
  return (
    <>
  <div classname='card'>
    Count : {count}
  </div>
  <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
         Click Here to Increment 
        </button>
        </div>
        </>
  )
}
