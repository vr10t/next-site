import {BsX} from "@react-icons/all-files/bs/BsX"

export default function Announcement(props) {
   
  return (
    <div className={`fixed w-screen top-20 z-[9] flex flex-col  justify-center items-center gap-2 sm:flex-row  shadow-md text-white py-2  bg-orange-300 sm:justify-between pl-2 pr-6  `}>
      <button onClick={props.onClick} className="sm:hidden float-right absolute flex self-end   px-2 text-2xl" ><BsX /></button>
      <p className="font-medium sm:my-2 mx-auto text-lg text-center sm:text-left">
        Sign up now and enjoy hassle free bookings!
      </p>
    
      <button
        className="h-8 sm:h-10  sm:mr-20 relative  w-max sm:my-0  px-4  text-md font-medium text-center text-white transition bg-blue-400 rounded-lg sm:mt-0 hover:bg-slate-500/90 active:text-emerald-100 focus:outline-none focus:ring"
        >
    
        Get Started 
      </button>
      <button onClick={props.onClick} className="hidden sm:flex text-2xl" ><BsX /></button>
    </div>
  );
}
