// import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt";
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill";
import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt";
import { BsFillPersonPlusFill } from "@react-icons/all-files/bs/BsFillPersonPlusFill";
import { BsCalendarFill } from "@react-icons/all-files/bs/BsCalendarFill";
import { FaMapPin } from "@react-icons/all-files/fa/FaMapPin";
import { BsClockFill } from "@react-icons/all-files/bs/BsClockFill";
import { propTypes } from "react-bootstrap/esm/Image";
import Receipt from "../Svg/Receipt";
export default function Summary(props) {
  return (
    <div className=" ">
      <div className="w-max mt-24 m-auto lg:mt-16 max-w-md">
        <div className="bg-white shadow-2xl rounded-b-3xl">
        {/* <Receipt /> */}
          <h2 className="text-center text-gray-800 text-2xl font-bold pt-6">
            Summary
          </h2>
         
          <div className="grid grid-cols-4 gap-2 px-4 w-72 lg:w-5/6 m-auto bg-indigo-50 mt-5 p-4 lg:p-4 rounded-2xl">
            <div className="col-span-1 text-4xl py-2"> <FaMapMarkerAlt /></div>
            <div className="col-span-2 pt-1">
              <p className="text-gray-800 font-bold lg:text-sm">Pickup address</p>
              <p className="text-gray-500 text-sm">{props.location}</p>
            </div>
            <div className="pt-2">
              <a className="text-indigo-700 underline hover:no-underline  text-sm hover:text-indigo-500 font-bold">
                Change
              </a>
            </div>
          </div>
          <div className="grid grid-cols-4 w-72 lg:w-5/6 m-auto bg-indigo-50 mt-5 p-4 lg:p-4 rounded-2xl">
            <div className="col-span-1"> <FaMapMarkerAlt /></div>
            <div className="col-span-2 pt-1">
              <p className="text-gray-800 font-bold lg:text-sm">Pickup address</p>
              <p className="text-gray-500 text-sm">{props.destination}</p>
            </div>
            <div className="pt-2">
              <a className="text-indigo-700 underline hover:no-underline  text-sm hover:text-indigo-500 font-bold">
                Change
              </a>
            </div>
          </div>
          <div className="grid grid-cols-4 w-72 lg:w-5/6 m-auto bg-indigo-50 mt-5 p-4 lg:p-4 rounded-2xl">
            <div className="col-span-1"> <FaMapMarkerAlt /></div>
            <div className="col-span-2 pt-1">
              <p className="text-gray-800 font-bold lg:text-sm">Pickup address</p>
              <p className="text-gray-500 text-sm">{props.passengers}</p>
            </div>
            <div className="pt-2">
              <a className="text-indigo-700 underline hover:no-underline  text-sm hover:text-indigo-500 font-bold">
                Change
              </a>
            </div>
          </div>
          <div className="grid grid-cols-4 w-72 lg:w-5/6 m-auto bg-indigo-50 mt-5 p-4 lg:p-4 rounded-2xl">
            <div className="col-span-1"> <FaMapMarkerAlt /></div>
            <div className="col-span-2 pt-1">
              <p className="text-gray-800 font-bold lg:text-sm">Pickup address</p>
              <p className="text-gray-500 text-sm">{props.date}</p>
            </div>
            <div className="pt-2">
              <a className="text-indigo-700 underline hover:no-underline  text-sm hover:text-indigo-500 font-bold">
                Change
              </a>
            </div>
          </div>
          <div className="grid grid-cols-4 w-72 lg:w-5/6 m-auto bg-indigo-50 mt-5 p-4 lg:p-4 rounded-2xl">
            <div className="col-span-1"> <FaMapMarkerAlt /></div>
            <div className="col-span-2 pt-1">
              <p className="text-gray-800 font-bold lg:text-sm">Pickup address</p>
              <p className="text-gray-500 text-sm">{props.time}</p>
            </div>
            <div className="pt-2">
              <a className="text-indigo-700 underline hover:no-underline  text-sm hover:text-indigo-500 font-bold">
                Change
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
