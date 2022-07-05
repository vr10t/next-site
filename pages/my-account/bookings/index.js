import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../src/context/state";
import Layout from "../../../src/components/layout";
import Sidebar from "../../../src/components/Account/Sidebar";
import {
  getBookingsForUser,
  getBookings,
} from "../../../utils/supabase-helpers";
import dayjs from "dayjs";
import { BsCalendarFill } from "@react-icons/all-files/bs/BsCalendarFill";
import { FaArrowRight } from "@react-icons/all-files/fa/FaArrowRight";
import { FaAngleRight } from "@react-icons/all-files/fa/FaAngleRight";
import { supabase } from "../../../utils/supabaseClient";
export default function MyAccount() {
  const session = useAuthContext();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const id = session?.user.id;
  const [response, setResponse] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  useEffect(() => {
    // let date=dayjs(bookings[0].date + bookings[0].time)
    // console.log(date);

    // const now=dayjs().isAfter(date)
    // console.log(now, "IS IT BEFORE");
    console.log(session);
    if (!session) {
      // router.push("/signin")
      return;
    }
    getBookingsForUser(id).then((res) => {
      console.log(res, "USER bOOKINGS");
      let [data, error] = res;
      if (data) setUserBookings(res[0].bookings[0].split(","));
      if (error) console.error(error);
      console.log(userBookings);
    });
    getBookings().then((resp) => {
      console.log(resp, "ALL bOOKings");
      setResponse(resp);
    });
    //  let now = dayjs().add(2,'hours')
    //  console.log(now);

    console.log(bookings, "newArray");
  }, [session]);

  useEffect(() => {
    console.log("response", response, "userbooking", userBookings);
    setBookings(
      response.filter((element) => userBookings.includes(element.id.toString()))
    );
   
    console.log(bookings, "BOOKINGS");
  }, [response, userBookings]);
  useEffect(()=>{
   const isUpcoming = bookings.map((booking)=>{
      let date=dayjs(booking.date + booking.time)
      
      let upcoming = dayjs().isBefore(date)
      return{ id:booking.id,upcoming:upcoming}
      // setBookings(bookings=>[...bookings])
    })
    console.log(isUpcoming);
  },[bookings])

  function handleClick(ev) {
    router.push(`/my-account/bookings/${ev.target.id}`);
  }
  return (
    <>
      <Layout title="My Bookings">
        <div className="flex">
          <Sidebar />
          <div className="flex z-20 flex-col gap-4 items-center pt-10 w-full h-screen ">
          <div className="flex z-0 flex-col items-start w-full  0">
          <p className=" text-2xl text-gray-900 font-medium tracking-wide">Upcoming</p>
          {bookings.map((booking) => (
                <div
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
                        )}{booking.upcoming}
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
                          £{booking.total}
                        </div>
                      </div>
                    </div>
                  }
                  <span className="self-center text-gray-900 text-xl">
                    <FaAngleRight />
                  </span>
                </div>
              ))}
          </div>
            <div className="flex z-0 flex-col items-start w-full  mb-10">
            <p className=" text-2xl text-gray-900 font-medium tracking-wide">Past</p>
              {bookings.map((booking) => (
                <div
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
                          £{booking.total}
                        </div>
                      </div>
                    </div>
                  }
                  <span className="self-center text-gray-900 text-xl">
                    <FaAngleRight />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
