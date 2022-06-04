import Image from "next/image"
import { FaCheck } from "@react-icons/all-files/fa/FaCheck"
import { Tooltip } from "flowbite-react"
import { FaUsers } from "@react-icons/all-files/fa/FaUsers"
import { FaSuitcase } from "@react-icons/all-files/fa/FaSuitcase"

export default function Service(props){
    
  const selectedServiceClass = "ring-2 ring-sky-400 bg-sky-400";
    return(
        <label
                htmlFor={props.for}
               
                className={`${
                  props.selected && selectedServiceClass
                } hover:scale-105 hover:ring-sky-500 hover:ring-2 duration-200 overflow-hidden flex gap-1 items-center appearance-none bg-gray-50 w-full py-4 px-10 my-4 rounded-lg active:ring-2 focus:ring-2 focus:ring-sky-500 active:ring-sky-500 h-44`}>
                <div className="w-20 min-w-max h-20 py-5 sm:w-32 sm:h-32">
                  <div className="flex items-center w-32 h-20">
                    <Image src={`/${props.image}.webp`} width={1920} height={1080} layout="" />
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-full max-w-full max-h-full text-left">
                  <p className="text-lg">{props.for}</p>
                  <ul className="hidden overflow-auto flex-col max-h-32 text-sm text-gray-500 xs:flex">
                    Includes:
                    <li className="flex overflow-ellipsis">
                      <FaCheck className="self-center pr-2 z-[7] min-w-max text-green-400 text-md" />{" "}
                      Free cancelation up to 24 hours before pickup
                    </li>
                    <li className="flex truncate">
                      <FaCheck className="self-center pr-2 z-[7] min-w-max text-green-400 text-md" />{" "}
                      Taxes & Fees included
                    </li>
                    <li className="flex truncate">
                      <FaCheck className="self-center pr-2 z-[7] min-w-max text-green-400 text-md" />{" "}
                      60 min. Free Waiting Time
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col justify-center items-center self-center">
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
                  <input
                    className="hidden"
                    id={props.for}
                    type="radio"></input>
                </div>
              </label>
    )
}