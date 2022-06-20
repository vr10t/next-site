import useStepper from 'use-stepper';
import { useEffect, useState } from 'react';
import{ useAppContext} from "../../context/state"
export default function StepperInput(props){
  const min=0
  const max=3
    const { value,setValue, getFormProps, getInputProps, getIncrementProps, getDecrementProps } =
    useStepper({
      min, max,
    });
    const { data,setData}= useAppContext()
    // const [value,setValue]= useState(0)
    // console.log(value);
useEffect(()=>{
  if (props.for==="luggage"){
    
        //  setValue(parseInt(data.luggage))
      
    console.log(data.luggage, 'data.luggage');
    
    data.luggage=parseInt(value)
    
  }
  if (props.for==="return_luggage"){
    data.return_luggage=value
  }
  
  setData(data)
  console.log("luggage:",data.luggage,"return luggage",data.return_luggage);
  // console.log(value);
},[value])
return(

<form  {...getFormProps()} className=" h-auto w-32">
  {/* <label htmlFor="custom-input-number" className="w-full text-gray-700 text-sm font-semibold">Counter Input
  </label> */}
  <div className="flex flex-row h-auto w-full rounded-lg relative gap-2 ">
    <button {...getDecrementProps()}  className="border-0 shadow-md bg-gray-50 ring-1 ring-gray-500 text-gray-800 hover:text-gray-100 hover:bg-sky-500 hover:ring-sky-500 h-full w-20 rounded-lg cursor-pointer outline-none">
      <span className="m-auto text-2xl ">−</span>
    </button>
    <input  onChange={(e)=>setValue(e.target.value)}  {...getInputProps()}  className="shadow-md border-0 h-8 rounded-sm focus:ring-2 focus:outline-none focus:ring-sky-500 hover:ring-sky-500 text-center w-10 bg-gray-50 ring-1 ring-gray-500 font-semibold text-md hover:text-sky-600  focus:text-sky-500  md:text-basecursor-default flex items-center text-gray-800  outline-none" ></input>
  <button {...getIncrementProps()} className="border-0 shadow-md bg-gray-50 ring-1 ring-gray-500 text-gray-800 hover:text-gray-100 hover:bg-sky-500 h-full w-20 hover:ring-sky-500 rounded-lg cursor-pointer outline-none">
    <span className="m-auto text-2xl ">+</span>
  </button>
</div>
</form>
)



}
