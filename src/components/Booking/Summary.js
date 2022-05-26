import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt";
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill";
import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt";
import { BsFillPersonPlusFill } from "@react-icons/all-files/bs/BsFillPersonPlusFill";
import { BsCalendarFill } from "@react-icons/all-files/bs/BsCalendarFill";
import { FaMapPin } from "@react-icons/all-files/fa/FaMapPin";
import { BsClockFill } from "@react-icons/all-files/bs/BsClockFill";
import { FaRoute } from "@react-icons/all-files/fa/FaRoute";
import {BsWatch} from "@react-icons/all-files/bs/BsWatch"
import Receipt from "../Svg/Receipt";
export default function Summary(props) {
  function handleClick(){
    console.log("click")
  }
  return (
    <div className="flex relative bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl lg:rounded-xl bg-clip-content w-screen  lg:w-full lg:float-left ">
      <div className="w-full mt-24  lg:mt-16 lg:max-w-lg">
        <div className="">
          <h2 className="lg:relative lg:top-[13rem] text-left justify-center flex lg:block lg:ml-16 text-gray-800 text-3xl font-bold ">
            Summary
          </h2>
          <Receipt className="" />
          <div className="">
            <div className="grid grid-cols-4 gap-2 px-4  w-5/6 m-auto  mt-5 p-4 lg:p-4 font-bold text-4xl text-sky-500">
              {" "}
              <div className="mt-5  truncate hover:text-ellipsis max-w-[8rem]">
                <label className="sr-only ">Distance</label> <FaRoute />
              </div>
              <div className="col-span-2">
                <hr className=" border-dashed border-b-4 border-t-0 border-gray-400 mt-10" />
              </div>
              <div className="text-2xl mt-5 ml-5 font-normal">
                {props.distance}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 px-4  w-5/6 m-auto  lg:p-4 text-4xl  text-sky-500">
              {" "}
              <div className=" font-bold"><BsWatch /></div>
              <div className="col-span-2">
                <hr className="  border-b-4 border-t-0 border-dashed border-gray-400 mt-10" />
              </div>
              <div className="text-2xl mt-5 ml-5">{props.duration}</div>
            </div>{" "}
          </div>
          <div className="grid grid-cols-4 gap-2 px-4  w-5/6 m-auto bg-gray-200 mt-5 p-4 lg:p-4 rounded-2xl">
            <div className="col-span-1 text-3xl text-gray-800 my-auto">
              {" "}
              <FaMapMarkerAlt />
            </div>
            <div className="col-span-2 pt-1">
              <p className="text-gray-800 font-bold lg:text-sm">
                Pickup address
              </p>
              <p className="text-gray-500 text-sm">{props.location}</p>
            </div>
            <div className="my-auto">
              <a className="text-indigo-700 underline hover:no-underline  text-sm hover:text-indigo-500 font-bold">
                Change
              </a>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 px-4  w-5/6 m-auto bg-gray-200 mt-5 p-4 lg:p-4 rounded-2xl">
            <div className="col-span-1 text-3xl text-gray-800 my-auto">
              {" "}
              <FaMapPin />
            </div>
            <div className="col-span-2 pt-1">
              <p className="text-gray-800 font-bold lg:text-sm">
                Dropoff address
              </p>
              <p className="text-gray-500 text-sm">{props.destination}</p>
            </div>
            <div className="my-auto">
              <a className="text-indigo-700 underline hover:no-underline  text-sm hover:text-indigo-500 font-bold">
                Change
              </a>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 px-4  w-5/6 m-auto bg-gray-200 mt-5 p-4 lg:p-4 rounded-2xl">
            <div className="col-span-1 text-3xl text-gray-800 my-auto">
              {" "}
              <BsFillPersonPlusFill />
            </div>
            <div className="col-span-2 pt-1">
              <p className="text-gray-800 font-bold lg:text-sm">Passengers</p>
              <p className="text-gray-500 text-sm">{props.passengers}</p>
            </div>
            <div className="my-auto">
              <a className="text-indigo-700 underline hover:no-underline  text-sm hover:text-indigo-500 font-bold">
                Change
              </a>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 px-4  w-5/6 m-auto bg-gray-200 mt-5 p-4 lg:p-4 rounded-2xl">
            <div className="col-span-1 text-3xl text-gray-800 my-auto">
              {" "}
              <BsCalendarFill />
            </div>
            <div className="col-span-2 pt-1">
              <p className="text-gray-800 font-bold lg:text-sm">Pickup date</p>
              <p className="text-gray-500 text-sm">{props.date}</p>
            </div>
            <div className="my-auto">
              <a className="text-indigo-700 underline hover:no-underline  text-sm hover:text-indigo-500 font-bold">
                Change
              </a>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 px-4  w-5/6 m-auto bg-gray-200 mt-5 p-4 lg:p-4 rounded-2xl">
            <div className="col-span-1 text-3xl text-gray-800 my-auto">
              {" "}
              <BsClockFill />
            </div>
            <div className="col-span-2 pt-1">
              <p className="text-gray-800 font-bold lg:text-sm">Pickup time</p>
              <p className="text-gray-500 text-sm">{props.time}</p>
            </div>
            <div className="my-auto">
              <a className="text-indigo-700 underline hover:no-underline  text-sm hover:text-indigo-500 font-bold">
                Change
              </a>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 px-4  w-5/6 m-auto bg-gray-100/25 mt-5 p-4 lg:p-4 rounded-2xl">
            <div className="col-span-1 text-3xl text-gray-800 font-medium my-auto">
              {" "}
              Total:{" "}
              <hr className="h-[0.12rem] mt-1 bg-gray-400 absolute w-3/4" />
            </div>
            <div className="col-span-2 pt-1">
              <p className="text-gray-800 font-bold lg:text-sm"></p>
              <p className="text-gray-500 text-sm"></p>
            </div>
            <div className=" text-3xl my-auto">
              <a className=" text-gray-500 text-3xl ">£{props.price}</a>
            </div>
          </div>
          <div className="h-10"></div>
          <button
            onClick={handleClick}
            disabled={true}
            className="lg:flex hidden justify-center rounded-lg w-5/6 h-max m-auto p-4  text-3xl font-medium text-gray-50 bg-sky-500 disabled:bg-gray-400">
            Book Now
          </button>
          <div className="h-10"></div>
        </div>
      </div>
    </div>
  );
}
