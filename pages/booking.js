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
  const [showBanner,setShowBanner]= useState(true)

  useEffect(() => {
    console.log(session);
   
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
        // handleGetDistance(parsedData.location, parsedData.destination);
        // data.distance = distanceResults.distance;
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
    Object.assign(data, { distance: distanceResults.distance });

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
     {!session &&showBanner&&  <Announcement onClick={()=>setShowBanner(false)} className="fixed" />}
      <div>
        <h2 className="sr-only">Steps</h2>

        <div>
          <div className="overflow-hidden bg-gray-200 rounded-full">
            <div className="w-12 h-2 bg-blue-500 rounded-full"></div>
          </div>

          <ol className="grid grid-cols-3 mt-4 text-sm font-medium text-gray-500">
            <li className="flex items-center justify-start text-blue-600">
              <span className="hidden sm:inline"> Details </span>

              <svg
                className="w-6 h-6 sm:w-5 sm:h-5 sm:ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                />
              </svg>
            </li>

            <li className="flex items-center justify-center text-sky-600">
              <span className="hidden sm:inline"> Address </span>

              <svg
                className="w-6 h-6 sm:w-5 sm:h-5 sm:ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </li>

            <li className="flex items-center justify-end">
              <span className="hidden sm:inline"> Payment </span>

              <svg
                className="w-6 h-6 sm:w-5 sm:h-5 sm:ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </li>
          </ol>
          
        </div>
      </div>
      <div className="flex">
        <div>

{/* <Summary 
  location={data.location}
  destination={data.destination}
  passenger={data.passengers}
  date={data.date}
  time={data.time}
  
/> */}
        </div>
      </div>
      {"location: "}
          {data.location}
          {"destination: "}
          {data.destination}
          {"passengers: "}
          {data.passengers}
          {"date: "}
          {data.date}
          {"time: "}
          {data.time}
          {"distance: "}
          {tripDistance}
          {"price: £"}
          {totalTripPrice}
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
