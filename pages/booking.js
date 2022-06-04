import { initiateCheckout, price } from "../utils/payments";
import { loadStripe } from "@stripe/stripe-js";
import { fetchGetJSON } from "../utils/api-helpers";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useContext, useEffect, useCallback, useState } from "react";
import { useAppContext, useAuthContext } from "../src/context/state";

import Layout from "../src/components/layout";
import Announcement from "../src/components/Announcement";
import Receipt from "../src/components/Svg/Receipt";
import Summary from "../src/components/Booking/Summary";
import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import { FaMapPin } from "@react-icons/all-files/fa/FaMapPin";
import { BsCalendarFill } from "@react-icons/all-files/bs/BsCalendarFill";
import { FaCreditCard } from "@react-icons/all-files/fa/FaCreditCard";
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill";
import { FaAngleUp } from "@react-icons/all-files/fa/FaAngleUp";
import { FaMoneyBill } from "@react-icons/all-files/fa/FaMoneyBill";
import { FaUsers } from "@react-icons/all-files/fa/FaUsers";
import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt";
import { FaSuitcase } from "@react-icons/all-files/fa/FaSuitcase";
import { FaTaxi } from "@react-icons/all-files/fa/FaTaxi";
import Link from "next/link";
import Image from "next/image";
import { Loader } from "@googlemaps/js-api-loader";
import { Tooltip } from "flowbite-react";
import { Dropdown } from "flowbite-react";
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import 'react-phone-number-input/style.css'
import ProgressIcons from "../src/components/Booking/ProgressIcons";
import PhoneInput from 'react-phone-number-input'
import Service from "../src/components/Booking/Service";
export default function Booking() {
  const [distanceResults, setDistanceResults] = useState("");
  const { data, setData } = useAppContext();
  const session = useAuthContext();
  let distanceInMiles;
  const [farePrice, setFarePrice] = useState(4);
  let tripStartsAt = parseInt(data.time);
  let tripPrice = 0;
  const [tripDistance, setTripDistance] = useState("loading...");
  const [totalTripPrice, setTotalTripPrice] = useState("loading...");
  const [showBanner, setShowBanner] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const summaryClassNames = showSummary
    ? "fixed flex  top-20 rotate-180 w-screen text-gray-50 text-3xl justify-center bg-sky-500 h-8"
    : "fixed flex  bottom-32 w-screen text-gray-50 text-3xl justify-center bg-sky-500 h-8";
    const [serviceSelected, setServiceSelected] = useState(null);
  
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [phone,setPhone] = useState()
  let service;
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .matches(/[A-z ]{4}/, "Name is too short")
      .matches(
        /^[A-z]+(([',. [a-z ][A-Z ])?[-]?[a-zA-Z]*)*$/,
        "Name must not contain invalid characters"
      ),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(
        /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/,
        "Phone number is invalid"
      ),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Ts & Cs is required"),
  });
  const formOptions = {
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, clearErrors, } =
    useForm(formOptions);
  const { errors } = formState;
  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    version: "weekly",
    libraries: ["places"],
  });
  loader
    .load()
    .then((google) => {
      service = new google.maps.DistanceMatrixService();
    })
    .catch((e) => {
      console.log(e);
    });

  useEffect(() => {
    console.log(session);
    console.log(window.innerWidth);
    loader
    .load()
    .then((google) => {
      service = new google.maps.DistanceMatrixService();
    })
    .catch((e) => {
      console.log(e);
    });
    // console.log(service)
  }, []);

  useEffect(() => {
    // allow other functions to execute, otherwise component mounts before the variables update
    setTimeout(() => {
      setTripDistance(data.distance);
      setTotalTripPrice(data.total_trip_price);
    }, 2000);
  }, [data]);
  useEffect(() => {
    console
    .log(data.total_trip_price)
    savelocalStorage()
  }, []);

  useEffect(() => {
    Object.assign(data, {
      distance: distanceResults.distance,
      duration: distanceResults.duration,
    });
    window.localStorage.setItem("BOOKING_DATA", JSON.stringify(data));
    calculatePrice();
    console.log("distanceResults:", distanceResults, "data:", data);
  }, [distanceResults]);
  function savelocalStorage(){
    try {
      // check whether booking data is present
      let parsedData = JSON.parse(
        window.localStorage.getItem("BOOKING_DATA")
      );
      // console.log("parsedData:", parsedData);
      if (parsedData !== null) {
        //set booking details to saved data from localStorage
        setDataToParsedData(parsedData);
        console.log(data);
        console.log(
          "data is set to parsedData",
          parsedData.location,
          parsedData.destination
        );
        handleGetDistance(parsedData.location, parsedData.destination);
        data.distance = distanceResults.distance;
      } else {
        //if no booking data is saved, get distance and save data
        handleGetDistance(data.location, data.destination);
        window.localStorage.setItem("BOOKING_DATA", JSON.stringify(data));
      }
    } catch (error) {
      // console.log(error);
      console.log("Something went wrong fetching distance results... reattempting\n\n")
      setTimeout(()=>{
        try{
          handleGetDistance(parsedData.location, parsedData.destination);
          data.distance = distanceResults.distance;
        }catch(err){
          // console.log(err)
          try{
            handleGetDistance(data.location, data.destination);
            data.distance = distanceResults.distance;
          }catch(err){
            console.log(err)
          }
        }
      },2000

      )
    
    }
    // console.log("data:", data);
  }
  function handleGetDistance(location, destination) {
    service.getDistanceMatrix(
      {
        origins: [location],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidTolls: true,
      },
      callback
    );

    function callback(response, status) {
      console.log("status",status)
      if (status === "OK") {
        let distance = response.rows[0].elements[0].distance.text;
        let duration = response.rows[0].elements[0].duration.text;
        setDistanceResults({ distance: distance, duration: duration });
      } else {
        console.log(response, status);
      }
    }
  }
  function setDataToParsedData(obj) {
    data.location = obj.location;
    data.destination = obj.destination;
    data.passengers = obj.passengers;
    data.date = obj.date;
    data.time = obj.time;
    data.distance = obj.distance;
    data.duration = obj.duration;
    data.total_trip_price = obj.total_trip_price;
    data.service = obj.service;
    data.payment = obj.payment;
    data.session = obj.session;
  }
  function calculatePrice() {
    try {
      //Extract the float
      console.log(data.distance);
      let distanceInMilesString = data.distance.match(
        /[+-]?([0-9]*[.])?[0-9]+/
      )[0];
      distanceInMiles = parseFloat(distanceInMilesString);

      console.log(typeof distanceInMiles);
    } catch (error) {
      // console.log(error)
    }
    if (tripStartsAt >= 0 && tripStartsAt <= 7) {
      setFarePrice(6);
    }
    console.log(farePrice, distanceInMiles);
    tripPrice = Math.round((farePrice * distanceInMiles)*100)/100
          data.price_per_mile = farePrice.toString();
    data.total_trip_price = tripPrice;
    window.localStorage.setItem("BOOKING_DATA", JSON.stringify(data));
  }
  function handleErrors() {
    clearErrors();
  }
  const handleSelectPayment = (e) => {
    if (e.target.innerText !== undefined) {
      console.log(e.target.innerText);
      setPaymentMethod(e.target.innerText);
      data.payment = e.target.innerText;
      window.localStorage.setItem("BOOKING_DATA", JSON.stringify(data));
    }
  };
  const handleSelectService = (e) => {
    if (e.target.id !== "") {
      setServiceSelected(e.target.id);
      data.service = e.target.id;
      console.log(data.service);
      window.localStorage.setItem("BOOKING_DATA", JSON.stringify(data));
    }
    //
  };
  function handleBooking() {
    console.log("booked");
  }
  function onSubmit(data) {
    handleSubmit(data)
    let dsamlkdmaslkdm=data
    console.log(dsamlkdmaslkdm)
    // display form data on success
    console.log("submitted")
    console.log(data)
    // alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
    return false;
  }

    
    return (
    <>
      <Layout>
        {!session && showBanner && (
          <Announcement
            onClick={() => setShowBanner(false)}
            className="fixed"
          />
        )}

        <div className="static justify-center  mt-64 w-[95vw] sm:w-[97vw] mx-auto lg:  max-w-screen bg-gray-100 overflow-x-none flex flex-col lg:flex-row  ">
          <div className="absolute top-56 bg-gray-100 w-[95vw] lg:w-[97vw] mx-auto h-32 flex items-center justify-center z-[7] text-4xl font-medium text-center text-gray-800">
            Youre almost there!
          </div>
          <div>
            {showSummary && (
              <div className="flex lg:hidden">
                <div className=" z-[21] top-20  fixed lg:relative left-0 h-[80vh] lg:h-max overflow-auto">
                  <Summary
                    location={data.location}
                    destination={data.destination}
                    passengers={data.passengers}
                    date={data.date}
                    time={data.time}
                    price={data.total_trip_price}
                    distance={data.distance}
                    duration={data.duration}
                    onClick={handleBooking}
                    disabled={!canSubmit}
                  />
                </div>
              </div>
            )}

            <div className="lg:hidden  z-[22] h-20 fixed bottom-0 left-0  flex justify-center max-w-screen w-screen   bg-gray-100 ">
              <div
                onClick={() => setShowSummary(!showSummary)}
                className={summaryClassNames}>
                <FaAngleUp />
              </div>
              <ProgressIcons />

              <button
                onClick={handleBooking}
                disabled={!canSubmit}
                className="flex justify-center items-center mx-12 my-2 w-full h-16 text-2xl font-medium text-center text-gray-50 bg-sky-500 rounded-lg disabled:bg-gray-400">
                Book Now
              </button>
            </div>
          </div>
          <div className="px-8 max-w-full lg:w-full">
            <form onClick={handleSelectService} className="">
              <div className="w-full text-lg font-medium tracking-wider text-gray-600 bg-gray-100">
                CHOOSE YOUR SERVICE
              </div>
              <Service 
                for="Standard"
                image="standard"
                passengers="3"
                luggage="3"
                selected={serviceSelected==="Standard"?true:false}
              />
              <Service 
                for="Select"
                image="select"
                passengers="5"
                luggage="4"
                selected={serviceSelected==="Select"?true:false}
              />
              <Service 
                for="Bus"
                image="bus"
                passengers="16"
                luggage="16"
                selected={serviceSelected==="Bus"?true:false}
              />
            </form>
            <section  className="">
              <div className="flex items-stretch w-full text-lg font-medium tracking-wider text-gray-600 bg-gray-100">
                <p className="grow"> PASSENGER DETAILS</p>
                <p className="self-end mr-2 text-sm"> or </p>
                <Link href="/signin">
                  <a className="self-end text-sm text-sky-600 hover:text-sky-400">
                    Sign In
                  </a>
                </Link>
                {/* <div>or </div> */}
              </div>

              <div className="p-6 bg-gray-50 border-gray-400 shadow-sm lg:w-full border-y-2 group">
              <div className="flex justify-between items-center cursor-pointer">
                  <div className="w-full">
                    <form id="register"  onBlur={onSubmit} className="flex flex-col gap-2" >
                      <div className="flex relative mb-2 w-full shadow-sm">
                        <span className="inline-flex items-center px-3 text-lg text-gray-600 bg-gray-50 rounded-l-md border-r-2 shadow-sm h">
                          <BsFillPersonFill />
                        </span>
                        <label htmlFor="name" className="sr-only">
                          Full Name
                        </label>
                        <input
                          {...register("name")}
                          onChange={handleErrors}
                          // onFocus={handleErrors}
                          name="name"
                          type="text"
                          id="name"
                          className={`flex-1 px-4 py-2 w-full text-base placeholder-gray-400 text-gray-600 bg-gray-50 rounded-r-lg border-0 shadow-sm appearance-none focus:outline-none focus:ring-2 ${
                            errors.name
                              ? "focus:ring-pink-400 "
                              : "focus:ring-sky-500"
                          }`}
                          placeholder="Your full name"
                        />
                        {errors.name && (
                          <div className="absolute w-full h-full text-sm font-medium text-pink-500 rounded-md ring-2 ring-pink-400">
                            <p className="relative left-1 -top-3 px-2 w-max bg-gray-50">
                              {errors.name?.message}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex relative mb-2 w-full shadow-sm">
                        <span className="inline-flex items-center px-3 text-lg text-gray-600 bg-gray-50 rounded-l-md border-r-2 shadow-sm h">
                          <FaEnvelope />
                        </span>
                        <label htmlFor="email" className="sr-only">
                          Email Address
                        </label>
                        <input
                          {...register("email")}
                          onChange={handleErrors}
                          // onFocus={handleErrors}
                          name="email"
                          type="email"
                          id="email"
                          className={`flex-1 px-4 py-2 w-full text-base placeholder-gray-400 text-gray-600 bg-gray-50 rounded-r-lg border-0 shadow-sm appearance-none focus:outline-none focus:ring-2 ${
                            errors.email
                              ? "focus:ring-pink-400 "
                              : "focus:ring-sky-500"
                          }`}
                          placeholder="Your email address"
                        />
                        {errors.email && (
                          <div className="absolute w-full h-full text-sm font-medium text-pink-500 rounded-md ring-2 ring-pink-400">
                            <p className="relative left-1 -top-3 px-2 w-max bg-gray-50">
                              {errors.email?.message}
                            </p>
                          </div>
                        )}
                      </div>
                      {/* <div className="flex relative mb-2 w-full shadow-sm"> */}
                        {/* <span+44 className="inline-flex items-center px-3 text-lg text-gray-600 bg-gray-50 rounded-l-md border-r-2 shadow-sm h">
                          <FaPhoneAlt />
                        </span+44 7583932231421242144 75839322314212421
                        <label htmlFor="phone" className="sr-only">
                          Phone Number
                        </label> */}
                        {/* <PhoneNumberInput
                          {...register("phone")}
                          onChange={handleErrors}
                          // onFocus={handleErrors}
                          // name="phone"
                          // required={true}
                          // type="tel"
                          // id="phone"
                          // defaultValue="+44"
                          // placeholder="+44"
                          className={`flex-1 px-4 py-2 w-full text-base placeholder-gray-400 text-gray-600 bg-gray-50 rounded-r-lg border-0 shadow-sm appearance-none focus:outline-none focus:ring-2 ${
                            errors.phone
                              ? "focus:ring-pink-400 "
                              : "focus:ring-sky-500"
                          }`}
                        /> */}
                        <div className="flex relative mb-2 w-full shadow-sm">
                        <PhoneInput 
                        className="inline-flex items-center pl-2 w-full text-lg text-gray-900 bg-gray-50 rounded-md border-r-2 shadow-sm" 
                        defaultCountry="GB" 
      placeholder="Enter phone number"
      value={phone}
      onChange={setPhone}/>
  </div>
                        {/* {errors.phone && (
                          <div className="absolute w-full h-full text-sm font-medium text-pink-500 rounded-md ring-2 ring-pink-400">
                            <p className="relative left-1 -top-3 px-2 w-max bg-gray-50">
                              {errors.phone?.message}
                            </p>
                          </div>
                        )} */}
                      {/* </div> */}
                      <button type="submit">Submit</button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
            <section className="">
              <div className="w-full text-lg font-medium tracking-wider text-gray-600 bg-gray-100">
                PAYMENT
              </div>
              <div className="flex justify-center p-6 bg-gray-50 border-gray-400 shadow-sm lg:w-full">
                <Dropdown  style={{backgroundColor:"rgb(2 132 199)"}} className="!bg-gray-50 " label="Payment Method" size="xl">
            <Dropdown.Item
                    onClick={handleSelectPayment}
                    
                    className="!z-[2]">
                    <FaMoneyBill className="inline-flex gap-4 text-lg" />
                    <p className="inline-flex ml-2 font-semibold">Cash</p>
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={handleSelectPayment}
                    className="rounded-b-md appearance-none">
                    <FaCreditCard className="inline-flex gap-4 text-lg" />
                    <p className="inline-flex ml-2 font-semibold">Card</p>
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </section>
          </div>
          <div className="hidden lg:flex">
            <div className=" z-[7] -top-20  absolute lg:relative right-0 float-right h-screen lg:h-full min-w-max overflow-auto">
              <Summary
                location={data.location}
                destination={data.destination}
                passengers={data.passengers}
                date={data.date}
                time={data.time}
                price={data.total_trip_price}
                distance={data.distance}
                duration={data.duration}
                onClick={handleBooking}
                disabled={canSubmit}
              />
            </div>
          </div>
        </div>
        <div className="h-96"></div>
        <button
          onClick={() => {
            setTripDistance(data.distance);
            setTotalTripPrice(data.total_trip_price);
          }}>
          Update
        </button>
      </Layout>
      <div className="h-44"></div>
    </>
  );
}
