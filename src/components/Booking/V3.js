import React from "react";
import { useRef } from "react";
import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt";
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill";
import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt";
import { BsFillPersonPlusFill } from "@react-icons/all-files/bs/BsFillPersonPlusFill";
import { BsCalendarFill } from "@react-icons/all-files/bs/BsCalendarFill";
import { FaMapPin } from "@react-icons/all-files/fa/FaMapPin";
import { BsClockFill } from "@react-icons/all-files/bs/BsClockFill";

import InputField from "./InputField2";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Form.module.css";
import bg2 from "../../../public/bg-2.jpg";
import dynamic from "next/dynamic";
import getAddress from "../../../utils/get-address";
const HCaptcha = dynamic(() => import("@hcaptcha/react-hcaptcha"));

const Index = () => {
  // let form = useRef(null);
  const [form,setForm]= useState(null)
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  let today = year + "-" + month + "-" + day;
  const handleSubmit = (event) => {
    event.preventDefault();
    setForm(event.target)
   let form_data
    let payload = {};
   
    form_data = new FormData(form);
    form_data.forEach(function (value, key) {
      payload[key] = value;
    
    });
    console.log(payload)
    
    // const res = await fetch("/api/login", {
    //   body: JSON.stringify({
    //     email: ev.target.email.value,
    //     password: ev.target.password.value,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "POST",
    // })

    // const {user, error} = await res.json()

    // if(user) router.push(`/`)
    // if (error) alert(error)
   
    // console.log("payload", payload);
    // Place your API call here to submit your payload.
  };
  return (
    <div className="relative -top-64 z-[999999] w-max justify-center mx-auto bg-none py-4 ">
      <form id="booking" onSubmit={handleSubmit}>
        <div className="grid grid-rows-1 md:grid-rows-2 gap-2 justify-center">
          <div className="flex flex-col gap-2 lg:flex-row ">
            <div className="flex flex-row rounded-lg mx-2 border-1 border-gray-900">
              {" "}
              <span className="inline-flex  rounded-l-md  items-center px-3  bg-sky-100  text-gray-700 shadow-sm text-lg">
                <label
                  htmlFor="location"
                  className="sr-only ">
                  From
                </label>
                <FaMapMarkerAlt />
              </span>
              <input
                className=" border-0 rounded-r-md flex-1 appearance-none focus-ring-full w-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-100"
                name="location"
                type="text"
                required="true"
                placeholder="From..."
                
                
              />
            </div>
            <div className="flex flex-row rounded-lg mx-2 border-1 border-gray-900">
              {" "}
              <span className="inline-flex  rounded-l-md  items-center px-3  bg-sky-100  text-gray-700 shadow-sm text-lg">
                <label
                  htmlFor="destination"
                  className="sr-only ">
                  To
                </label>
                <FaMapPin />
              </span>
              <input
                className=" border-0 rounded-r-md flex-1 appearance-none focus-ring-full w-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-cyan-600"
                name="destination"
                required="true"
                type="text"
                placeholder="To..."
                
              />
            </div>
            <div className="flex flex-row rounded-lg mx-2 border-1 border-gray-900">
              {" "}
              <span className="inline-flex  rounded-l-md  items-center px-3  bg-sky-100  text-gray-700 shadow-sm text-lg">
                <label
                  htmlFor="passangers"
                  className="sr-only ">
                  Passangers
                </label>
                <BsFillPersonPlusFill />
              </span>
              <input
                className=" border-0 rounded-r-md flex-1 appearance-none focus-ring-full md:w-44 py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-cyan-600"
                name="passangers"
                required="true"
                type="number"
                placeholder="Passengers"
               
                min="1"
                max="16"
               
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 lg:flex-row">
          <div className="flex flex-row rounded-lg mx-2 border-1 border-gray-900">
              {" "}
              <span className="inline-flex  rounded-l-md  items-center px-3  bg-sky-100  text-gray-700 shadow-sm text-lg">
                <label
                  htmlFor="date"
                  className="sr-only ">
                  From
                </label>
                <BsCalendarFill />
              </span>
              <input
                className=" border-0 rounded-r-md flex-1 appearance-none focus-ring-full w-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-cyan-600"
                name="date"
                required="true"
                type="date"
                placeholder={today}
                defaultValue={today}
                
              />
               
              
            </div>
            <div className="flex flex-row rounded-lg mx-2 border-1 border-gray-900">
            <span className="inline-flex border-x-2  rounded-l-md  items-center px-3  bg-sky-100  text-gray-700 shadow-sm text-lg">
                <label
                  htmlFor="time"
                  className="sr-only ">
                  Time
                </label>
                <BsClockFill />
              </span>
              <input
                className=" border-0 rounded-r-md flex-1 appearance-none focus-ring-full w-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-cyan-600"
                name="time"
                required="true"
                type="time"
                placeholder=""
                defaultValue=""
                
              /></div>
            <div className="flex flex-row rounded-lg mx-2">
              <button
                type="submit"
                className=" shadow-sm py-2 px-4  w-full lg:w-64  rounded-full bg-sky-500 text-stone-50 text-xl   font-bold transition-all duration-1000 ease-in-out  ">
                Search
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Index;
