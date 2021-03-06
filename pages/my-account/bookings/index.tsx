import { useRouter } from "next/router";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { BsCalendarFill } from "@react-icons/all-files/bs/BsCalendarFill";
import { FaArrowRight } from "@react-icons/all-files/fa/FaArrowRight";
import { FaAngleRight } from "@react-icons/all-files/fa/FaAngleRight";
import { Spinner } from "flowbite-react";
import { useAuthContext } from "../../../src/context/state";
import Layout from "../../../src/components/layout";
import Sidebar from "../../../src/components/Account/Sidebar";
import {
  getBookingsForUser,
  getBookings,
} from "../../../utils/supabase-helpers";
import { supabase } from "../../../utils/supabaseClient";
 
export interface Booking{
status: string;
id:string
date:string
time:string
location:string
destination:string
total:string
upcoming?:boolean
  }
export default function MyAccount() {
  const user = useAuthContext();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const id = user?.id;
  const [response, setResponse] = useState<Booking[]>([]);
  const [userBookings, setUserBookings] = useState<string[]>([]);
  const [sortedBookings,setSortedBookings]= useState<Booking[]>([])
  const [loading,setLoading]= useState(true)
  const {data,isLoading,isError}= getBookings(userBookings)
 console.log(data,response,"Error");
 
 
 

  useEffect(() => {
    // let date=dayjs(bookings[0].date + bookings[0].time)
    // console.log(date);

    // const now=dayjs().isAfter(date)
    // console.log(now, "IS IT BEFORE");
   
    console.log(user);
    if (!user) {
      // router.push("/signin")
      return;
    }
    try {
      
      
      setUserBookings(user?.bookings[0].split(",") as unknown as SetStateAction<string[]> );
     
    
    if(data){console.log(data.data, "ALL bOOKings");
      setResponse(data.data);}
      
    console.log(data[0],isError);

    } catch (error) {
      console.error( error)
    }
    finally{}
    
    
    //  let now = dayjs().add(2,'hours')
    //  console.log(now);
console.log(userBookings, "USER BOOKINGS");

    console.log(bookings, "newArray");
  }, [user,data,]);

  useEffect(() => {
    console.log("response", response, "userbooking", userBookings);
   if (Array.isArray(response)) {
    setBookings(response.filter((element) => userBookings.includes((element as any).id))
    
    );
  }
   
    console.log(bookings, "BOOKINGS");
  }, [response,userBookings]);
  useEffect(()=>{
   const isUpcoming = bookings.map((booking)=>{
      const date=dayjs(booking.date + booking.time)
      let statusColor =''
      if (booking?.status === 'Pending') {
        statusColor = 'amber-400';
      }
      if (booking?.status === 'Confirmed') {
        statusColor = 'green-500';
      }
      if (booking?.status === 'Cancelled') {
        statusColor = 'red-500';
      }
      if (booking?.status === 'Completed') {
        statusColor = 'blue-500';
      }
      const upcoming = dayjs().isBefore(date)
      return{ ...booking,upcoming,statusColor}
      // setBookings(bookings=>[...bookings])
    })
    setSortedBookings(isUpcoming)
    console.log(isUpcoming,"ISUPCOMING");
  },[bookings])
  // wait 5 seconds for the data to load
  
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    }
    ,5000)
  }
  ,[])
  
console.log(sortedBookings,"SORTED");
  function handleClick(ev:React.MouseEvent<HTMLDivElement>) {
    router.push(`/my-account/bookings/${(ev.target as any).id}`);
  }
  return (
    <Layout title="My Bookings">
        <div className="flex">
          <Sidebar />
          {sortedBookings.length === 0?
          <div className="flex justify-center w-full mt-64"><Spinner size="xl"  /></div>
          : <div className="flex z-20 flex-col gap-4 items-center pt-10 w-full ">
          <div className="flex z-0 flex-col items-start w-full  0">
          <p className=" text-2xl text-gray-900 font-medium tracking-wide">Upcoming</p>
          {sortedBookings.map((booking) => (
              booking.upcoming?  <div
                  onClick={handleClick}
                  className="flex justify-between px-6 py-4 my-2 w-full h-32 rounded-md cursor-pointer group hover:bg-gray-200"
                  key={booking.id}
                  id={booking.id}>
                  {
                    <div
                      id={booking.id}
                      className="flex flex-col justify-center w-11/12">
                      <div id={booking.id} className="flex mb-2 text-lg text-gray-900 font-bold">
                        {/* <BsCalendarFill
                      aria-hidden
                      className="self-center mr-2 text-sky-500"
                    /> */}
                        {booking.destination}
                      </div>
                      <div className="flex">
                        {/* <FaArrowRight
                          aria-hidden
                          className="self-center text-sky-500"
                        />{" "} */}
                        <div
                          id={booking.id}
                          className="flex pl-2 w-11/12 text-gray-700 text-sm truncate">
                          {dayjs(booking.date + booking.time).format(
                          "dddd, MMMM D, YYYY h:mm A"
                        )}
                        </div>
                      </div>
                      <div id={booking.id} className="flex">
                        {/* <FaArrowRight
                          aria-hidden
                          className="self-center text-sky-500"
                        />{" "} */}
                        <div
                          id={booking.id}
                          className="flex pl-2 w-11/12 text-gray-700 text-sm truncate">
                          ??{booking.total}
                        </div>
                      </div>
                    </div>
                  }
                  <span className="self-center text-gray-900 text-xl">
                    <FaAngleRight />
                  </span>
                </div> :<></>
              ))}
          </div>
            <div className="flex z-0 flex-col items-start w-full  mb-10">
            <p className=" text-2xl text-gray-900 font-medium tracking-wide">Past</p>
              {sortedBookings.map((booking) => (
                booking.upcoming?<></>:<div
                  onClick={handleClick}
                  className="flex justify-between px-6 py-4 my-2 w-full h-32 rounded-md cursor-pointer group hover:bg-gray-200"
                  key={booking.id}
                  id={booking.id}>
                  {
                    <div
                      id={booking.id}
                      className="flex flex-col justify-center w-11/12">
                      <div id={booking.id} className="flex mb-2 text-lg text-gray-900 font-bold">
                        {/* <BsCalendarFill
                      aria-hidden
                      className="self-center mr-2 text-sky-500"
                    /> */}
                        {booking.destination}
                      </div>
                      <div className="flex">
                        {/* <FaArrowRight
                          aria-hidden
                          className="self-center text-sky-500"
                        />{" "} */}
                     {  booking.status ==='Cancelled' && <p className="text-red-500 text-sm">Cancelled</p>}
                        <div
                          id={booking.id}
                          className="flex pl-2 w-11/12 text-gray-700 text-sm truncate">
                          {dayjs(booking.date + booking.time).format(
                          "dddd, MMMM D, YYYY h:mm A"
                        )}{booking.status}
                        </div>
                      </div>
                      <div id={booking.id} className="flex">
                        {/* <FaArrowRight
                          aria-hidden
                          className="self-center text-sky-500"
                        />{" "} */}
                        <div
                          id={booking.id}
                          className="flex pl-2 w-11/12 text-gray-700 text-sm truncate">
                          ??{booking.total}
                        </div>
                      </div>
                    </div>
                  }
                  <span className="self-center text-gray-900 text-xl">
                    <FaAngleRight />
                  </span>
                </div>
              ))
              }
            </div>
          </div>}
        </div>
      </Layout>
  );
}
