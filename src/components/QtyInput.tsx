/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC,ChangeEvent,useRef,useEffect,useState } from "react"

type qtyPropType = {
    ballListState:object[],
    bucketListState:object[],
    updater:(updatedValue:string)=>void
  }
  
  const QtyInput:FC<qtyPropType> = ({ballListState,bucketListState,updater}) =>{
    const qtyColor = ['Red','Green','Blue','Yellow','Pink'] 
    
    const [stateValue,setStateCheck] = useState([{'Red':0},{'Green':0},{'Blue':0},{'Yellow':0},{'Pink':0}])
    const changeHandler = (e:ChangeEvent<HTMLInputElement>) =>{
      const newValue = Number(e.target.value)
      const newKey:string = e.target.name
      const newState = stateValue.map((item:any) => {
        if(item[newKey] !== undefined){
          item[newKey] = newValue
        }
        return item
      })
      setStateCheck(newState)
    }
    const stateRef = useRef(stateValue)
    useEffect(() => {
      if(stateRef.current !== stateValue){
        console.log("Running Expensive Function")
      console.log(stateValue)
        const calculateBucketVolume = (buckList:object[])=>{
         const sumOfBucket = buckList.reduce((total,item)=>{
            const value = Object.values(item)[0];
            return total + value
         },0)
        
         return sumOfBucket
        }
         const calculateBallVolume = (ballList:object[], qtyList:object[])=>{
          const merge = ballList.map((item:any)=>{
            const color = Object.keys(item)[0];
            const ballVolume = item[color];
            const selectByQty:any = qtyList.find(qtyball => 
              Object.keys(qtyball)[0] === color)
            const qty = selectByQty? selectByQty[color] : 0;
            const totalVolume = ballVolume * qty
            return {[color]:totalVolume}
          })
          const totalVolume = merge.reduce((sum,item)=>{
            const volume = Object.values(item)[0];
            return sum + volume;
          },0)
          console.info("Total Ball Volume: " + totalVolume)
          return {totalVolume, merge};
        }
  
        const {totalVolume, merge} = calculateBallVolume(ballListState,stateValue)
        const mergedBallVolume = merge.reduce((acc,curr)=>({...acc,...curr}),{})
        const ballQty = stateValue.reduce((acc,curr)=>({...acc,...curr}),{})
        const bucketVolume = bucketListState.reduce((acc,curr)=>({...acc,...curr}),{})
  
        const suggestBucketAndBall = () => {
          const ballVolumes:any = { ...mergedBallVolume };
          const ballQuantities:any = { ...ballQty };
          const bucketVolumes:any = { ...bucketVolume };
          const output: string[] = [];
        
          if (totalVolume === 0) {
            return '';
          } else if (bucketVolume && totalVolume > calculateBucketVolume(bucketListState)) {
            output.push('Not enough buckets to fit all balls.');
          } else {
            bucketListState.forEach(bucket => {
              const bucketId = Object.keys(bucket)[0];
              let bucketOutput = `Bucket ${bucketId}:`;
        
              qtyColor.forEach(color => {
                const colorBallQuantity = ballQuantities[color] || 0;
        
                if (colorBallQuantity > 0 && bucketVolumes[bucketId] > 0) {
                  const ball = ballListState.find(ball => Object.keys(ball)[0] === color);
                  const ballVolume = ball ? Object.values(ball)[0] : 0;
                  const availableCapacity = bucketVolumes[bucketId] / ballVolume;
                  const fullCapacityBalls = Math.floor(availableCapacity);
                  const capacityRemainder = availableCapacity - fullCapacityBalls;
                  const remainderVolume = capacityRemainder * ballVolume;
        
                  if (fullCapacityBalls > 0) {
                    let ballsToPlace = Math.min(fullCapacityBalls, colorBallQuantity);
                    let volumeToPlace = ballsToPlace * ballVolume;
                    if (remainderVolume >= ballVolume && ballQuantities[color] > 0) {
                        ballsToPlace += 1;
                        volumeToPlace += ballVolume;
                    }
                    ballQuantities[color] -= ballsToPlace;
                    ballVolumes[color] -= volumeToPlace;
                    bucketVolumes[bucketId] -= volumeToPlace;
                    bucketOutput += ` ${ballsToPlace} ${color} balls`;
                }
                }
              });
        
              output.push(bucketOutput);
            });
          }
        
          const finalOutput = output.join(', ');
          return finalOutput;
        };
         
         updater(suggestBucketAndBall())
        }
    },[stateValue,bucketListState,ballListState])
      return(
        <ul className="[&>*]:m-2">
          {
            qtyColor.map((qtyColor,i) => {
              return(
                <li key={`qtyIndex${i}`}  className="grid grid-cols-2">
                <label htmlFor={`qtyInp${i}`}>{qtyColor} Qty</label>
                <input placeholder={`quantity for ${qtyColor} ball`} id={`qtyInp${i}`} onChange={changeHandler} className="dark:bg-white dark:text-neutral-900 bg-neutral-900 text-white" type="number" name={qtyColor}></input>
              </li>
              )
            })
          }
        </ul>
      )
  }

  export default QtyInput