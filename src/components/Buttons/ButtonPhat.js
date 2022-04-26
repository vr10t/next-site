export default function ButtonPhat(props){
    const clr=props.clr
   
    return(

        <div className="mt-4 ">
        <button
          type={props.type}
          className={` ${clr} scale-90 md:scale-100 inline-flex items-center justify-center w-full px-5 py-3  rounded-lg sm:w-auto`}
        >
          <span className="text-xl font-bold"> {props.text} </span>

       {props.icon}
        </button>
      </div>
    )
}