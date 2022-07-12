import { useRouter } from "next/router";
import { getBookingById } from "../../../utils/supabase-helpers";
import Layout from "../../../src/components/layout";
import Sidebar from "../../../src/components/Account/Sidebar";
import { useState, useEffect } from "react";
import Map from "../../../src/components/Map";
import { FaSquare } from "@react-icons/all-files/fa/FaSquare";
import { FaCircle } from "@react-icons/all-files/fa/FaCircle";
import dayjs from "dayjs";
import useSWR from "swr";
import { Spinner } from "flowbite-react";
const fetcher = (url:string, id:string) =>
  fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json', 'id':id, }),
    credentials: 'same-origin',
  }).then((res) => res.json())
export default function handler() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [shouldFetchDirections, setShouldFetchDirections] = useState(false);
  
   
  
    
  const [booking, setBooking] = useState({
    id: "",
    created_at: "",
    location: "",
    destination: "",
    date: "",
    passengers: "",
    distance: "",
    service: "",
    return_date: "",
    flight_number: "",
    first_name: "",
    email: "",
    phone: "",
    last_name: "",
    time: "20:21",
    return_time: "",
    luggage: "",
    return_luggage: "",
    plane_arriving_from: "",
    airline_name: "",
    return_first_name: "",
    return_email: "",
    return_phone: "",
    return_service: "",
    return_last_name: "",
    return_passengers: "",
    return_location: "",
    return_destination: "",
    user_id: "",
    status: "Pending",
  });
 
  const router = useRouter();
  // console.log(router.query);
  const qid:string|string[]|undefined = router.query.id; 
  
  const { data, error } = useSWR([`/api/get-booking-id`,qid], fetcher)
  useEffect(()=>{console.log(data?.data,"DATA",error)})
  useEffect(() => {
  
     if (data) setBooking(data.data[0]);
        console.log(booking, "booking");
     
  }, [data,error]);
  const date = dayjs(booking.date + booking.time).format(
    "dddd, MMMM D, YYYY h:mm A"
  );
  console.log(date);
  useEffect(() => {
    setOrigin(booking.location);
    setDestination(booking.destination);
  }, [booking]);
  return (
    <>
      <Layout title="My Account">
      <div className="flex">
        <Sidebar />
        {data?<div className="w-full h-screen  items-center flex flex-col gap-4 pt-10 ">
          <div className="bg-gray-200 flex flex-col items-start px-4 gap-2 py-5 h-full rounded-lg w-11/12 ">
            <div className="text-3xl  text-gray-900 font-medium tracking-tight">
              Your booking details
            </div>
            <div className="text-md text-gray-900 font-medium tracking-tight">
              {date}{" "}
            </div>
            <span className="bg-black/20 w-5/6 h-[1px]"></span>
            <div className="flex flex-col bg-gray-100 w-full px-4 py-4 rounded-lg">
            {/* <Map
              width="100%"
              height="100px"
            origin={origin}
            destination={destination}
            shouldFetchDirections={true} /> */}
            
            <div className="flex my-10 ">
              <div className="flex mt-2 pr-4 flex-col h-5/6">
                <FaCircle className="mt-2 text-sky-500">.</FaCircle>
                <div className="border-l-4 h-full self-center border-sky-600/20 border-dotted border-"></div>
                <FaSquare className="text-sky-500"></FaSquare>
              </div>
              <div>
                <div className="text-xl text-gray-900 font-medium tracking-tight">
                  {booking.location}{" "}
                </div>
                <div className="text-sm text-gray-900 font-normal tracking-normal">
                  {dayjs(date).format("h:mm A")}{" "}
                </div>
                <div className="text-xl mt-5 text-gray-900 font-medium tracking-tight">
                  {booking.destination}{" "}
                </div>
              </div>
            </div></div>
            <div className="flex justify-center gap-4 w-full">
              <button className="bg-sky-500 text-gray-50 py-2 px-2 rounded-lg text-lg w-full">Edit booking</button>
              <button className="bg-red-500 text-gray-50 py-2 px-2 rounded-lg text-lg w-full">Cancel booking</button>
            </div>
          </div>
        </div>:<div className="flex justify-center w-full mt-64"><Spinner size="xl"  /></div>}
      </div>{" "}
      </Layout>
    </>
  );
}
