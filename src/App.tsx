/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import BucketList from './components/BucketList'
import BallList from './components/BallList'
import QtyInput from './components/QtyInput'
export default function App() {
  const [bucketState, setBucketState] = useState([{'A':0},{'B':0},{'C':0},{'D':0},{'E':0}])
  const [ballState, setBallState] = useState([
    {'Red':0},{'Green':0},{'Blue':0},{'Yellow':0},{'Pink':0}
  ]) 
  
  const [outputState, setOutputState] = useState('')

  const bucketHandler=(updatedValue:[])=>{
    setBucketState(updatedValue)
  }
  const ballHandler=(updatedValue:[])=>{
    setBallState(updatedValue)
  }
  const outputHandler = (updatedValue:string) =>{
    setOutputState(updatedValue)
  }
  return (
    <>
    <nav className=" text-center font-bold text-5xl py-5 border-b-2 border-solid border-yellow-500 bg-yellow-500">
        Your CxO Online Solutions
    </nav>    
    <div className="flex flex-wrap justify-center font-semibold [&>*]:border-4 [&>*]:m-2 ">
    <BucketList bucketTitle={['A','B','C','D','E']} currentState={bucketState} callHandler={bucketHandler}/>  
    <BallList ballColor={['Red','Green','Blue','Yellow','Pink']} currentState={ballState} callHandler={ballHandler} />
    <QtyInput ballListState={ballState} bucketListState={bucketState} updater={outputHandler}/>
    </div>

    {/* Output Div */}
    <div className="text-center my-5 flex flex-col items-center">
      <h1 className="text-2xl font-bold">Output</h1>
      {
       outputState.split(', ').map((line,i)=>(<div key={`outId${i}`} className="max-w-[50rem] w-[50rem] lg:text-[2rem] bg-yellow-500 mb-2 font-semibold text-black">{line}</div>))
      }
    </div>
    </>
  )
}


