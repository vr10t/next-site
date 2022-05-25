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
import { FaCreditCard} from "@react-icons/all-files/fa/FaCreditCard"
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill";
import {FaAngleUp} from "@react-icons/all-files/fa/FaAngleUp"

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
  const summaryClassNames=showSummary?"fixed flex top-20 rotate-180 w-screen text-gray-800 text-3xl justify-center bg-white h-8":"fixed flex bottom-32 w-screen text-gray-800 text-3xl justify-center bg-gray-100 h-8"
  const completed = "mx-auto py-2 text-sky-500 ";
  const uncompleted = "mx-auto py-2 text-gray-500 ";
  useEffect(() => {
    console.log(session);
    console.log(window.innerWidth)
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

  return (
    <Layout>
      {!session && showBanner && (
        <Announcement onClick={() => setShowBanner(false)} className="fixed" />
      )}

      <div className="flex flex-col md:flex-row bg-gray-50">
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
          <div className="hidden lg:flex">
              <div className=" z-[10] -top-10  absolute lg:relative left-0 h-screen lg:h-max overflow-auto">
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

          <div
            onClick={() => setShowSummary(!showSummary)}
            className="lg:hidden z-[11] h-20 fixed bottom-0   flex justify-center w-screen shadow-sm border-sky-600  bg-sky-600 ">
            <div className={summaryClassNames}><FaAngleUp /></div>
            <div className="grid grid-cols-4 absolute px-4 bg-gray-100 w-screen left-0 bottom-20 text-4xl">
              <div className={data.location&&data.destination ? completed : uncompleted}>
                {data.location&&data.destination ? <FaCheck className="text-sm float-right" /> : ""}
                <FaMapMarkerAlt className="px-1" />
              </div>
              <div className={data.date&&data.time ? completed : uncompleted}>
                {data.date&&data.time ? <FaCheck className="text-sm float-right" /> : ""}
                <BsCalendarFill className="px-1" />
              </div>
              <div className={data.account ? completed : uncompleted}>
                {data.account ? <FaCheck className="text-sm float-right" /> : ""}
                <BsFillPersonFill className="px-1" />
              </div>
              <div className={data.payment ? completed : uncompleted}>
                {data.payment ? <FaCheck className="text-sm float-right" /> : ""}
                <FaCreditCard  className="px-1"/>
              </div>
             
            </div>

            <button
              
              disabled={true}
              className="flex items-center my-2 mx-4 justify-center rounded-lg w-full text-center  h-16  text-2xl font-medium text-gray-50 bg-sky-500 disabled:bg-gray-400">
              Book Now
            </button>
          </div>
        </div>
        <div className="">
          <section>
            <details
              className="p-6   border-y-2 shadow-sm border-sky-600  bg-gray-50 group"
              open>
              <summary className="flex items-center justify-between cursor-pointer">
                <h5 className="text-lg font-medium hover:text-sky-600 text-gray-900">
                  jefjikneflk
                </h5>

                <span className="flex-shrink-0 ml-1.5 p-1.5 text-gray-900 bg-white rounded-full sm:p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 w-5 h-5  transition duration-300 group-open:-rotate-45"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <p className="mt-4 leading-relaxed text-gray-700">asfkasdfm;la</p>
            </details>
          </section>
        </div>
      </div>

      <button
        onClick={() => {
          setTripDistance(data.distance);
          setTotalTripPrice(data.total_trip_price);
        }}>
        Update
      </button>
    </Layout>
  );
}
