
import './App.css';

import { useCallback, useEffect, useState } from 'react';

function App() {

  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed){
      str += "0123456789"
    }
    if (charAllowed){
      str += "!@#$%*&"
    }

    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)


  }, [length, numAllowed, charAllowed, setPassword])

  useEffect(()=>{
    passGenerator()
  }, [length, numAllowed, charAllowed, passGenerator])

  const copyPassword = ()=> {
    window.navigator.clipboard.writeText(password)
    alert(`Your password has been copied: ${password}`)
  }

  return (
    <>
    <div className='w-screen h-screen bg-slate-900 flex items-center justify-center'>
    <div className='w-1/2 max-w-md mx-auto shadow-md rounded-lg px-4 py-8 text-slate-900 bg-gray-300 '>
     <h1 className='text-center mb-8 text-2xl'>Password Generator</h1>
     <div className='flex shadow overflow-hidden mb-4'>
      <input 
      type='text'
      placeholder='Password'
      className='w-full rounded-tl-lg rounded-bl-lg p-2 outline-none'
      value={password}
      readOnly
     />
     <button className='outline-none bg-violet-900 hover:bg-violet-700 px-3 py-0.5 shrink-0 text-white rounded-tr-lg rounded-br-lg' onClick={copyPassword}>
      Copy
      </button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
         type="range"
         min={6}
         max={100}
         value={length}
         className='cursor-pointer'
         onChange={(e)=> {setLength(e.target.value)}}
         />
         <label>Length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input 
          type='checkbox'
          defaultChecked={numAllowed}
          id='numberInput'
          onChange={() => {
            setNumAllowed((prev)=> !prev)
          }}
        />
        <label>Numbers</label>
      </div>
       <div className='flex item-center gap-x-1'>
        <input 
          type="checkBox"
          defaultChecked={charAllowed}
          id=""
          onChange={()=> {
           setCharAllowed((prev)=> !prev)
          }}
        />
        <label>Characters</label>
       </div>
    </div>
    </div>
    </div>
    </>
  );
}

export default App;
