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
import { FaSuitcase } from "@react-icons/all-files/fa/FaSuitcase";
import { FaTaxi } from "@react-icons/all-files/fa/FaTaxi";
import Link from "next/link";
import Image from "next/image";
import { Loader } from "@googlemaps/js-api-loader";
import { Tooltip } from "flowbite-react";
import { Dropdown } from "flowbite-react";
import {FaEnvelope} from "@react-icons/all-files/fa/FaEnvelope"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


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
  const completed = "mx-auto py-2 text-sky-500 ";
  const uncompleted = "mx-auto py-2 text-gray-500 ";
  const [serviceSelected, setServiceSelected] = useState(null);
  const selectedServiceClass = "ring-2 ring-sky-400 bg-sky-400";
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [canSubmit, setCanSubmit] = useState(false);
  let service;
  const validationSchema = Yup.object().shape({
    
    name: Yup.string()
        .required('Name is required'),
    dob: Yup.string()
        .required('Phone number is required')
        .matches(/^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/, 'Phone number is invalid'),
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    acceptTerms: Yup.bool()
        .oneOf([true], 'Accept Ts & Cs is required')
});
const formOptions = { resolver: yupResolver(validationSchema) };

// get functions to build form with useForm() hook
const { register, handleSubmit, reset, formState } = useForm(formOptions);
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
    // console.log(service)
  }, []);

  useEffect(() => {
    // allow other functions to execute, otherwise component mounts before the variables update
    setTimeout(() => {
      setTripDistance(data.distance);
      setTotalTripPrice(data.total_trip_price);
    }, 1500);
  }, [data]);
  useEffect(() => {
    try {
      // check whether booking data is present
      let parsedData = JSON.parse(
        window.sessionStorage.getItem("BOOKING_DATA")
      );
      console.log("parsedData:", parsedData);
      if (parsedData !== null) {
        //set booking details to saved data from sessionStorage
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
        window.sessionStorage.setItem("BOOKING_DATA", JSON.stringify(data));
      }
    } catch (error) {
      console.log(error);
    }
    console.log("data:", data);
  }, []);

  useEffect(() => {
    Object.assign(data, {
      distance: distanceResults.distance,
      duration: distanceResults.duration,
    });
    window.sessionStorage.setItem("BOOKING_DATA", JSON.stringify(data));
    calculatePrice();
    console.log("distanceResults:", distanceResults, "data:", data);
  }, [distanceResults]);
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
    tripPrice = farePrice * distanceInMiles;
    data.price_per_mile = farePrice.toString();
    data.total_trip_price = tripPrice;
    window.sessionStorage.setItem("BOOKING_DATA", JSON.stringify(data));
  }
  function handleLogin() {
    console.log("login");
  }
  const handleSelectPayment = (e) => {
    if (e.target.innerText !== undefined) {
      console.log(e.target.innerText);
      setPaymentMethod(e.target.innerText);
      data.payment = e.target.innerText;
      window.sessionStorage.setItem("BOOKING_DATA", JSON.stringify(data));
    }
  };
  const handleSelectService = (e) => {
    if (e.target.id !== "") {
      setServiceSelected(e.target.id);
      data.service = e.target.id;
      console.log(data.service);
      window.sessionStorage.setItem("BOOKING_DATA", JSON.stringify(data));
    }
    //
  };
  function handleBooking() {
    console.log("booked");
  }
  function onSubmit(data) {
    // display form data on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
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
          <div className="absolute top-56 bg-gray-100 w-[95vw] lg:w-[97vw] mx-auto h-32 flex items-center justify-center z-[8] text-4xl font-medium text-center text-gray-800">
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

            <div className="lg:hidden z-[22] h-20 fixed bottom-0 left-0  flex justify-center w-screen   bg-gray-100 ">
              <div
                onClick={() => setShowSummary(!showSummary)}
                className={summaryClassNames}>
                <FaAngleUp />
              </div>
              <div className="grid absolute left-0 bottom-20 grid-cols-5 px-4 w-screen text-4xl bg-gray-100">
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
                  {data.date && data.time ? (
                    <FaCheck className="float-right text-sm" />
                  ) : (
                    ""
                  )}
                  <FaTaxi className="px-1" />
                </div>
                <div className={data.account ? completed : uncompleted}>
                  {data.account ? (
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

              <button
                data-bs-t
                onClick={handleBooking}
                disabled={!canSubmit}
                className="flex justify-center items-center mx-12 my-2 w-full h-16 text-2xl font-medium text-center text-gray-50 bg-sky-500 rounded-lg disabled:bg-gray-400">
                Book Now
              </button>
            </div>
          </div>
          <div className="mx-4 lg:w-full max-w-screen">
            <form onClick={handleSelectService} className="">
              <div className="w-full text-lg font-medium tracking-wider text-gray-600 bg-gray-100">
                CHOOSE YOUR SERVICE
              </div>

              <label
                htmlFor="serviceStandard"
                group
                className={`${
                  serviceSelected === "serviceStandard" && selectedServiceClass
                }group min-w-fit flex gap-4 items-center appearance-none bg-gray-50 w-full p-4 my-4 rounded-lg active:ring-2 focus:ring-2 focus:ring-sky-500 active:ring-sky-500 h-44`}>
                <div className="w-20 min-w-max h-20 sm:w-32 sm:h-32">
                  <div className="flex items-center w-20 h-20 sm:w-32 sm:h-32">
                    <Image src="/standard.webp" width="220px" height="90px" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full max-w-xl max-h-full text-left">
                  <p className="text-lg">Standard</p>
                  <ul className="hidden overflow-auto flex-col max-h-32 text-sm text-gray-500 xs:flex">
                    Includes:
                    <li className="flex overflow-clip">
                      <FaCheck className="pr-2 min-w-max text-green-400 text-md" />{" "}
                      Free cancelation up to 24 hours before pickup
                    </li>
                    <li className="flex overflow-clip">
                      <FaCheck className="pr-2 min-w-max text-green-400 text-md" />{" "}
                      Taxes & Fees included
                    </li>
                    <li className="flex overflow-clip">
                      <FaCheck className="pr-2 min-w-max text-green-400 text-md" />{" "}
                      60 min. Free Waiting Time
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div>
                    <Tooltip style="light" content="Passengers">
                      <FaUsers className="text-sky-400" />
                    </Tooltip>
                    3
                  </div>
                  <div>
                    <Tooltip style="light" content="Luggage">
                      <FaSuitcase className="text-sky-400" />
                    </Tooltip>
                    2
                  </div>
                  <input
                    className="hidden"
                    id="serviceStandard"
                    type="radio"></input>
                </div>
              </label>
              <label
                htmlFor="serviceBus"
                group
                className={` ${
                  serviceSelected === "serviceBus" && selectedServiceClass
                }group min-w-fit flex gap-4 items-center appearance-none bg-gray-50 w-full p-4 my-4 rounded-lg active:ring-2 focus:ring-2 focus:ring-sky-500 active:ring-sky-500 h-44`}>
                <div className="w-20 min-w-max h-20 sm:w-32 sm:h-32">
                  <div className="flex items-center w-20 h-20 sm:w-32 sm:h-32">
                    <Image src="/standard.webp" width="220px" height="90px" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full max-w-xl max-h-full text-left">
                  <p className="text-lg">Standard</p>
                  <ul className="hidden overflow-auto flex-col max-h-32 text-sm text-gray-500 xs:flex">
                    Includes:
                    <li className="flex overflow-clip">
                      <FaCheck className="pr-2 min-w-max text-green-400 text-md" />{" "}
                      Free cancelation up to 24 hours before pickup
                    </li>
                    <li className="flex overflow-clip">
                      <FaCheck className="pr-2 min-w-max text-green-400 text-md" />{" "}
                      Taxes & Fees included
                    </li>
                    <li className="flex overflow-clip">
                      <FaCheck className="pr-2 min-w-max text-green-400 text-md" />{" "}
                      60 min. Free Waiting Time
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p>
                    <FaUsers className="text-sky-400" />3
                  </p>
                  <p>
                    <FaSuitcase className="text-sky-400" />2
                  </p>
                  <input
                    className="hidden"
                    id="serviceBus"
                    type="radio"></input>
                </div>
              </label>
            </form>
            <section onClick={handleSubmit(onSubmit)} className="">
              <div className="flex items-stretch w-full text-lg font-medium tracking-wider text-gray-600 bg-gray-100">
              <p className="grow" > PASSENGER DETAILS</p><p className="self-end mr-2 text-sm"> or </p>
                <Link href="/signin">
                  <a className="self-end text-sm text-sky-600 hover:text-sky-400">Sign In</a>
                </Link>
                {/* <div>or </div> */}
              </div>

              <div
                className="p-6 bg-gray-50 border-gray-400 shadow-sm lg:w-full border-y-2 group"
                >
                <div className="flex justify-between items-center cursor-pointer">
                  <div className="w-full">
                    <form onSubmit={handleLogin} autoComplete="off">
                      <div className="flex relative mb-2 w-full shadow-sm">
                        <span className="inline-flex items-center px-3 text-lg text-gray-600 bg-gray-50 rounded-l-md border-r-2 shadow-sm">
                          <BsFillPersonFill />
                        </span>
                        <input onClick={(e)=>console.log(e)}
                        onKeyDownCapture={(e)=>{console.log(e)}}
                        {...register('name')}
                          name="name"
                          type="text"
                          id="name"
                          className="flex-1 px-4 py-2 w-full text-base placeholder-gray-400 text-gray-600 bg-gray-50 rounded-r-lg border-0 shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-500"
                          placeholder="Your full name"
                        />
                        <div className="invalid-feedback">{errors.title?.message}</div>
                      </div>

                      <div className="flex relative mb-2 w-full shadow-sm">
                        <span className="inline-flex items-center px-3 text-sm text-gray-600 bg-gray-50 rounded-l-md border-r-2 shadow-sm">
                          <svg
                            width="15"
                            height="15"
                            fill="currentColor"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                          </svg>
                        </span>
                        <input
                          name="email"
                          type="email"
                          id="email"
                          className="flex-1 px-4 py-2 w-full text-base placeholder-gray-400 text-gray-600 bg-gray-50 rounded-r-lg border-0 shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-500"
                          placeholder="Your email"
                        />
                      </div>
                      <div className="flex relative mb-2 w-full shadow-sm">
                        <span className="inline-flex items-center px-3 text-sm text-gray-600 bg-gray-50 rounded-l-md border-r-2 shadow-sm">
                          <svg
                            width="15"
                            height="15"
                            fill="currentColor"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                          </svg>
                        </span>
                        <input
                          name="email"
                          type="email"
                          id="email"
                          className="flex-1 px-4 py-2 w-full text-base placeholder-gray-400 text-gray-600 bg-gray-50 rounded-r-lg border-0 shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-500"
                          placeholder="Your email"
                        />
                      </div>
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
                <Dropdown  label="Payment Method" size="xl" >
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
            <div className=" z-[7] -top-10  absolute lg:relative right-0 float-right h-screen lg:h-full min-w-max overflow-auto">
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
