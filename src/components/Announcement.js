import {BsX} from "@react-icons/all-files/bs/BsX"

export default function Announcement(props) {
   
  return (
    <div className="flex fixed top-20 flex-col gap-2 justify-center items-center py-2 pr-6 pl-2 w-full text-white bg-black/50 shadow-md z-[21] sm:flex-row sm:justify-between">
      <button onClick={props.onClick} className="flex float-right absolute self-end px-2 text-2xl sm:hidden" ><BsX /></button>
      <p className="mx-auto text-lg font-medium text-center sm:my-2 sm:text-left">
        Sign up now and enjoy hassle free bookings!
      </p>
    
      <button
        className="relative px-4 w-max h-8 font-medium text-center text-white bg-sky-600 rounded-lg transition sm:h-10 sm:mr-20 sm:my-0 text-md sm:mt-0 hover:bg-sky-700 active:text-emerald-100 focus:outline-none focus:ring"
        >
    
        Get Started 
      </button>
      <button onClick={props.onClick} className="hidden text-2xl sm:flex" ><BsX /></button>
    </div>
  );
}
