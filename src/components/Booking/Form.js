import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt";
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill";
import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt";
import { BsFillPersonPlusFill } from "@react-icons/all-files/bs/BsFillPersonPlusFill";
import { BsCalendarFill } from "@react-icons/all-files/bs/BsCalendarFill";
import { FaMapPin } from "@react-icons/all-files/fa/FaMapPin";
import { BsClockFill } from "@react-icons/all-files/bs/BsClockFill";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import InputField from "./InputField2";
import styles from "./Form.module.scss";
import bg2 from "../../../public/bg-2.jpg";

const HCaptcha = dynamic(() => import("@hcaptcha/react-hcaptcha"));

export default function Form() {
  const [canLoad, setCanLoad]= useState(false)
  const [term, setTerm]= useState('')


  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (month < 10) month = `0${  month}`;
  if (day < 10) day = `0${  day}`;
  const today = `${year  }-${  month  }-${  day}`;
  
  
  useEffect(()=>setTimeout(() => (
    setCanLoad(true)
    ), 10000),[])
    function handleChange(e){
      setTerm(e.target.value);
      getAddress()
    }
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2 z-10 bg-stone-100   ">
      <div className="px-5 mt-4">
        <h3>Looking for a taxi?</h3>

        <h1 className={` ${styles.textAni} text-5xl text-sky-700  font-bold `}>
          Make your booking
        </h1>
        <h5>
          Our taxis commit to make your trips unique by best answering your
          needs.
        </h5>
        <div className="mt-4 ">
          <Image className="rounded-xl " src={bg2} width={4000} height={3000} alt="..." />
        </div>
      </div>
      <div className="m-4 justify-center flex">
        <form autoComplete="off" action="https://formspree.io/f/xoqrkbwb" method="POST">
          <div className="grid max-w-2xl left-1/2 ">
            <h1 className="text-center font-bold ">Book a Ride</h1>
            <div className="md:grid mx-4 xl:grid-cols-2 lg:gap-4 md:float-right">
              <div className="noblur flex flex-col">
                {" "}
                {/* first col */}
                <InputField
                  icon={
                    <BsFillPersonFill className="pt-1 text-3xl text-stone-800 justify-start" />
                  }
                  label="Name"
                  name="name"
                  required
                  type="text"
                  placeholder="Your name"
                />
                <InputField
                  icon={
                    <FaPhoneAlt className="pt-1 text-center  text-3xl text-stone-800 justify-start" />
                  }
                  label="Phone"
                  name="telephone"
                  required
                  type="tel"
                  defaultValue="+44"
                  placeholder="+44"
                />
                <InputField
                  icon={
                    <BsCalendarFill className="pt-1 text-3xl text-stone-800 justify-start" />
                  }
                  label="Pickup date"
                  name="date"
                  required
                  type="date"
                  defaultValue={today}
                />
                <InputField
                  icon={
                    <BsClockFill className="pt-1 text-3xl text-stone-800 justify-start" />
                  }
                  label="Pickup time"
                  name="time"
                  required
                  max="10"
                  type="time"
                />
              </div>
              <div className="flex flex-col">
                {" "}
                {/* second col */}
                <InputField
                  icon={
                    <BsFillPersonPlusFill className="pt-1 text-3xl text-stone-800 justify-start" />
                  }
                  label="Passangers"
                  name="passangers"
                  required
                  min="1"
                  max="10"
                  type="number"
                  placeholder="Number of passangers"
                />
                <InputField
                value={term}
                onChange={handleChange}
                  icon={
                    <FaMapMarkerAlt className="pt-1 text-3xl text-stone-800 justify-start" />
                  }
                  label="Pickup from"
                  name="location"
                  required
                  type="text"
                  placeholder="Type in your pickup location"
                />
                <InputField
                  icon={
                    <FaMapPin className="pt-1 text-3xl text-stone-800 justify-start" />
                  }
                  label="Destination"
                  name="destination"
                  required
                  type="text"
                  placeholder="Type in your destination"
                />
                <div className="mt-4 pt-1 ">
                  {canLoad&&<HCaptcha
                    required
                    sitekey="63ecdeb2-95ea-4c7a-9e95-02195a81d5c5"
                    onVerify={(token, ekey) =>
                      handleVerificationSuccess(token, ekey)
                    }
                  />}
                </div>
              </div>
            </div>
            <div className="flex px-8 lg:px-16 mt-4 flex-row">
              <input
                name="tos"
                id="tos"
                required
                className=" lg:p-4 mt-2 scale-150 "
                type="checkbox"
              />
              <label className=" text-gray-700 px-2 lg:indent-2" htmlFor="tos">
                By using this form you agree with the storage and handling of
                your data by this website.
              </label>
            </div>

            <button
              type="submit"
              className="flex mx-6 align-middle py-3 relative mt-9 h-16 xl:w-full bg-gradient-to-r hover:from-cyan-700 hover:to-sky-800 to-sky-700  from-cyan-600  rounded-full text-stone-50 text-xl justify-center  shadow-md font-bold transition-all duration-1000 ease-in-out ">
              Book Now!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
