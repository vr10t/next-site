import useStepper from 'use-stepper';
import { useEffect, useState } from 'react';
import{ useAppContext} from "../../context/state"
export default function StepperInput(props){
  const min=0
  const max=3
    const { value, getFormProps, getInputProps, getIncrementProps, getDecrementProps } =
    useStepper({
      min, max,
    });
    const { data,setData}= useAppContext()
    // const [value,setValue]= useState(0)
    // console.log(value);
useEffect(()=>{
  if (props.for==="luggage"){
    data.luggage=value
  }
  if (props.for==="return_luggage"){
    data.return_luggage=value
  }
  
  setData(data)
  console.log("luggage:",data.luggage,"return luggage",data.return_luggage);
  // console.log(value);
},[value])
return(

<form  {...getFormProps()} className="custom-number-input h-10 w-32">
  {/* <label htmlFor="custom-input-number" className="w-full text-gray-700 text-sm font-semibold">Counter Input
  </label> */}
  <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
    <button {...getDecrementProps()}  className="border-0 bg-gray-50 ring-2 ring-sky-500 text-gray-800 hover:text-gray-100 hover:bg-sky-500 h-full w-20 rounded-l-lg cursor-pointer outline-none">
      <span className="m-auto text-2xl ">−</span>
    </button>
    <input  onChange={(e)=>setValue(e.target.value)}  {...getInputProps()}  className=" border-0 focus:ring-2 focus:outline-none focus:ring-sky-500 text-center w-full bg-gray-50 ring-2 ring-sky-500 font-semibold text-md hover:text-sky-600  focus:text-sky-500  md:text-basecursor-default flex items-center text-gray-800  outline-none" ></input>
  <button {...getIncrementProps()} className="border-0 bg-gray-50 ring-2 ring-sky-500 text-gray-800 hover:text-gray-100 hover:bg-sky-500 h-full w-20 rounded-r-lg cursor-pointer outline-none">
    <span className="m-auto text-2xl ">+</span>
  </button>
</div>
</form>
)



}
