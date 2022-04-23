export default function ButtonPhat(props){
    const clr=props.clr
   
    return(

        <div className="mt-4 ">
        <button
          type={props.type}
          className={` ${clr} inline-flex items-center justify-center w-full px-5 py-3  rounded-lg sm:w-auto`}
        >
          <span className="font-medium"> {props.text} </span>

       {props.icon}
        </button>
      </div>
    )
}