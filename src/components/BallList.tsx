/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC,ChangeEvent } from "react"

type ballPropType = {
    ballColor:string[]
    currentState: object[],
    callHandler:(updatedValue:[])=>void 
  }
  const BallList:FC<ballPropType> = ({ballColor,currentState, callHandler}) =>{
    const changeHandler = (e:ChangeEvent<HTMLInputElement>) =>{
     const newValue = Number(e.target.value)
     const newKey = e.target.name
     const updatedBucket = currentState.map((item:any) => {
      if(item[newKey] !== undefined){
        item[newKey] = newValue
      }
      return item
    })
    callHandler(updatedBucket as [])
  
    }
      return(
        <ul className="[&>*]:m-2">
          {
            ballColor.map((ballColor,i) => {
              return(
                <li key={`ballIndex${i}`} className="grid grid-cols-2">
                <label htmlFor={`ballInp${i}`}>{ballColor} Ball</label>
                <input placeholder="cubic inches" id={`ballInp${i}`} className="dark:bg-white dark:text-neutral-900 bg-neutral-900 text-white" type="number" name={ballColor} onChange={changeHandler}></input>
              </li>
              )
            })
  
          }
        </ul>
      )
  }

  export default BallList