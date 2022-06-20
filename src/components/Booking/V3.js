import React, { useCallback } from "react";
import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt";
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill";
import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt";
import { BsFillPersonPlusFill } from "@react-icons/all-files/bs/BsFillPersonPlusFill";
import { BsCalendarFill } from "@react-icons/all-files/bs/BsCalendarFill";
import { FaMapPin } from "@react-icons/all-files/fa/FaMapPin";
import { BsClockFill } from "@react-icons/all-files/bs/BsClockFill";
import { FaCrosshairs } from "@react-icons/all-files/fa/FaCrosshairs";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAppContext } from "../../context/state";
import Map from "../Map.js";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { getURL } from "next/dist/shared/lib/utils";
import { Loader } from "@googlemaps/js-api-loader";
import styles from "./Form.module.scss";
import { Checkbox, Label, Tooltip } from "flowbite-react";
import { FaArrowRight } from "@react-icons/all-files/fa/FaArrowRight";
import { handleGetDistance } from "../../../utils/google-helpers";
import { throttle, debounce } from "throttle-debounce";
import { AutocompleteInput } from "./AutocompleteInput";
import { reverseGeocode } from "../../../utils/google-helpers";
import DateSelect from "./DateSelect";
const PlacesAutocomplete = dynamic(() => import("react-places-autocomplete"));

// const HCaptcha = dynamic(() => import("@hcaptcha/react-hcaptcha"));

function Form() {
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
  useCallback(() => {}, [onSubmit]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [dateAndTime, setDateAndTime] = useState("ASAP");
  const [date, setDate] = useState("ASAP");
  const [time, setTime] = useState("");
  const [returnDateAndTime, setReturnDateAndTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [addReturn, setAddReturn] = useState(false);
  const [addFlightMonitoring, setAddFlightMonitoring] = useState(false);
  let dateObject = new Date();
  let day = dateObject.getDate();
  let month = dateObject.getMonth() + 1;
  let year = dateObject.getFullYear();
  let distance, duration;
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  let today = year + "-" + month + "-" + day;
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    location: Yup.string(),
    // .required('Title is required'),
    destination: Yup.string(),
    // .required('First Name is required'),
    passengers: Yup.number()
      .required("Last name is required")
      .positive()
      .integer(),
    date: Yup.string(),
    return_date: Yup.string(),
  });
  useEffect(() => {
    // setTime(date?.split())
    let d = dateAndTime.split("T");
    setDate(d[0]);
    setTime(d[1]);
    console.log(date, time);
  }, [dateAndTime]);
  useEffect(() => {
    // setTime(date?.split())
    let d = returnDateAndTime.split("T");
    setReturnDate(d[0]);
    setReturnTime(d[1]);
    console.log(returnDate, returnTime);
  }, [returnDateAndTime]);
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  function onSubmit() {
    console.log(origin, destination);
    data.location = origin;
    data.destination = destination;
    data.passengers = passengers;
    data.date = date;
    data.time = time;
    data.return = addReturn;
    data.return_date = returnDate;
    data.return_time = returnTime;
    data.flight_monitoring = addFlightMonitoring;
    console.log(addReturn);
    if (addReturn === true) {
      data.return_location = destination;
      data.return_destination = origin;
      data.return_passengers = passengers;
    }
    console.log(data.return_location, data.return_destination);
    setData(data);

    window.localStorage.removeItem("BOOKING_DATA");
    router.push("/booking")
    return false
  }

  useEffect(() => {
    setData(data);

    setTimeout(() => {
      console.log(data);
    }, 1000);
  }, [origin, destination]);
  function callback(response, status) {
    console.log("status", status);
    setShouldFetchDirections(false);
    try {
      distance = response.rows[0].elements[0].distance.text;
      duration = response.rows[0].elements[0].duration.text;
      data.distance = response.rows[0].elements[0].distance.text;
      data.duration = response.rows[0].elements[0].duration.text;
      setData(data);
      setTimeout(() => console.log(data.distance, data.duration), 2000);
      // setDistanceResults({ distance: distance, duration: duration });
      setShouldFetchDirections(true);
      console.log(response, status);
    } catch (error) {
      setShouldFetchDirections(false);
      data.distance = "error";
      data.duration = "error";
      setData(data);
      console.log(`incorrect location or destination`);
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
    if (data.location != undefined && data.destination != undefined) {
      debounceHandleGetDistance(origin, destination, callback);
    }
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
      "Latitude: " +
        position.coords.latitude +
        "<br>Longitude: " +
        position.coords.longitude
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

  return (
    <div className="relative  z-[9]  justify-center mx-auto  w-full bg-none py-4 ">
      <div className="mx-auto  flex flex-col items-center mb-6 w-full h-full">
        {mapsLoaded && (
          <>
            {" "}
            <Map
              className="absolute"
              origin={origin}
              destination={destination}
              shouldFetchDirections={shouldFetchDirections}>
              {" "}
            </Map>
            {distance && (
              <span className="w-full h-full text-center text-white text-2xl bg-black/50 z-[9999]">
                Est. distance: {data.distance}
              </span>
            )}
            {duration && (
              <span className="w-full h-full text-center text-white text-2xl bg-black/50 z-[9999]">
                Est. duration: {data.duration}
              </span>
            )}
          </>
        )}
      </div>
      <form id="booking" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2  items-center mx-auto grow  w-full   ">
          <div className="flex flex-row rounded-lg   w-80  ">
            {" "}
            <span className="inline-flex  rounded-l-md  items-center px-3  bg-sky-100  text-gray-700 shadow-sm text-lg">
              <label htmlFor="location" className="sr-only ">
                From
              </label>
              <FaMapMarkerAlt />
            </span>
            {mapsLoaded && (
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
                  componentRestrictions: { country: "gb" },
                  fields: ["formatted_address"],
                }}>
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div className="w-80" onBlur={handleChangeOrSelect}>
                    <input
                      {...register("location")}
                      {...getInputProps({
                        id: "location",
                        className: ` w-[17.5rem] border-0 rounded-r-md flex-1 appearance-none focus-ring-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-100`,
                        name: "location",
                        type: "text",
                        required: true,
                        placeholder: "From...",
                      })}
                    />

                    <div className="absolute bg-gray-50 z-[999] ">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        let className = suggestion.active
                          ? "bg-gray-200 py-2 px-4 max-xs"
                          : "bg-gray-50 py-2 px-4 max-xs";
                        // inline style for demonstration purpose
                        let style = suggestion.active
                          ? {
                              backgroundColor: "rgb(229 231 235)",
                              cursor: "pointer",
                            }
                          : {
                              backgroundColor: "rgb(249 250 251)",
                              cursor: "pointer",
                            };
                        let key = suggestion.id;
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                              key,
                            })}>
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            )}
            <span className="inline-flex relative ring-1 ring-gray-400 duration-200 hover:ring-gray-50 shadow-sm bg-gray-200 text-gray-900 hover:bg-sky-500 hover:text-white px-2 rounded right-10 ml-1 my-1   ">
              <button onClick={getLocation}>
                <Tooltip style="light" placement="left" content="Your location">
                  <FaCrosshairs />
                </Tooltip>
              </button>
            </span>
          </div>
          <div className="flex flex-row rounded-lg w-80  border-1 border-gray-900">
            {" "}
            <span className="inline-flex  rounded-l-md  items-center px-3  bg-sky-100  text-gray-700 shadosm text-lg">
              <label htmlFor="destination" className="sr-only ">
                To
              </label>
              <FaMapPin />
            </span>
            {mapsLoaded && (
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
                  componentRestrictions: { country: "gb" },
                  fields: ["formatted_address"],
                }}>
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div onBlur={handleChangeOrSelect}>
                    <input
                      {...register("destination")}
                      {...getInputProps({
                        id: "destination",
                        className: ` w-[17.5rem] relative grow  border-0 rounded-r-md flex-1 appearance-none focus-ring-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-500 shado-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-100`,
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
            )}
          </div>
          <div className="flex flex-row rounded-lg w-80  border-1 border-gray-900">
            {" "}
            <span className="inline-flex  rounded-l-md  items-center px-3  bg-sky-100  text-gray-700 shadosm text-lg">
              <label htmlFor="passangers" className="sr-only ">
                Passangers
              </label>
              <BsFillPersonPlusFill />
            </span>
            <input
              {...register("passengers")}
              id="passengers"
              className="  flex w-80  border-0 rounded-r-md flex-1 appearance-none focus-ring-full  py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-cyan-600"
              name="passengers"
              required={true}
              value={passengers}
              onChange={handleChangePassengers}
              type="number"
              placeholder="Passengers"
              min="1"
              max="16"
            />
          </div>
          <div className="flex justify-between gap-2 w-80 max-w-96">
            <div className="flex flex-row col-span-3 rounded-lg  w-full border-1 border-gray-900">
              {" "}
              <span className="inline-flex  rounded-l-md  items-center px-3  bg-sky-100  text-gray-700 shadow-sm text-lg">
                <label htmlFor="date" className="sr-only "></label>
                <BsCalendarFill />
              </span>
              {/* <select
                {...register("date")}
                onChange={(e) => setTravelDate(e.target.value)}
                className=" border-0 rounded-r-md flex-1 appearance-none focus-ring-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-cyan-600"
                defaultValue="ASAP">
                <option value="ASAP">ASAP</option>
                <option value="Later">Later</option>
              </select> */}
              <DateSelect />
            </div>
          </div>
          {data.date !== "ASAP" && (
            <div className="flex flex-col w-80  max-w-96">
              <div className="text-lg text-gray-800 font-semibold">
                Departure date
              </div>
              <div className="flex flex-row col-span-3 rounded-lg  w-full border-1 border-gray-900">
                {" "}
                <span className="inline-flex  rounded-l-md  items-center px-3  bg-sky-100  text-gray-700 shadow-sm text-lg">
                  <FaArrowRight />
                </span>
                <input
                  {...register("date")}
                  id="date"
                  className=" border-0 rounded-r-md flex-1 appearance-none focus-ring-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-cyan-600"
                  name="date"
                  value={dateAndTime}
                  onChange={handleChangeDate}
                  type="datetime-local"
                />
              </div>
            </div>
          )}
          {addReturn && (
            <div className="flex flex-col justify-between  w-80  max-w-96">
              <div className="text-lg text-gray-800 font-semibold">Return</div>
              <div className="flex flex-row col-span-3 rounded-lg  w-full border-1 border-gray-900">
                {" "}
                <span className="inline-flex  rounded-l-md  items-center px-3  bg-sky-100  text-gray-700 shadow-sm text-lg">
                  <FaArrowRight />
                </span>
                <input
                  {...register("return_date")}
                  id="return_date"
                  className=" border-0 rounded-r-md flex-1 appearance-none focus-ring-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-cyan-600"
                  name="return_date"
                  value={returnDateAndTime}
                  onChange={handleChangeReturnDate}
                  type="datetime-local"
                />
              </div>
            </div>
          )}
          <div className="flex gap-12">
            <div className="flex ml-1 gap-2 items-center">
              <Checkbox onClick={handleAddReturn} id="return" />
              <Label htmlFor="return" className="text-base text-gray-800">
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
              className="  lg:max-lg shadosm py-2 px-4 xs:mx-auto mx-1 w-80  rounded-full bg-sky-500 text-stone-50 text-xl   font-bold transition-all duration-1000 ease-in-out  ">
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Form;
