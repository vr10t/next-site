import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt";
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill";
import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt";
import { BsFillPersonPlusFill } from "@react-icons/all-files/bs/BsFillPersonPlusFill";
import { BsCalendarFill } from "@react-icons/all-files/bs/BsCalendarFill";
import { FaMapPin } from "@react-icons/all-files/fa/FaMapPin";
import { BsClockFill } from "@react-icons/all-files/bs/BsClockFill";
import { FaRoute } from "@react-icons/all-files/fa/FaRoute";
import { BsWatch } from "@react-icons/all-files/bs/BsWatch";
import { FaTaxi } from "@react-icons/all-files/fa/FaTaxi";
import { FaCreditCard } from "@react-icons/all-files/fa/FaCreditCard";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import { useAppContext } from "../../context/state";
import {Tooltip} from "flowbite-react"
import Receipt from "../Svg/Receipt";
export default function Summary(props,children) {
 const {data} = useAppContext()
 const completed = "flex flex-row-reverse justify-start float-left px-1 gap-1 text-sky-500 ";
 const uncompleted = "mx-auto py-2 text-gray-500 ";
  return (
    <div className="flex w-screen bg-clip-content bg-gray-100 shadow-2xl lg:rounded-xl lg:w-full">
    
      <div className="overflow-auto mt-24 w-full lg:mt-2 lg:max-w-lg">
        <div className="">
          <h2 className="flex justify-center text-3xl font-bold text-left text-gray-800 mb-4 lg:my-10 lg:block lg:ml-16">
            Summary
          </h2>
          
          <div className="flex rounded-2xl bg-gray-200 mx-[2.7rem]">
          <div className="flex flex-col gap-4 py-6 grow">
            <div className="flex flex-row  m-auto  w-5/6 text-3xl font-bold text-gray-800">
              {" "}
              <div className="">
                <label className="sr-only">Distance</label>
                <Tooltip style="light" content="Distance">
                 <FaRoute /></Tooltip>
              </div>
              <div className="h-1/2 mx-4 border-t-0 border-b-2 border-gray-400 border-dashed grow">
               
              </div>
              <div className="self-center text-base font-bold">
                {props.distance}
               
              </div>
              
            </div>
            
            <div className="flex flex-row self-center m-auto  w-5/6 text-3xl font-bold text-gray-800">
              {" "}
              <div className="">
              <label className="sr-only">Estimated trip time</label>
              <Tooltip style="light" content="Estimated trip time">
              <BsWatch /></Tooltip>
              </div>
              <div className="h-1/2 mx-4 border-t-0 border-b-2 border-gray-400 border-dashed grow">
              </div>
              <div className="self-center text-base font-bold">{props.duration}</div>
            </div>
            </div>{" "}
            <Receipt className="" />
          </div>
          <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl">
            <div className="col-span-1 my-auto text-3xl text-gray-800">
              {" "}
              <div className={data.location ? completed : uncompleted}>
                  {data.location ? (
                    <FaCheck className="float-right text-sm" />
                  ) : (
                    ""
                  )}<FaMapMarkerAlt />
                  </div>
              
            </div>
            <div className="col-span-2 pt-1">
              <p className="font-bold text-gray-800 lg:text-sm">
                Pickup address
              </p>
              <p className={`${data.location}text-sm text-gray-500`}>{props.location}</p>
            </div>

            <div className="my-auto">
              <a className="text-sm font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500">
                Change
              </a>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl">
            <div className="col-span-1 my-auto text-3xl text-gray-800">
              {" "}
              <div className={data.destination ? completed : uncompleted}>
                  {data.destination ? (
                    <FaCheck className="float-right text-sm" />
                  ) : (
                    ""
                  )}<FaMapPin />
                  </div>
              
            </div>
            <div className="col-span-2 pt-1">
              <p className="font-bold text-gray-800 lg:text-sm">
                Dropoff address
              </p>
              <p className={`${data.destination }text-sm text-gray-500`}>{props.destination}</p>
            </div>

            <div className="my-auto">
              <a className="text-sm font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500">
                Change
              </a>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl">
            <div className="col-span-1 my-auto text-3xl text-gray-800">
              {" "}
              <div className={data.passengers ? completed : uncompleted}>
                  {data.passengers ? (
                    <FaCheck className="float-right text-sm" />
                  ) : (
                    ""
                  )}<BsFillPersonPlusFill />
                  </div>
              
            </div>
            <div className="col-span-2 pt-1">
              <p className="font-bold text-gray-800 lg:text-sm">Passengers</p>
              <p className={`${data.passengers }text-sm text-gray-500`}>{props.passengers}</p>
            </div>

            <div className="my-auto">
              <a className="text-sm font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500">
                Change
              </a>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl">
            <div className="col-span-1 my-auto text-3xl text-gray-800">
              {" "}<div className={data.date ? completed : uncompleted}>
                  {data.date ? (
                    <FaCheck className="float-right text-sm" />
                  ) : (
                    ""
                  )}<BsCalendarFill />
                  </div>
              
            </div>
            <div className="col-span-2 pt-1">
              <p className="font-bold text-gray-800 lg:text-sm">Pickup date</p>
              <p className={`${data.date }text-sm text-gray-500`}>{props.date}</p>
            </div>

            <div className="my-auto">
              <a className="text-sm font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500">
                Change
              </a>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl">
            <div className="col-span-1 my-auto text-3xl text-gray-800">
              {" "}<div className={data.time ? completed : uncompleted}>
                  {data.time ? (
                    <FaCheck className="float-right text-sm" />
                  ) : (
                    ""
                  )}<BsClockFill />
                  </div>
              
            </div>
            <div className="col-span-2 pt-1">
              <p className="font-bold text-gray-800 lg:text-sm">Pickup time</p>
              <p className={`${data.time }text-sm text-gray-500`}>{props.time}</p>
            </div>

            <div className="my-auto">
              <a className="text-sm font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500">
                Change
              </a>
            </div>
          </div>
          {data.service && 
            <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl">
            <div className="col-span-1 my-auto text-3xl text-gray-800">
              {" "}<div className={data.service ? completed : uncompleted}>
                  {data.time ? (
                    <FaCheck className="float-right text-sm" />
                  ) : (
                    ""
                  )}<BsClockFill />
                  </div>
              
            </div>
            <div className="col-span-2 pt-1">
              <p className="font-bold text-gray-800 lg:text-sm">Pickup time</p>
              <p className={`${data.time }text-sm text-gray-500`}>{props.time}</p>
            </div>

            <div className="my-auto">
              <a className="text-sm font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500">
                Change
              </a>
            </div>
          </div>}
          <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 rounded-2xl bg-gray-100/25">
            <div className="col-span-1 my-auto text-3xl font-medium text-gray-800">
              {" "}
              Total:{" "}
              <hr className="h-[0.12rem] mt-1 bg-gray-400 absolute w-3/4" />
            </div>
            <div className="col-span-2 pt-1">
              <p className="font-bold text-gray-800 lg:text-sm"></p>
              <p className={`text-sm text-gray-500`}></p>
            </div>

            <div className="my-auto text-3xl">
              <a className="text-3xl text-gray-500">£{props.price===undefined?"loading..":props.price}</a>
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
