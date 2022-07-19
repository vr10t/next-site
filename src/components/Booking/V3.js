import React, { useCallback , useEffect, useState } from "react";
import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt";
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill";
import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt";
import { BsFillPersonPlusFill } from "@react-icons/all-files/bs/BsFillPersonPlusFill";
import { BsCalendarFill } from "@react-icons/all-files/bs/BsCalendarFill";
import { FaMapPin } from "@react-icons/all-files/fa/FaMapPin";
import { BsClockFill } from "@react-icons/all-files/bs/BsClockFill";
import { FaCrosshairs } from "@react-icons/all-files/fa/FaCrosshairs";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { geocodeByAddress, getLatLng, } from "react-places-autocomplete";
import { getURL } from "next/dist/shared/lib/utils";
import { Loader } from "@googlemaps/js-api-loader";
import { Alert, Button, Checkbox, Label, Tooltip } from "flowbite-react";
import { FaArrowRight } from "@react-icons/all-files/fa/FaArrowRight";
import { throttle, debounce } from "throttle-debounce";
import Image from "next/image";
import Link from "next/link";
import { Formik, Form, Field, } from "formik";
import styles from "./Form.module.scss";
import { handleGetDistance , reverseGeocode } from "../../../utils/google-helpers";
import { AutocompleteInput } from "./AutocompleteInput";
import DateSelect from "./DateSelect";
import Ride from "../Svg/Ride";
import Map from "../Map.js";
import { useAppContext } from "../../context/state";
import StepperInput from "./StepperInput";

const PlacesAutocomplete = dynamic(() => import("react-places-autocomplete"));

// const HCaptcha = dynamic(() => import("@hcaptcha/react-hcaptcha"));

function FormV3() {
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [shouldFetchOriginSuggestions, setShouldFetchOriginSuggestions] =
    useState(false);
  const [
    shouldFetchDestinationSuggestions,
    setShouldFetchDestinationSuggestions,
  ] = useState(false);
  const [shouldFetchDirections, setShouldFetchDirections] = useState(false);
  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    version: "weekly",
    libraries: ["places"],
  });
  
  useEffect(() => {
    loader.load().then(() => {
      setMapsLoaded(true);
    });
  }, []);

  const { data, setData } = useAppContext();

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [passengers, setPassengers] = useState(1);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [distanceError, setDistanceError] = useState(false);
  const [originError, setOriginError] = useState(false);
  const [destinationError, setDestinationError] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [addReturn, setAddReturn] = useState(false);
  const [addFlightMonitoring, setAddFlightMonitoring] = useState(false);
  const [canSearch, setCanSearch] = useState(false);
  const dateObject = new Date();
  let day = dateObject.getDate();
  let month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  if (month < 10) month = `0${  month}`;
  if (day < 10) day = `0${  day}`;
  const today = `${year  }-${  month  }-${  day}`;
  const router = useRouter();

  function handleSearch(values) {
    console.log(values);
    data.date=values.date
    data.time=values.time
    data.return_date=values.return_date
    data.return_time=values.return_time
    setDestinationError(false)
    setOriginError(false)
    if (data.location != undefined && data.destination != undefined) {
      debounceHandleGetDistance(origin, destination, callback);
    }
    if(origin===""||origin.length<6){
      setOriginError(true)
    }
    if(destination===""||destination.length<6){
      setDestinationError(true)
    }

    return false;
  }
  useEffect(() => {
    if (
      data.distance !== undefined &&
      data.distance !== "error" &&
      data.passengers !== undefined
    ) {
      setCanSearch(true);
    } else {
      setCanSearch(false);
    }
  }, [data]);
  useEffect(() => {
    setData(data);
    
    setTimeout(() => {
      console.log(data);
    }, 1000);
  }, [
    origin,
    destination,
    passengers,
    date,
    time,
    addReturn,
    addFlightMonitoring,
  ]);
  function success() {
    console.log("success");
    data.location = origin;
    data.destination = destination;
    
    data.return = addReturn;
    
    data.flight_monitoring = addFlightMonitoring;
    console.log(addReturn);
    if (addReturn === true) {
      data.return_location = destination;
      data.return_destination = origin;
      data.return_passengers = data.passengers;
    }
    console.log(data.return_location, data.return_destination);
    setData(data);
    window.localStorage.removeItem("BOOKING_DATA");
    router.push("/booking");
  }
  function callback(response, status) {
    console.log("status", status);
    setShouldFetchDirections(false);
    try {
      data.distance = response.rows[0].elements[0].distance.text;
      data.duration = response.rows[0].elements[0].duration.text;

      setTimeout(() => console.log(data.distance, data.duration), 2000);
      // setDistanceResults({ distance: distance, duration: duration });
      setShouldFetchDirections(true);
      console.log(response, status);
      console.log(origin, destination);
      success();
    } catch (error) {
      setShouldFetchDirections(false);
      data.distance = "error";
      data.duration = "error";
      console.log(error);
      setData(data);
      setDistanceError(true);
    }
  }

  const debounceHandleGetDistance = throttle(5000, handleGetDistance);
  const handleChangeOrigin = (e) => {
    while (origin.length < 1) {
      setShouldFetchOriginSuggestions(false);
      setOrigin(e);
      data.location = origin;
      setData(data);
      return;
    }
    setShouldFetchDirections(false);
    setShouldFetchOriginSuggestions(true);
    setOrigin(e);
    data.location = origin;
    setData(data);
    console.log(data.location);
  };

  function handleChangeOrSelect() {
    console.log(origin, destination);
  }
  const handleSelectOrigin = (e) => {
    setOrigin(e);

    data.location = origin;
    console.log(origin);
    setData(data);
  };
  const handleChangeDestination = (e) => {
    while (destination.length < 1) {
      setShouldFetchDestinationSuggestions(false);

      setDestination(e);
      return;
    }
    setShouldFetchDestinationSuggestions(true);
    setShouldFetchDirections(false);
    setDestination(e);
    data.destination = destination;
    setData(data);
  };
  const handleSelectDestination = (e) => {
    setDestination(e);
    data.destination = destination;
    console.log(data);
    setData(data);
  };
  function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  function handleChangePassengers(e) {
    setPassengers(e.target.value);
    data.passengers = passengers;
    setData(data);
  }
  function handleChangeDate(e) {
    setDateAndTime(e.target.value);
  }
  function handleChangeReturnDate(e) {
    setReturnDateAndTime(e.target.value);
  }
  function showPosition(position) {
    console.log(
      `Latitude: ${ 
        position.coords.latitude 
        }<br>Longitude: ${ 
        position.coords.longitude}`
    );
    reverseGeocode(position.coords.latitude, position.coords.longitude).then(
      (result) => {
        setOrigin(result);
      }
    );
  }
  useEffect(() => console.log(data), [data]);
  useEffect(() => setData(data), [addFlightMonitoring]);
  function handleAddReturn(e) {
    setAddReturn(e.target.checked);

    data.return = addReturn;

    setData(data);
  }
  function handleAddFlightMonitoring(e) {
    setAddFlightMonitoring(e.target.checked);

    console.log("addflightmon", addFlightMonitoring);
    data.flight_monitoring = addFlightMonitoring;
    data.flight_number = "";
    setData(data);
  }
  const center = { lat: 51.8822, lng: -0.4165 };
  // Create a bounding box with sides ~10km away from the center point
  const defaultBounds = {
    north: center.lat + 0.02,
    south: center.lat - 0.02,
    east: center.lng + 0.02,
    west: center.lng - 0.02,
  };
  return (
    <div className="absolute top-0 bg-gradient-to-b from-sky-100 to-transparent h-full  z-[9]  justify-center mx-auto  w-full  py-4 ">
      {/* <div className="mx-auto  flex flex-col items-center mb-6 w-full h-full">
        {mapsLoaded && (
          <>
           
            <Map
              className="absolute"
              origin={origin}
              destination={destination}
              shouldFetchDirections={shouldFetchDirections}>
              {" "}
            </Map>
            {data.distance && (
              <span className="w-full h-full text-center text-white text-2xl bg-black/50 z-[9999]">
                Est. distance: {data.distance}
              </span>
            )}
            {data.duration && (
              <span className="w-full h-full text-center text-white text-2xl bg-black/50 z-[9999]">
                Est. duration: {data.duration}
              </span>
            )}
          </>
        )}
      </div> */}

      <div className="lg:absolute overflow-x-hidden lg:w-1/2 flex flex-col mt-24 mb-4 lg:top-40 lg:left-20">
        <h1 className="lg:text-7xl text-3xl md:text-5xl text-center text-gray-900 font-bold">
          Booking a taxi has never been easier!
        </h1>
        <h2 className="px-10 lg:pt-6 md:pt-4 text-center self-center text-lg lg:text-xl text-gray-800 lg:text-gray-50 font-semibold">
          Order a taxi now without the hassle or Sign Up and save up to{" "}
          <p className="text-sky-600 font-extrabold inline-flex stroke-gray-50 stroke-2">
            40%{" "}
          </p>
          {"  "}on future rides!
        </h2>
        <button className="bg-sky-600 hover:bg-sky-500 duration-200 mt-4 w-72 self-center text-md lg:text-xl font-bold p-2 rounded-full text-gray-50">
          <Link href="/signup">Get Started</Link>
        </button>
        {/* <Ride /> */}
      </div>

      <div>
        <div>
          <div className="flex flex-col overflow-x-hidden  w-screen xs:w-96 lg:absolute  bg-gray-100 shadow-lg p-4 rounded-lg -top-96  lg:mt-0 justify-center self-center lg:top-40 lg:right-10 items-center mx-auto grow     ">
            {data.distance && (
              <span className="w-full h-full text-center text-gray-900 text-xl ">
                Est. distance: {data.distance}
              </span>
            )}
            {data.duration && (
              <span className="w-full h-full text-center text-gray-900 text-xl ">
                Est. duration: {data.duration}
              </span>
            )}
            {distanceError && (
              <Alert color="red">Incorrect location or destination</Alert>
            )}
            <div className="">
              <label
                htmlFor="location"
                className="text-gray-900 justify-start self-start text-base font-medium">
                Pickup
              </label>
              <div className="flex flex-row rounded-lg my-2  w-80  ">
                {" "}
                <span className="inline-flex  rounded-l-md  items-center px-3  bg-sky-500  text-gray-50 shadow-md text-lg">
                  <FaMapMarkerAlt />
                </span>
                {mapsLoaded && (<>
                  <PlacesAutocomplete
                    value={origin}
                    onChange={handleChangeOrigin}
                    onSelect={handleSelectOrigin}
                    onError={(status, clearSuggestions) => {
                      console.log(
                        "Google Maps API returned error with status: ",
                        status
                      );
                      clearSuggestions();
                    }}
                    shouldFetchSuggestions={shouldFetchOriginSuggestions}
                    searchOptions={{
                      bounds:defaultBounds,
                      strictBounds:true,
                      componentRestrictions: { country: "gb" },
                      fields: ["address_components","geometry"],
                      // types:["address"]
                     
                    }}>
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <div className="w-80" onBlur={handleChangeOrSelect}>
                        <input
                          {...getInputProps({
                            id: "location",
                            className: ` w-[17.5rem] border-0 rounded-r-md flex-1 appearance-none focus-ring-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-500 shadow-md text-base focus:outline-none focus:ring-2 focus:ring-sky-500`,
                            name: "location",
                            type: "text",
                            required: true,
                            placeholder: "From...",
                          })}
                        />

                        <div className="absolute bg-gray-50 z-[999] ">
                          {loading && <div>Loading...</div>}
                          {suggestions.map((suggestion) => {
                            const className = suggestion.active
                              ? "bg-gray-200 py-2 px-4 max-xs"
                              : "bg-gray-50 py-2 px-4 max-xs";
                            // inline style for demonstration purpose
                            const style = suggestion.active
                              ? {
                                  backgroundColor: "rgb(229 231 235)",
                                  cursor: "pointer",
                                }
                              : {
                                  backgroundColor: "rgb(249 250 251)",
                                  cursor: "pointer",
                                };
                            const key = suggestion.placeId;
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                  key,
                                })}>
                                <span key={suggestion.description}>{suggestion.description} {console.log(suggestion)}</span>
                                
                              </div>
                            );
                          })}
                         {/* { suggestions &&<p className="">Powered by Google</p>} */}
                        </div>
                      </div>
                    )}
                    
                  </PlacesAutocomplete>
                  {originError && (
                        <div className="absolute w-80 h-10 text-sm font-medium text-pink-500 rounded-lg ring-2 ring-pink-400 pointer-events-none">
                          <p className="relative left-1 -top-3 px-2 w-max bg-pink-400 text-white rounded-lg">
                            Incorrect location
                          </p>
                        </div>
                      )}
                  </>
                )}
                <span className="inline-flex relative ring-1  duration-200 ring-sky-500 shadow-md  text-white bg-sky-500 hover:bg-gray-100 hover:text-sky-500 hover:scale-105 px-2 rounded-full right-10 ml-1 my-1   ">
                  <button onClick={getLocation}>
                    <Tooltip
                      style="light"
                      placement="left"
                      content="Your location">
                      <FaCrosshairs />
                    </Tooltip>
                  </button>
                </span>
              </div>
              <label
                htmlFor="destination"
                className="text-gray-900 self-start text-base font-medium">
                Dropoff
              </label>
              <div className="flex flex-row rounded-lg my-2 w-80  border-1 border-gray-900">
                {" "}
                <span className="inline-flex  rounded-l-md  items-center px-3  bg-sky-500  text-gray-50 shadow-md text-lg">
                  <FaMapPin />
                </span>
                {mapsLoaded && (<>
                  <PlacesAutocomplete
                    value={destination}
                    onChange={handleChangeDestination}
                    onSelect={handleSelectDestination}
                    onError={(status, clearSuggestions) => {
                      console.log(
                        "Google Maps API returned error with status: ",
                        status
                      );
                      clearSuggestions();
                    }}
                    debounce={200}
                    shouldFetchSuggestions={shouldFetchDestinationSuggestions}
                    searchOptions={{
                      bounds:defaultBounds,
                      strictBounds:true,
                      componentRestrictions: { country: "gb" },
                      fields: ["address_components","geometry"],
                      types:["address"]
                    }}>
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <div onBlur={handleChangeOrSelect}>
                        <input
                          {...getInputProps({
                            id: "destination",
                            className: ` w-[17.5rem] relative grow  border-0 rounded-r-md flex-1 appearance-none focus-ring-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-500 shadow-md text-base focus:outline-none focus:ring-2 focus:ring-sky-500`,
                            name: "destination",
                            type: "text",
                            required: true,
                            placeholder: "To...",
                          })}
                        />
                       
                        <div className="absolute bg-gray-50 z-[999]   ">
                          {loading && <div>Loading...</div>}
                          {suggestions.map((suggestion) => {
                            const className = suggestion.active
                              ? "bg-gray-200 py-2 px-4 max-xs"
                              : "bg-gray-50 py-2 px-4 max-xs";
                            // inline style for demonstration purpose
                            const style = suggestion.active
                              ? {
                                  backgroundColor: "rgb(229 231 235)",
                                  cursor: "pointer",
                                }
                              : {
                                  backgroundColor: "rgb(249 250 251)",
                                  cursor: "pointer",
                                };

                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                })}
                                key={suggestion.id}>
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                  {destinationError && (
                        <div className="absolute w-80 h-10 text-sm font-medium text-pink-500 rounded-lg ring-2 ring-pink-400 pointer-events-none">
                          <p className="relative left-1 -top-3 px-2 w-max bg-pink-400 text-white rounded-lg">
                            Incorrect destination
                          </p>
                        </div>
                      )}</>
                )}
              </div>
              <label
                htmlFor="passangers"
                className="text-gray-900 justify-start  self-start text-base font-medium">
                Passangers
              </label>

              <StepperInput for="passengers" />
            </div>

            <Formik
              initialValues={{
                date: today,
                time: "",
                return_date: "",
                return_time: "",
              }}
              validationSchema={Yup.object().shape({
                date: Yup.date().required("Pickup date is required"),
                time: Yup.string().required("Pickup time is required"),
                return_date: Yup.date(),
                // .required("Return date is required")
                return_time: Yup.string(),
                // .required("Return time is required"),
              })}
              onSubmit={handleSearch}>
              {({
                setFieldValue,
                setFieldTouched,
                values,
                errors,
                touched,
              }) => (
                <Form className="flex flex-col items-center w-80">
                  <label
                    htmlFor="date"
                    className="text-gray-900 justify-start self-start text-base font-medium">
                    Pickup Date
                  </label>
                  <div className="flex justify-between gap-2 my-2 w-80 max-w-96">
                    <div className="flex flex-row col-span-3 rounded-lg  w-full border-1 border-gray-900">
                      {" "}
                      <span className="inline-flex  rounded-l-md  items-center px-3  bg-sky-500  text-gray-50 shadow-md text-lg">
                        <BsCalendarFill />
                      </span>
                      <Field
                        id="date"
                        className=" border-0 rounded-r-md flex-1 appearance-none focus-ring-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-500 shadow-md text-base focus:outline-none focus:ring-2 focus:ring-sky-500"
                        name="date"
                        type="date"
                      />
                      
                      {errors.date && touched.date && (
                        <div className="absolute w-80 h-10 text-sm font-medium text-pink-500 rounded-lg ring-2 ring-pink-400 pointer-events-none">
                          <p className="relative left-1 -top-3 px-2 w-max bg-pink-400 text-white rounded-lg">
                            {errors.date}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <label
                    htmlFor="time"
                    className="text-gray-900 justify-start self-start text-base font-medium">
                    Pickup Time
                  </label>
                  <div className="flex justify-between gap-2 my-2 w-80 max-w-96">
                    <div className="flex flex-row col-span-3 rounded-lg  w-full border-1 border-gray-900">
                      {" "}
                      <span className="inline-flex  rounded-l-md  items-center px-3  bg-sky-500  text-gray-50 shadow-md text-lg">
                        <BsClockFill />
                      </span>
                      <Field
                        id="time"
                        className=" border-0 rounded-r-md flex-1 appearance-none focus-ring-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-500 shadow-md text-base focus:outline-none focus:ring-2 focus:ring-sky-500"
                        name="time"
                        type="time"
                      />
                      {errors.time && touched.time && (
                        <div className="absolute w-80 h-10 text-sm font-medium text-pink-500 rounded-lg ring-2 ring-pink-400 pointer-events-none">
                          <p className="relative left-1 -top-3 px-2 w-max bg-pink-400 text-white rounded-lg">
                            {errors.time}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  {addReturn && (
                    <>
                      <div className="flex flex-col justify-between  w-80  max-w-96">
                        <div className="text-lg text-gray-800 font-semibold">
                          Return
                        </div>
                        <label
                          htmlFor="return_date"
                          className="text-gray-900 justify-start self-start text-base font-medium">
                          Date
                        </label>
                        <div className="flex flex-row col-span-3 rounded-lg  w-full border-1 border-gray-900">
                          {" "}
                          <span className="inline-flex  rounded-l-md  items-center px-3  bg-sky-500  text-gray-50 shadow-md text-lg">
                            <FaArrowRight />
                          </span>
                          <Field
                            id="return_date"
                            className=" border-0 rounded-r-md flex-1 appearance-none focus-ring-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-500 shadow-md text-base focus:outline-none focus:ring-2 focus:ring-sky-500"
                            name="return_date"
                            type="date"
                          />
                        </div>
                      </div>
                      <label
                        htmlFor="return_time"
                        className="text-gray-900 justify-start self-start text-base font-medium">
                        Time
                      </label>
                      <div className="flex justify-between gap-2 w-80 max-w-96">
                        <div className="flex flex-row col-span-3 rounded-lg  w-full border-1 border-gray-900">
                          {" "}
                          <span className="inline-flex  rounded-l-md  items-center px-3  bg-sky-500  text-gray-50 shadow-md text-lg">
                            <BsClockFill />
                          </span>
                          <Field
                            id="return_time"
                            className=" border-0 rounded-r-md flex-1 appearance-none focus-ring-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-500 shadow-md text-base focus:outline-none focus:ring-2 focus:ring-sky-500"
                            name="return_time"
                            type="time"
                          />
                        </div>
                      </div>
                    </>
                  )}
                  <div className="flex my-4 gap-12">
                    <div className="flex ml-1 gap-2 items-center">
                      <Checkbox onClick={handleAddReturn} id="return" />
                      <Label
                        htmlFor="return"
                        className="text-base text-gray-800">
                        Add return
                      </Label>
                    </div>{" "}
                    <div className="flex gap-2 items-center">
                      <Checkbox
                        onClick={handleAddFlightMonitoring}
                        id="flightMonitoring"
                      />
                      <Label
                        htmlFor="flightMonitoring"
                        className="text-base text-gray-800">
                        Add Flight Monitoring
                      </Label>
                    </div>{" "}
                  </div>
                  <div className="flex flex-row rounded-lg mx-1 w-80">
                    <button
                      type="submit"
                      className="  lg:max-lg shadosm py-2 px-4 xs:mx-auto mx-1 w-80  rounded-full bg-sky-600 disabled:bg-gray-500 text-stone-50 text-xl   font-bold transition-all duration-1000 ease-in-out  ">
                      Search
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FormV3;
