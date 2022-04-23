export default function InputField(props) {
  if (props.width === "half") {
    return (
      <div className={props.i + " w-72 my-2 md:my-0 md:h-12 rounded-lg bg-gray-100 md:bg-orange-400  lg:inline-block"}>
        <label className={props.l + " bg-gray-100 md:bg-orange-400 flex text-gray-800 text-l "}>
          {props.icon}
          {props.label}{" "}
        </label>

        <input
          className={
            props.i + "  indent-1 w-72  bg-gray-100 border-1 border-orange-200 lg:border-0 lg:bg-orange-200 lg:hover:bg-orange-100 mb-2 md:mb-0 h-8  rounded-md text-gray-800"
          }
          name={props.name}
          required={props.required}
          type={props.type}
          placeholder={props.placeholder}
          defaultValue={props.defaultValue}
          min={props.min}
          max={props.max}
        />
      </div>
    );
  } else {
    return (
      <div className=" flex flex-col md:block md:h-12 w-72 md:mx-2 rounded-lg my-2 md:my-0 md:justify-center text-gray-800 bg-gray-100 md:bg-orange-400  ">
        <label className=" w-32 md:ml-1  bg-gray-100 md:bg-orange-400 flex float-left  text-l ">
          {props.icon}
          {props.label}{" "}
        </label>

        <input
          className=" indent-1 w-72 md:w-[17.5rem]  md:mx-1
          border-1 border-orange-200 lg:border-0 
          bg-gray-100 lg:bg-orange-200 hover:bg-orange-100 
           
          h-8 
          rounded-md text-gray-800 "
          name={props.name}
          required={props.required}
          type={props.type}
          placeholder={props.placeholder}
          defaultValue={props.defaultValue}
          min={props.min}
          max={props.max}
        />
      </div>
    );
  }
}
