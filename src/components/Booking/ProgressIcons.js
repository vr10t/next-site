import { FaMapMarkerAlt} from "@react-icons/all-files/fa/FaMapMarkerAlt"
import { BsCalendarFill } from "@react-icons/all-files/bs/BsCalendarFill"
import { FaCheck } from "@react-icons/all-files/fa/FaCheck"
import { FaTaxi } from "@react-icons/all-files/fa/FaTaxi"
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill"
import { FaCreditCard } from "@react-icons/all-files/fa/FaCreditCard"
import { useAppContext } from "../../context/state"

export default function ProgressIcons(props){
const {data} = useAppContext()
const completed = "mx-auto py-2 text-sky-500 ";
  const uncompleted = "mx-auto py-2 text-gray-500 ";
    return(
        <div className="grid absolute left-0 bottom-20 grid-cols-5 px-4 w-screen text-4xl bg-gray-100 max-w-screen">
                <div
                  className={
                    data.location && data.destination ? completed : uncompleted
                  }>
                  {data.location && data.destination ? (
                    <FaCheck className="float-right text-sm" />
                  ) : (
                    ""
                  )}
                  <FaMapMarkerAlt className="px-1" />
                </div>
                <div
                  className={data.date && data.time ? completed : uncompleted}>
                  {data.date && data.time ? (
                    <FaCheck className="float-right text-sm" />
                  ) : (
                    ""
                  )}
                  <BsCalendarFill className="px-1" />
                </div>
                <div className={data.service ? completed : uncompleted}>
                  {data.service ? (
                    <FaCheck className="float-right text-sm" />
                  ) : (
                    ""
                  )}
                  <FaTaxi className="px-1" />
                </div>
                <div className={data.name&&data.email&&data.phone ? completed : uncompleted}>
                  {data.name&&data.email&&data.phone ? (
                    <FaCheck className="float-right text-sm" />
                  ) : (
                    ""
                  )}
                  <BsFillPersonFill className="px-1" />
                </div>
                <div className={data.payment ? completed : uncompleted}>
                  {data.payment ? (
                    <FaCheck className="float-right text-sm" />
                  ) : (
                    ""
                  )}
                  <FaCreditCard className="px-1" />
                </div>
              </div>
    )
}