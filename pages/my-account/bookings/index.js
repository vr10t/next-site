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
export default function MyAccount() {
  const session = useAuthContext();
  const router = useRouter();
  let bookings = [];
  const response = [
    {
      id: 110,
      created_at: "2022-06-30T14:27:20.916059+00:00",
      location: "SAS Shelters, Ramridge Road, Luton, UK",
      destination: "Selbourne Road, Maidenhall, Luton, UK",
      date: "2022-06-27",
      passengers: 4,
      distance: "2.8 mi",
      service: "Standard",
      return_date: "",
      flight_number: null,
      first_name: "asffsa",
      email: "vr10t@tutanota.com",
      phone: "0977898988",
      last_name: "sdasf",
      time: null,
      return_time: "",
      luggage: null,
      return_luggage: null,
      plane_arriving_from: null,
      airline_name: null,
      return_first_name: null,
      return_email: null,
      return_phone: null,
      return_service: null,
      return_last_name: null,
      return_passengers: null,
      return_location: null,
      return_destination: null,
      user_id: null,
    },
    {
      id: 111,
      created_at: "2022-06-30T14:27:58.650413+00:00",
      location: "SAS Shelters, Ramridge Road, Luton, UK",
      destination: "Selbourne Road, Maidenhall, Luton, UK",
      date: "2022-06-27",
      passengers: 4,
      distance: "2.8 mi",
      service: "MPV",
      return_date: "",
      flight_number: null,
      first_name: "asffsa",
      email: "vr10t@tutanota.com",
      phone: "0977898988",
      last_name: "sdasf",
      time: null,
      return_time: "",
      luggage: null,
      return_luggage: null,
      plane_arriving_from: null,
      airline_name: null,
      return_first_name: null,
      return_email: null,
      return_phone: null,
      return_service: null,
      return_last_name: null,
      return_passengers: null,
      return_location: null,
      return_destination: null,
      user_id: null,
    },
    {
      id: 114,
      created_at: "2022-06-30T14:27:58.650413+00:00",
      location: "SAS Shelters, Ramridge Road, Luton, UK",
      destination: "Selbourne Road, Maidenhall, Luton, UK",
      date: "2022-06-27",
      passengers: 4,
      distance: "2.8 mi",
      service: "MPV",
      return_date: "",
      flight_number: null,
      first_name: "asffsa",
      email: "vr10t@tutanota.com",
      phone: "0977898988",
      last_name: "sdasf",
      time: "20:32",
      return_time: "",
      luggage: null,
      return_luggage: null,
      plane_arriving_from: null,
      airline_name: null,
      return_first_name: null,
      return_email: null,
      return_phone: null,
      return_service: null,
      return_last_name: null,
      return_passengers: null,
      return_location: null,
      return_destination: null,
      user_id: null,
    },
    {
      id: 117,
      created_at: "2022-06-30T14:27:58.650413+00:00",
      location: "SAS Shelters, Ramridge Road, Luton, UK",
      destination: "Selbourne Road, Maidenhall, Luton, UK",
      date: "2022-06-27",
      passengers: 4,
      distance: "2.8 mi",
      service: "MPV",
      return_date: "",
      flight_number: null,
      first_name: "asffsa",
      email: "vr10t@tutanota.com",
      phone: "0977898988",
      last_name: "sdasf",
      time: "20:32",
      return_time: "",
      luggage: null,
      return_luggage: null,
      plane_arriving_from: null,
      airline_name: null,
      return_first_name: null,
      return_email: null,
      return_phone: null,
      return_service: null,
      return_last_name: null,
      return_passengers: null,
      return_location: null,
      return_destination: null,
      user_id: null,
    },
  ];
  const userBookings = ["110", "114"];
  useEffect(() => {
    console.log(session);
    if (!session) {
      // router.push("/signin")
      return;
    }
    // getBookingsForUser(id).then((res) => {
    //   console.log(res[0].bookings);
    //   getBookings().then((resp) => console.log(resp));
    // });

    //  let now = dayjs().add(2,'hours')
    //  console.log(now);

    console.log(bookings, "newArray");
  }, [session]);
  bookings = response.filter((element) =>
    userBookings.includes(element.id.toString())
  );
  function handleClick(ev) {
    router.push(`/my-account/bookings/${ev.target.id}`);
  }
  return (
    <>
      <Layout title="My Bookings">
        <div className="flex">
          <Sidebar />
          <div className="flex z-20 flex-col gap-4 items-center pt-10 w-full h-screen bg-red-600">
            <div className="flex z-0 flex-col items-center w-full text-black bg-white">
              {bookings.map((booking) => (
                <div
                  onClick={handleClick}
                  className="px-2 py-4 my-2 w-5/6 h-32 bg-gray-100 rounded-md cursor-pointer group hover:bg-sky-500"
                  key={booking.id}
                  id={booking.id}>
                  <div id={booking.id} className="flex mb-2 peer">
                    <BsCalendarFill
                      aria-hidden
                      className="self-center mr-2 text-sky-500"
                    />
                    {booking.date}
                    {", "}
                    {booking.time}
                  </div>
                  {
                    <div
                      id={booking.id}
                      className="flex flex-col justify-center">
                      <div className="flex">
                        <FaArrowRight
                          aria-hidden
                          className="self-center text-sky-500"
                        />{" "}
                        <div
                          id={booking.id}
                          className="flex pl-2 w-11/12 text-gray-900 truncate">
                          {booking.location}
                        </div>
                      </div>
                      <div id={booking.id} className="flex">
                        <FaArrowRight
                          aria-hidden
                          className="self-center text-sky-500"
                        />{" "}
                        <div
                          id={booking.id}
                          className="flex pl-2 w-11/12 text-gray-900 truncate">
                          {booking.destination}
                        </div>
                      </div>
                    </div>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
