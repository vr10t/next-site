import useStepper from "use-stepper";
import { useRef, useEffect, useState } from "react";
import { useAppContext } from "../../context/state";
export default function StepperInput(props) {
  const min = 4;
  const max = 16;
  const renders = useRef(0);
  const {
    value,
    setValue,
    getFormProps,
    getInputProps,
    getIncrementProps,
    getDecrementProps,
  } = useStepper({
    min,
    max,
  });
  const { data, setData } = useAppContext();
  // const [value,setValue]= useState(0)
  // console.log(value);
  useEffect(()=>{ setValue(value)},[])
    useEffect(()=>{
     
      console.log(value,"valeu");
      if (props.for==="passengers"){
data.passengers=value
       setData(data) 
    console.log(data.passengers, 'data.passengers');
    

  }
 

    },[value])

  return (
    <form {...getFormProps()}  className=" h-auto my-2 w-32">
      {/* <label htmlFor="custom-input-number" className="w-full text-gray-700 text-sm font-semibold">Counter Input
  </label> */}
      <div className="flex flex-row h-auto w-full rounded-lg relative gap-2 ">
        <button
          {...getDecrementProps()}
          className="border-0 shadow-md bg-sky-500 ring-1 ring-sky-500 font-semibold hover:scale-105 duration-200 text-gray-50 hover:text-sky-500 hover:bg-gray-50 hover:ring-sky-500 h-full w-20 rounded-full cursor-pointer outline-none">
          <span className="m-auto text-2xl ">−</span>
        </button>
        <input value={value}
          onChange={(e) => setValue(e.target.value)}
          {...getInputProps()}
          className="shadow-md border-0 h-8 rounded-xl focus:ring-2 focus:outline-none focus:ring-sky-500 hover:ring-sky-500 text-center w-12 bg-gray-50 ring-1 ring-sky-500 font-semibold text-md hover:text-sky-600  focus:text-sky-500  md:text-basecursor-default flex items-center text-gray-800  outline-none"></input>
        <button
          {...getIncrementProps()}
          className="border-0 shadow-md bg-sky-500 ring-1 ring-sky-500 font-bold hover:scale-105 duration-200 text-gray-50 hover:text-sky-500 hover:bg-gray-50 h-full w-20 hover:ring-sky-500 rounded-full cursor-pointer outline-none">
          <span className="m-auto text-2xl ">+</span>
        </button>
      </div>
    </form>
  );
}
