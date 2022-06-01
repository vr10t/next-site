import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt";
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill";
import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt";
import { BsFillPersonPlusFill } from "@react-icons/all-files/bs/BsFillPersonPlusFill";
import { BsCalendarFill } from "@react-icons/all-files/bs/BsCalendarFill";
import { FaMapPin } from "@react-icons/all-files/fa/FaMapPin";
import { BsClockFill } from "@react-icons/all-files/bs/BsClockFill";
import { FaRoute } from "@react-icons/all-files/fa/FaRoute";
import { BsWatch } from "@react-icons/all-files/bs/BsWatch";

import Receipt from "../Svg/Receipt";
export default function Summary(props) {
  function handleClick() {
    console.log("click");
  }
  return (
    <div className="flex relative w-screen bg-clip-content bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl lg:rounded-xl lg:w-full lg:float-left">
      <div className="mt-24 w-full lg:mt-2 lg:max-w-lg">
        <div className="">
          <h2 className="lg:relative lg:top-[10.5rem] text-left justify-center flex lg:block lg:ml-16 text-gray-800 text-3xl font-bold ">
            Summary
          </h2>
          <Receipt className="" />
          <div className="">
            <div className="grid grid-cols-4 p-4 px-4 m-auto mt-5 w-5/6 text-3xl font-bold text-sky-500 lg:p-4">
              {" "}
              <div className="self-end ">
                <label className="sr-only">Distance</label> <FaRoute />
              </div>
              <div className="col-span-2">
                <hr className="mt-10 border-t-0 border-b-2 border-gray-400 border-dashed" />
              </div>
              <div className="self-end text-xl font-normal">
                {props.distance}
              </div>
            </div>
            <div className="grid grid-cols-4  px-4 m-auto w-5/6 text-3xl text-sky-500 lg:p-4">
              {" "}
              <div className="font-bold self-end">
                <BsWatch />
              </div>
              <div className="col-span-2">
                <hr className="mt-10 border-t-0 border-b-2  border-gray-400 border-dashed" />
              </div>
              <div className="self-end text-xl">{props.duration}</div>
            </div>{" "}
          </div>
          <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl lg:p-4">
            <div className="col-span-1 my-auto text-3xl text-gray-800">
              {" "}
              <FaMapMarkerAlt />
            </div>
            <div className="col-span-2 pt-1">
              <p className="font-bold text-gray-800 lg:text-sm">
                Pickup address
              </p>
              <p className="text-sm text-gray-500">{props.location}</p>
            </div>
            <div className="my-auto">
              <a className="text-sm font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500">
                Change
              </a>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl lg:p-4">
            <div className="col-span-1 my-auto text-3xl text-gray-800">
              {" "}
              <FaMapPin />
            </div>
            <div className="col-span-2 pt-1">
              <p className="font-bold text-gray-800 lg:text-sm">
                Dropoff address
              </p>
              <p className="text-sm text-gray-500">{props.destination}</p>
            </div>
            <div className="my-auto">
              <a className="text-sm font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500">
                Change
              </a>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl lg:p-4">
            <div className="col-span-1 my-auto text-3xl text-gray-800">
              {" "}
              <BsFillPersonPlusFill />
            </div>
            <div className="col-span-2 pt-1">
              <p className="font-bold text-gray-800 lg:text-sm">Passengers</p>
              <p className="text-sm text-gray-500">{props.passengers}</p>
            </div>
            <div className="my-auto">
              <a className="text-sm font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500">
                Change
              </a>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl lg:p-4">
            <div className="col-span-1 my-auto text-3xl text-gray-800">
              {" "}
              <BsCalendarFill />
            </div>
            <div className="col-span-2 pt-1">
              <p className="font-bold text-gray-800 lg:text-sm">Pickup date</p>
              <p className="text-sm text-gray-500">{props.date}</p>
            </div>
            <div className="my-auto">
              <a className="text-sm font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500">
                Change
              </a>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl lg:p-4">
            <div className="col-span-1 my-auto text-3xl text-gray-800">
              {" "}
              <BsClockFill />
            </div>
            <div className="col-span-2 pt-1">
              <p className="font-bold text-gray-800 lg:text-sm">Pickup time</p>
              <p className="text-sm text-gray-500">{props.time}</p>
            </div>
            <div className="my-auto">
              <a className="text-sm font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500">
                Change
              </a>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 rounded-2xl bg-gray-100/25 lg:p-4">
            <div className="col-span-1 my-auto text-3xl font-medium text-gray-800">
              {" "}
              Total:{" "}
              <hr className="h-[0.12rem] mt-1 bg-gray-400 absolute w-3/4" />
            </div>
            <div className="col-span-2 pt-1">
              <p className="font-bold text-gray-800 lg:text-sm"></p>
              <p className="text-sm text-gray-500"></p>
            </div>
            <div className="my-auto text-3xl">
              <a className="text-3xl text-gray-500">£{props.price}</a>
            </div>
          </div>
          <div className="h-10"></div>
          <button
            onClick={props.onClick}
            disabled={props.disabled}
            className="hidden justify-center p-4 m-auto w-5/6 text-3xl font-medium text-gray-50 bg-sky-500 rounded-lg lg:flex h-max disabled:bg-gray-400">
            Book Now
          </button>
          <div className="h-10"></div>
        </div>
      </div>
    </div>
  );
}
