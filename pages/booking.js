import { useContext, useEffect, useCallback, useState,useRef } from "react";
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

import { FaAngleDown } from "@react-icons/all-files/fa/FaAngleDown";
import { FaMoneyBill } from "@react-icons/all-files/fa/FaMoneyBill";
import { FaUsers } from "@react-icons/all-files/fa/FaUsers";
import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt";
import { FaSuitcase } from "@react-icons/all-files/fa/FaSuitcase";
import { FaTaxi } from "@react-icons/all-files/fa/FaTaxi";
import Link from "next/link";
import Image from "next/image";
import { Loader } from "@googlemaps/js-api-loader";
import PaymentSelect from "../src/components/Booking/PaymentSelect";
import {throttle, debounce} from "throttle-debounce"
import ProgressIcons from "../src/components/Booking/ProgressIcons";

import Service from "../src/components/Booking/Service";
import getStripe from "../utils/getStripe";
import { fetchPostJSON } from "../utils/api-helpers";
import {
  getBookings,
  handleSignup,
  handleSubmitBooking,
} from "../utils/supabase-helpers";
import { useRouter } from "next/router";
import { handleGetDistance as distanceMatrix } from "../utils/google-helpers";
import Popup from "../src/components/Booking/Popup";
import { supabase } from "../utils/supabaseClient";
import { Checkbox } from "flowbite-react";
import AutocompleteInput from "../src/components/Booking/AutocompleteInput";
import StepperInput from "../src/components/Booking/StepperInput";
import FlightMonitoring from "../src/components/Booking/FlightMonitoring";
import ContactDetails from "../src/components/Booking/ContactDetails";
// import {google} from "googleapis"
export default function Booking() {
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    version: "weekly",
    libraries: ["places"],
  });
  // const calendar= google.calendar({version: 'v3', auth:process.env.NEXT_PUBLIC_GOOGLE_API_KEY})
  // console.log( calendar.events);
  useEffect(() => {
    loader.load().then(() => {
      setMapsLoaded(true);
    });
  }, []);

  const router = useRouter();
  const [distanceResults, setDistanceResults] = useState("");
  const { data, setData } = useAppContext();
  const session = useAuthContext();
  let distanceInMiles;
  const [farePrice, setFarePrice] = useState(4);
  let tripStartsAt = parseInt(data.date);
  let tripPrice = 0;
  const [tripDistance, setTripDistance] = useState("loading...");
  const [totalTripPrice, setTotalTripPrice] = useState("loading...");
  const [showBanner, setShowBanner] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const summaryClassNames = showSummary
    ? "fixed flex  top-20  drop-shadow-xl w-screen text-gray-50 text-3xl justify-center bg-sky-500 h-8"
    : "fixed flex drop-shadow-md items-center rotate-180 bottom-32 w-screen text-gray-50 text-3xl justify-center bg-sky-500 h-8";
  const [serviceSelected, setServiceSelected] = useState(null);
  const [returnServiceSelected, setReturnServiceSelected] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [canSubmit, setCanSubmit] = useState(false);

  const [dataError, setDataError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [shouldUsePreviousData, setShouldUsePreviousData] = useState(false);
  const [differentPickup, setDifferentPickup] = useState(false);
  const [differentDropoff, setDifferentDropoff] = useState(false);
  const [returnLocation, setReturnLocation] = useState("");
  const [returnDestination, setReturnDestiation] = useState("");
  const [returnPassengers, setReturnPassengers] = useState("");
  const [luggage, setLuggage] = useState(0);
  const [returnLuggage, setReturnLuggage] = useState(0);
  const [instructions, setInstructions] = useState("");
  const [returnInstructions, setReturnInstructions] = useState("");
  const [showReturnServices, setShowReturnServices] = useState(false);
  const renders = useRef(0);
  let dataErrorDiv = (
    <div className="fixed overscroll-none w-screen mx-auto mt-1/2 flex pt-64 font-semibold tracking-wide p-8 h-screen z-[99] bg-black/95 text-pink-500 text-4xl">
      No booking data was found, redirecting...
    </div>
  );
  let parsedData
  let BOOKING_DATA = { location: data.location,
    destination: data.destination,
    passengers: data.passengers,
    date: data.date,
    distance: data.distance,
    duration: data.duration,
    service: data.service,
    payment: data.payment,
    luggage: data.luggage,
    return_luggage: data.return_luggage,
    return: data.return,
    return_date: data.return_date,
    return_time: data.return_time,
    flight_monitoring: data.flight_monitoring,
    return_location: data.return_location,
    return_destination: data.return_destination,}||parsedData;


  useEffect(() => {
     parsedData = JSON.parse(window.localStorage.getItem("BOOKING_DATA"))
    data.return_location = returnLocation||data.return_location
    data.return_destination = returnDestination||data.return_destination
    data.luggage = luggage||data.luggage;
    data.return_luggage = returnLuggage||data.return_luggage;
    data.instructions = instructions||data.instructions;
    data.return_instructions = returnInstructions||data.return_instructions;
    data.return_passengers = returnPassengers||data.return_passengers;
    console.log(data.return_location);
    setData(data);
  }, [
    returnLocation,
    returnDestination,
    luggage,
    returnLuggage,
    instructions,
    returnInstructions,
    returnPassengers,
  ]);
  useEffect(() => {
    data.showSummary=false
    console.log("dataaaa", data);

    // allow other functions to execute, otherwise component mounts before the variables update
    console.log("1 one", data.distance);
  if (data.distance!==undefined){
    debounce(5000,console.log("DEBOUNCING"))
   debounce(1000,setBookingDataVarToContextData()) 
   debounce(1000,setTripDistance(data.distance))
   debounce(1000,setTotalTripPrice(data.total_trip_price))
  }
  if (data.distance===undefined) {
    debounce(1000,savelocalStorage())
    
  }

    console.log("BOOKING_DATA: ", BOOKING_DATA);

    debounce(1000,calculatePrice())

    debounce(1000,verifyDataIsValidBeforeEnablingSubmitButton())
  }, [data]);

  useEffect(() => {
    
    savelocalStorage();
    window.sessionStorage.setItem(
      "shouldUsePreviousData",
      shouldUsePreviousData
    );
    console.log("useEffect");
  }, [shouldUsePreviousData]);

  useEffect(() => {
    console.log("useEffect");
    setLocalStorageToBookingDataVar();
  }, [data]);

  function savelocalStorage() {
    
      setShowPopup(true);
      if (window.sessionStorage.getItem("shouldUsePreviousData")) {
        setShowPopup(false);
        setContextDataToLocalStorageData();
       
      }
      if (shouldUsePreviousData) {
        setShowPopup(false);
        setContextDataToLocalStorageData();
        
      } else {
        
        setLocalStorageToBookingDataVar();
      }
    
  }
  function validateParsedData(obj) {
    console.log(
      "validating",
      obj.location === undefined ||
        obj.destination === undefined ||
        obj.date === undefined ||
        obj.passengers === undefined
    );
    if (
      obj.location === undefined ||
      obj.destination === undefined ||
      obj.date === undefined ||
      obj.passengers === undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  function setContextDataToLocalStorageData() {
    // check whether booking data is present
    let parsedData = JSON.parse(window.localStorage.getItem("BOOKING_DATA"));
    // console.log("parsedData:", parsedData);
    try {
      const parsedDataIsValid = validateParsedData(parsedData);
      if (parsedDataIsValid) {
        console.log("parsed data is valid. setting data...");
        data.location = parsedData.location;
        data.destination = parsedData.destination;
        data.passengers = parsedData.passengers;
        data.date = parsedData.date;
        data.time = parsedData.time;
        data.distance = parsedData.distance;
        data.duration = parsedData.duration;
        data.service = parsedData.service;
        data.payment = parsedData.payment;
        data.session = parsedData.session;
        data.luggage = parsedData.luggage;
        data.return = parsedData.return;
        data.return_date = parsedData.return_date;
        data.return_time = parsedData.return_time;
        data.return_luggage = parsedData.return_luggage;
        data.flight_monitoring = parsedData.flight_monitoring;
        data.return_location = parsedData.return_location;
        data.return_destination = parsedData.return_destination;
  
        data.return_passengers = parsedData.return_passengers;
        console.log("setting data parsing data");
        setData(data)
      }
    } catch (error) {
      console.log("parsed data is not valid. aborting...", parsedData);
    }
    
    
  }

  function verifyDataIsValidBeforeEnablingSubmitButton() {
    setCanSubmit(false);
    if (
      data.location !== undefined &&
      data.destination !== undefined &&
      data.passengers !== undefined &&
      data.date !== undefined &&
      data.service !== undefined &&
      data.payment !== undefined &&
      data.first_name !== undefined &&
      data.first_name !== "" &&
      data.last_name !== undefined &&
      data.last_name !== "" &&
      data.email !== undefined &&
      data.email !== "" &&
      data.phone !== undefined &&
      data.phone !== ""&&data.canSubmit===true
    ) {
      
      console.log("setting data inside cansubmit",data.canSubmit);
      // setData(data)
      setCanSubmit(data.canSubmit);
    }
  }
  function setLocalStorageToBookingDataVar() {
    console.log(BOOKING_DATA.distance!==undefined, "snjansj");
    if (BOOKING_DATA.distance != undefined) {
      console.log("setting booking data");
      window.localStorage.setItem("BOOKING_DATA", JSON.stringify(BOOKING_DATA));
    }
  }
  function setBookingDataVarToContextData() {
    Object.assign(BOOKING_DATA, {
      location: data.location,
      destination: data.destination,
      passengers: data.passengers,
      date: data.date,
      time: data.time,
      return: data.return,
      return_date: data.return_date,
      return_time: data.return_time,
      luggage: data.luggage,
      return_luggage: data.return_luggage,
      flight_monitoring: data.flight_monitoring,
      distance: data.distance,
      duration: data.duration,
      service: data.service,

      return_location: data.return_location,
      return_destination: data.return_destination,
      return_passengers: data.return_passengers,
    });
  }
  

  async function handleRedirectToCheckout() {
    // Create a Checkout Session.
    const response = await fetchPostJSON("/api/checkout_sessions", {
      amount: data.total_trip_price,
    });

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }

    // Redirect to Checkout.
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      // Make the id input from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.id,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
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
    tripPrice = Math.round(farePrice * distanceInMiles * 100) / 100;
    data.price_per_mile = farePrice;
    data.total_trip_price = tripPrice;
    
  }
useEffect(()=>{
setServiceSelected(data.service)
setReturnServiceSelected(data.return_service)
},[])
  const handleSelectService = (e) => {
    if (e.target.id !== "") {
      setServiceSelected(e.target.id);
      data.service = e.target.id;
      console.log(data.service);
      
    }
    //
  };
  const handleSelectReturnService = (e) => {
    if (e.target.id !== "") {
      setReturnServiceSelected(e.target.id);
      data.return_service = e.target.id;
      console.log(data.return_service);
      
    }
    //
  };
 
  function handleBooking() {
    
    handleSubmitBooking(data).then((res) => {
      console.log(res);
    });
    // handleRedirectToCheckout();
  }

  function handleClosePopup(e) {
    if (e.target.id !== "popup") {
      setShouldUsePreviousData(true);
      setShowPopup(false);
    }
  }
  function handleRedirectToBooking() {
    window.localStorage.removeItem("BOOKING_DATA");
    router.push("/");
  }
  function handleCheckboxClick(e) {
    if (e.target.id === "different_return_service") {
      if (e.target.checked) {
        setShowReturnServices(true);
      } else {
        setShowReturnServices(false);
        data.return_service = null;
      }
    }
    if (e.target.id === "different_dropoff") {
      if (e.target.checked) {
        setDifferentDropoff(true);
      } else {
        setDifferentDropoff(false);
        data.return_destination = null;
      }
    }
  }
  function handleShowSummary(){
    data.showSummary=!data.showSummary
    setShowSummary(data.showSummary)
  }

  return (
    <>
      {dataError && dataErrorDiv}
      <Layout>
        {!session && showBanner && (
          <Announcement
            onClick={() => setShowBanner(false)}
            className="fixed"
          />
        )}
        {showPopup && (
          <div
            onClick={handleClosePopup}
            className="fixed z-[9999] flex flex-col items-center align-middle  overscroll-none h-screen w-screen bg-black/90">
            <Popup onClick={handleRedirectToBooking} />
          </div>
        )}
        <div
          className={`${
            showSummary ? "h-0" : ""
          } mt-10 bg-gray-100 w-full mx-auto h-32 flex items-center justify-center lg:justify-start lg:indent-4 z-[7] text-4xl  font-medium text-center text-gray-800`}>
          <p className="z-20">Youre almost there!</p>
        </div>
        <div
          className={`${
            showSummary ? "h-0 overflow-hidden" : ""
          }static  justify-center lg:justify-start lg:pl-[5%] xl:pl-[20%] mt-0 w-[95vw] sm:w-[97vw] mx-auto lg:  max-w-screen bg-gray-100  flex flex-col lg:flex-row  `}>
          <div className=""></div>

          <div className="bg-fixed overscroll-none">
            {showSummary && (
              <div className="flex bg-fixed lg:hidden">
                <div className="overscroll-contain bg-fixed z-[21] top-20  fixed  left-0 h-screen overflow-auto">
                  {mapsLoaded && <Summary onClick={handleBooking} />}
                </div>
              </div>
            )}

            <div className="lg:hidden  z-[21] h-20 fixed bottom-0 left-0  flex justify-center max-w-screen w-screen   bg-gray-100 ">
              <div
                onClick={handleShowSummary}
                className={summaryClassNames}>
                <FaAngleDown />
              </div>
              {!showSummary && <ProgressIcons />}

              <button
                onClick={handleBooking}
                disabled={!canSubmit}
                className="flex justify-center items-center mx-12 my-2 w-full h-16 text-2xl font-medium text-center text-gray-50 bg-sky-500 rounded-lg disabled:bg-gray-400">
                Book Now
              </button>
            </div>
          </div>
          <div className="max-w-full xs:px-4 sm:px-8 lg:w-[32rem]">
            <form onClick={handleSelectService} className="">
              <div className="w-full text-lg font-medium tracking-wider text-gray-600 bg-gray-100">
                CHOOSE YOUR SERVICE
              </div>
              <Service
                name="Standard"
                for="Standard"
                image="standard"
                passengers="3"
                luggage="3"
                selected={serviceSelected === "Standard" ? true : false}
              />
              <Service
                name="Select"
                for="Select"
                image="select"
                passengers="5"
                luggage="4"
                selected={serviceSelected === "Select" ? true : false}
              />
              <Service
                name="Bus"
                for="Bus"
                image="bus"
                passengers="16"
                luggage="16"
                selected={serviceSelected === "Bus" ? true : false}
              />
            </form>
            <>
              <div className="flex py-2 items-center justify-between">
                <div className="gap-1 items-center flex">
                  <Checkbox
                    onClick={handleCheckboxClick}
                    id="different_return_service"
                  />
                  <label
                    className="self-center text-base text-gray-900"
                    htmlFor="different_return_service">
                    Different service on return?
                  </label>
                </div>
              </div>

              {showReturnServices && (
                <form onClick={handleSelectReturnService} className="">
                  <div className="w-full text-lg font-medium tracking-wider text-gray-600 bg-gray-100">
                    RETURN SERVICE
                  </div>
                  <Service
                    name="Standard"
                    for="StandardReturn"
                    image="standard"
                    passengers="3"
                    luggage="3"
                    selected={
                      returnServiceSelected === "StandardReturn" ? true : false
                    }
                  />
                  <Service
                    name="Select"
                    for="SelectReturn"
                    image="select"
                    passengers="5"
                    luggage="4"
                    selected={
                      returnServiceSelected === "SelectReturn" ? true : false
                    }
                  />
                  <Service
                    name="Bus"
                    for="BusReturn"
                    image="bus"
                    passengers="16"
                    luggage="16"
                    selected={
                      returnServiceSelected === "BusReturn" ? true : false
                    }
                  />
                </form>
              )}
            </>
            <section>
              <div className="flex items-stretch w-full text-lg font-medium tracking-wider text-gray-600 bg-gray-100">
                LUGGAGE
              </div>
              <StepperInput for="luggage" />
            </section>

            <section className="">
              <div className="flex items-stretch w-full text-lg font-medium tracking-wider text-gray-600 bg-gray-100">
                <p className="grow"> PASSENGER DETAILS</p>
                <span className="flex self-center tracking-tight text-sm">
                  <p className=" mr-2  "> or </p>
                  <Link href="/signin">
                    <a className=" text-sky-600 hover:text-sky-400">Sign In</a>
                  </Link>
                </span>

                {/* <div>or </div> */}
              </div>

              <div className="px- bg-gray-100 border-gray-400 shadow-sm lg:w-full ">
                <div className="flex justify-between items-center cursor-pointer">
                  <div className="w-full">
                    <ContactDetails />
                  </div>
                </div>
              </div>
            </section>
            {data.flight_monitoring && (
              <>
                <FlightMonitoring />
              </>
            )}
            <section className="">
              <div className="w-full text-lg font-medium tracking-wider text-gray-600 bg-gray-100">
                PAYMENT
              </div>
              <div className="flex flex-col justify-center p-6 bg-gray-50 border-gray-400 shadow-sm lg:w-full">
                <PaymentSelect />
              </div>
            </section>
            {
              <section>
                <div className="w-full text-lg font-medium tracking-wider text-gray-600 bg-gray-100">
                  RETURN
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-1 items-center">
                    <Checkbox
                      onClick={handleCheckboxClick}
                      id="different_pickup"
                    />
                    <label
                      className="self-center text-base text-gray-900"
                      htmlFor="different_pickup">
                      Different pick-up address on return?
                    </label>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Checkbox
                      onClick={handleCheckboxClick}
                      id="different_dropoff"
                    />
                    <label htmlFor="different_dropoff">
                      Different drop-off address on return?
                    </label>
                  </div>
                </div>
                {differentPickup && (
                  <input
                    type="text"
                    value={returnLocation}
                    onChange={(e) => setReturnLocation(e.target.value)}
                  />
                )}
              </section>
            }
          </div>
          {/* <div className="hidden lg:flex">
            <div className=" z-[7] -top-20  lg:relative right-0 float-right h-screen lg:h-full min-w-max overflow-auto">
              {mapsLoaded && (
                <Summary onClick={handleBooking} disabled={!canSubmit} />
              )}
            </div>
          </div> */}
        </div>
        <div className={`${showSummary ? "h-0" : "h-40"} `}></div>
      </Layout>
      <div className={`${showSummary ? "h-0" : "h-40 lg:h-0"} `}></div>
    </>
  );
}
