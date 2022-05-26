import { initiateCheckout, price } from "../utils/payments";
import { loadStripe } from "@stripe/stripe-js";
import { fetchGetJSON } from "../utils/api-helpers";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useContext, useEffect, useCallback, useState } from "react";
import { useAppContext, useAuthContext } from "../src/context/state";
import distance from "hpsweb-google-distance";
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
  useEffect(() => {
    console.log(session);
    console.log(window.innerWidth);
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
        console.log("data is set to parsedData");
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

    calculatePrice();
    console.log("distanceResults:", distanceResults, "data:", data);
  }, [distanceResults]);
  function handleGetDistance(location, destination) {
    distance.apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    distance
      .get({
        origin: `${location}`,
        destination: `${destination}`,
        units: "imperial",
      })
      .then((data) => {
        setDistanceResults(data);
        console.log(data);
      })
      .catch(function (err) {
        console.log(err);
        //TODO: implement better alert
        alert("Please provide a valid route");
      });
  }
  function setDataToParsedData(obj) {
    data.location = obj.location;
    data.destination = obj.destination;
    data.passengers = obj.passengers;
    data.date = obj.date;
    data.time = obj.time;
    data.distance = obj.distance;
    data.duration = obj.duration;
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
  }
  function handleLogin() {
    console.log("login");
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

        <div className="static justify-center  mt-64 w-[95vw] sm:w-[97vw] mx-auto lg:  max-w-screen bg-red-400 overflow-x-none flex flex-col lg:flex-row  ">
        <div className="absolute top-56 bg-gray-100 w-[95vw] lg:w-[97vw] mx-auto h-32 flex items-center justify-center z-[8] text-4xl font-medium text-center text-gray-800">Youre almost there!</div>
          <div>
            {showSummary && (
              <div className=" flex  lg:hidden">
                <div className=" z-[10] top-20  fixed lg:relative left-0 h-[80vh] lg:h-max overflow-auto">
                  <Summary
                    location={data.location}
                    destination={data.destination}
                    passengers={data.passengers}
                    date={data.date}
                    time={data.time}
                    price={data.total_trip_price}
                    distance={data.distance}
                    duration={data.duration}
                  />
                </div>
              </div>
            )}
           

            <div
              onClick={() => setShowSummary(!showSummary)}
              className="lg:hidden z-[11] h-20 fixed bottom-0 left-0  flex justify-center w-screen   bg-gray-100 ">
              <div className={summaryClassNames}>
                <FaAngleUp />
              </div>
              <div className="grid grid-cols-4 absolute px-4 bg-gray-100 w-screen left-0 bottom-20 text-4xl">
                <div
                  className={
                    data.location && data.destination ? completed : uncompleted
                  }>
                  {data.location && data.destination ? (
                    <FaCheck className="text-sm float-right" />
                  ) : (
                    ""
                  )}
                  <FaMapMarkerAlt className="px-1" />
                </div>
                <div
                  className={data.date && data.time ? completed : uncompleted}>
                  {data.date && data.time ? (
                    <FaCheck className="text-sm float-right" />
                  ) : (
                    ""
                  )}
                  <BsCalendarFill className="px-1" />
                </div>
                <div className={data.account ? completed : uncompleted}>
                  {data.account ? (
                    <FaCheck className="text-sm float-right" />
                  ) : (
                    ""
                  )}
                  <BsFillPersonFill className="px-1" />
                </div>
                <div className={data.payment ? completed : uncompleted}>
                  {data.payment ? (
                    <FaCheck className="text-sm float-right" />
                  ) : (
                    ""
                  )}
                  <FaCreditCard className="px-1" />
                </div>
              </div>

              <button
                disabled={true}
                className="flex items-center my-2 mx-4 justify-center rounded-lg w-full text-center  h-16  text-2xl font-medium text-gray-50 bg-sky-500 disabled:bg-gray-400">
                Book Now
              </button>
            </div>
          </div>
          <div className=" lg:w-full mx-4 max-w-screen ">
            <section className="">
              <div
                className="p-6   lg:w-full border-y-2 shadow-sm border-gray-400  bg-gray-50 group"
                open>
                <div className="flex items-center justify-between cursor-pointer">
                  <div className="w-full">
                    <form onSubmit={handleLogin} autoComplete="off">
                      <div className="flex relative mb-2 w-full shadow-sm">
                        <span className="rounded-l-md inline-flex  border-r-2 items-center px-3  bg-gray-50  text-gray-600 shadow-sm text-sm">
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
                          className=" rounded-r-lg flex-1 appearance-none border-0 w-full py-2 px-4 bg-gray-50 text-gray-600 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-500 "
                          placeholder="Your email"
                        />
                      </div>

                      <div className="flex relative mb-2 w-full shadow-sm">
                        <span className="rounded-l-md inline-flex  border-r-2 items-center px-3  bg-gray-50  text-gray-600 shadow-sm text-sm">
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
                          className=" rounded-r-lg flex-1 appearance-none border-0 w-full py-2 px-4 bg-gray-50 text-gray-600 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-500 "
                          placeholder="Your email"
                        />
                      </div>
                      <div className="flex relative mb-2 w-full shadow-sm">
                        <span className="rounded-l-md inline-flex  border-r-2 items-center px-3  bg-gray-50  text-gray-600 shadow-sm text-sm">
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
                          className=" rounded-r-lg flex-1 appearance-none border-0 w-full py-2 px-4 bg-gray-50 text-gray-600 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-500 "
                          placeholder="Your email"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
            <section className="">
              <button className="group min-w-fit flex gap-4 items-center appearance-none bg-emerald-200 w-full p-4 rounded-lg active:ring-2 focus:ring-2 focus:ring-sky-500 active:ring-sky-500 h-44">
                <div className="w-20 h-20 sm:w-32 min-w-max sm:h-32 bg-gray-300">
                  <div className="w-20 h-20 sm:w-32 sm:h-32"></div>
                </div>
                    <div className="flex flex-col text-left gap-2 max-w-md max-h-full">
                      <p className="text-lg">Name of the thing</p>
                      <p className="text-sm max-h-32 overflow-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat voluptatibus placeat nam, commodi optio pariatur </p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                  <p>Icons</p>
                  <p>Icons</p>
                  <p>Icons</p>
                    </div>
              </button>
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
