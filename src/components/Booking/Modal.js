import React, { useState } from "react";
import { Form, Container } from "react-bootstrap";
import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt";
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill";
import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt";
import { BsFillPersonPlusFill } from "@react-icons/all-files/bs/BsFillPersonPlusFill";
import { BsCalendarFill } from "@react-icons/all-files/bs/BsCalendarFill";
import { FaMapPin } from "@react-icons/all-files/fa/FaMapPin";
import { BsClockFill } from "@react-icons/all-files/bs/BsClockFill";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import ButtonPhat from "../Buttons/ButtonPhat";
import "./Modal.scss";
import InputField from "./InputField";

export default function ModalForm() {
  const [showModal, setShowModal] = useState(false);

  const toggleShow = () => setShowModal();
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (month < 10) month = `0${  month}`;
  if (day < 10) day = `0${  day}`;
  const today = `${year  }-${  month  }-${  day}`;

  function handleVerificationSuccess(token) {
    console.log(`Verified: ${  token}`)
  }

  return (
    <div
        className=" flex flex-col md:right-4 lg:right-20 
      md:absolute md:top-40
     
      text-gray-800
      
      md:shadow-2xl 
      md:h-auto
      md:block
       
      md:w-80
      lg:w-80 h-[55rem] bg-gray-100 md:bg-orange-400 rounded-xl  z-10   ">
        <div className="flex md:left-48 flex-col mx-auto  md:mx-auto max-w-sm lg:justify-left">
          <div className="w-auto max-w-sm  mb-4 md:mb-0 ">
            <h4 className=" flex justify-center   text-2xl pt-1">
              Book a Ride
            </h4>
          </div>
          <form
            className=" w-auto md:-mt-4 items-center flex flex-col"
            action="https://formspree.io/f/xoqrkbwb"
            method="post">
            <InputField
              icon={<BsFillPersonFill className="pt-1 text-xl" />}
              label="Name"
              name="name"
              required
              type="text"
              placeholder="Your name"
            />
            <div className="md:flex md:flex-row md:gap-x-2">
              <InputField
                l="w-24"
                i="md:w-40"
                width="half"
                icon={<FaPhoneAlt className="pt-1 text-xl" />}
                label="Phone"
                name="telephone"
                required
                type="tel"
                defaultValue="+44"
                placeholder="+44"
              />
              <InputField
                l=" w-28 "
                i="md:w-[7rem]"
                width="half"
                icon={<BsFillPersonPlusFill className="pt-1 text-xl" />}
                label="Passangers"
                name="passangers"
                required
                defaultValue="1"
                min="1"
                max="10"
                type="number"
                placeholder="Number of passangers"
              />
            </div>
            <div className="md:flex md:flex-row md:gap-x-2 ">
              {" "}
              <InputField
                l="w-24 "
                i="md:w-40"
                width="half"
                icon={<BsCalendarFill className="pt-1 text-xl" />}
                label="Date"
                name="date"
                required
                type="date"
                defaultValue={today}
              />
              <InputField
                l=" w-28"
                i="md:w-[7rem]"
                width="half"
                icon={<BsClockFill className="pt-1 text-xl" />}
                label="Pickup Time"
                name="time"
                required
                max="10"
                type="time"
              />
            </div>
            <InputField
              icon={<FaMapMarkerAlt className="pt-1 text-xl" />}
              label="Pickup from"
              name="location"
              required
              type="text"
              placeholder="Type in your pickup location"
            />
            <InputField
              icon={<FaMapPin className="pt-1 text-xl" />}
              label="Destination"
              name="destination"
              required
              type="text"
              placeholder="Type in your destination"
            />
            <div className="w-auto mx-auto md:mx-2 md:flex md:flex-row  md:h-auto md:px-4 md:max-w-xs mb-0  ">
              <input
              name="tos"
              id="tos"
                required
                className="md:ml-0  ml-2 flex float-left justify-start mt-4 md:mt-0 w-10  "
                type="checkbox"
                
                />
                <label className="md:w-64 w-72  md:-ml-6 md:mt-4 flex justify-center md:indent-4" htmlFor="tos">By using this form you agree with the storage and handling of your data by this website.</label>
            </div>
            {/* <HCaptcha
      sitekey="63ecdeb2-95ea-4c7a-9e95-02195a81d5c5"
      onVerify={(token,ekey) => handleVerificationSuccess(token, ekey)}
    /> */}
            <div className="  mt-4 mb-6  bottom-6 text-slate-800  flex justify-center">
            <button type="button" className="py-2 px-4  bg-stone-800 hover:bg-stone-700  text-white w-full transition ease-in duration-200 text-center text-base shadow-md  focus:outline-none  rounded-full ">
    Book Now!
</button>
            </div>
          </form>
        </div>
      </div>
  );
}
