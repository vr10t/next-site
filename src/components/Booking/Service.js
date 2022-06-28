import Image from "next/image";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import { Tooltip } from "flowbite-react";
import { FaUsers } from "@react-icons/all-files/fa/FaUsers";
import { FaSuitcase } from "@react-icons/all-files/fa/FaSuitcase";
import { FaAngleDown } from "@react-icons/all-files/fa/FaAngleDown";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import { FaAngleUp } from "@react-icons/all-files/fa/FaAngleUp";
export default function Service(props) {
  const selectedServiceClass = "ring-2 ring-sky-400 ";
  const [showDetails, setShowDetails] = useState(false);
  // return <></>
  return (
    <label
      htmlFor={props.for}
      className={`${props.selected? selectedServiceClass:""} hover:scale-105 
                hover:ring-sky-500 
                hover:ring-2 
                duration-200 
                overflow-hidden 
                flex 
                flex-col
                xs:flex-row
                 
                gap-1 
                items-center 
                appearance-none 
                bg-gray-50 
                w-80 xs:w-full sm:max-w-max
                lg:py-4 
                  
                lg:px-10 
                my-4  mx-auto 
                rounded-lg 
                active:ring-2 
                focus:ring-2 focus:ring-sky-500 active:ring-sky-500 
                xs:h-44`}
                >
      <div className="w-20 min-w-max h-20 sm:py-5 sm:w-32 sm:h-32">
        <div className="flex items-center w-32 h-20">
          <Image
          
            src={`/${props.image}.webp`}
            width={1920}
            height={1080}
            layout=""
          />
        </div>
      </div>
      <div className="flex justify-center  w-96">
        <div className="hidden xs:flex flex-col gap-1 w-full max-w-full max-h-full xs:text-left">
          <p className="hidden text-lg text-center xs:block">{props.name}</p>
          <ul className="hidden max-w-32  flex-col max-h-32 xs:mr-2 text-sm text-gray-500 xs:flex">
            Includes:
            <li className="flex ">
              <FaCheck className="self-center mr-2 z-[7]  text-green-400 text-md" />{" "}
              Free cancelation up to 24 hours
            </li>
            <li className="flex truncate">
              <FaCheck className="self-center mr-2 z-[7]  text-green-400 text-md" />{" "}
              Taxes & Fees included
            </li>
            <li className="flex truncate">
              <FaCheck className="self-center mr-2 z-[7]  text-green-400 text-md" />{" "}
              60 min. Free Waiting Time
            </li>
          </ul>
        </div>

        <div
          onClick={() => setShowDetails((showDetails) => !showDetails)}
          className="flex flex-col items-center text-gray-800 xs:hidden">
         
          <Transition
            show={showDetails}
            enter="transition-all ease-in-out duration-200"
            enterFrom="  opacity-0"
            enterTo=""
            leave="transition-all ease-in-out  duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0 ">
            <div>
              <ul className="flex mx-auto px-2 flex-col h-32 text-sm text-gray-500 xs:flex">
                Includes:
                <li className="flex ">
                  <FaCheck className="self-center mr-2 z-[7] text-green-400 text-md" />{" "}
                  Free cancelation up to 24 hours 
                </li>
                <li className="flex">
                  <FaCheck className="self-center mr-2 z-[7]  text-green-400 text-md" />{" "}
                  Taxes & Fees included
                </li>
                <li className="flex ">
                  <FaCheck className="self-center mr-2 z-[7]  text-green-400 text-md" />{" "}
                  60 min. Free Waiting Time
                </li>
              </ul>
            </div>
          </Transition>
          <p className="text-lg text-center">{props.name}</p>
          <Transition
            show={!showDetails}
            enter="transition-all duration-200"
            enterFrom=" rotate-180 opacity-0"
            enterTo=""
            leave="transition-all duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <FaAngleDown className="z-[7]" />
          </Transition>
          <Transition
            show={showDetails}
            enter="transition-all duration-200"
            enterFrom=" opacity-0"
            enterTo="rotate-180"
            leave="transition-all duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <FaAngleDown className="z-[7]" />

          </Transition>
          
        </div>

        <div className="hidden flex-col justify-center items-end  mr-2 xs:mr-4 self-center xs:flex">
          <div className="flex flex-col items-center self-end">
            <Tooltip style="light" content="Passengers">
              <FaUsers className="text-sky-400" />
            </Tooltip>
            {props.passengers}
          </div>
          <div className="flex flex-col items-center self-end">
            <Tooltip style="light" content="Luggage">
              <FaSuitcase className="text-sky-400" />
            </Tooltip>
            {props.luggage}
          </div>
        </div>
        <input className="hidden" id={props.for} type="radio"></input>
      </div>
    </label>
  );
}
