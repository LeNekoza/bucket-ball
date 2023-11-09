/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ChangeEvent } from "react"
type bucketPropType = {
    bucketTitle:string[],
    currentState: object[],
    callHandler:(updatedValue:[])=>void 
  }
  const BucketList:FC<bucketPropType> = ({bucketTitle,currentState, callHandler}) =>{
    
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
            bucketTitle.map((bucketTitle,i) => {
              return(
                <li key={`bucIndex${i}`} className="grid grid-cols-2">
                <label htmlFor={`bucInp${i}`} >Bucket {bucketTitle}</label>
                <input placeholder="cubic inches" id={`bucInp${i}`} className="dark:bg-white dark:text-neutral-900 bg-neutral-900 text-white" type="number" name={bucketTitle} onChange={changeHandler}></input>
              </li>
              )
            })
  
          }
        </ul>
      )
  }

  export default BucketList;