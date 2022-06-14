import useStepper from 'use-stepper';
import { useEffect, useState } from 'react';
import{ useAppContext} from "../../context/state"
export default function StepperInput(){
    const { getFormProps, getInputProps, getIncrementProps, getDecrementProps } =
    useStepper();
    const { data,setData}= useAppContext()
    const [value,setValue]= useState(0)
useEffect(()=>{
  data.return_passengers=value
  setData(data)
  console.log(value);
},[value])
return(

<form  {...getFormProps()} className="custom-number-input h-10 w-32">
  <label htmlFor="custom-input-number" className="w-full text-gray-700 text-sm font-semibold">Counter Input
  </label>
  <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
    <button {...getDecrementProps()}  className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
      <span className="m-auto text-2xl font-thin">−</span>
    </button>
    <input value={value} onChange={(e)=>setValue(e.target.value)} min={0} max={3} {...getInputProps()}  className=" focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" ></input>
  <button {...getIncrementProps()} className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
    <span className="m-auto text-2xl font-thin">+</span>
  </button>
</div>
</form>
)



}
