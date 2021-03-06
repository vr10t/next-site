import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt";
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill";
import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt";
import { BsFillPersonPlusFill } from "@react-icons/all-files/bs/BsFillPersonPlusFill";
import { BsCalendarFill } from "@react-icons/all-files/bs/BsCalendarFill";
import { FaMapPin } from "@react-icons/all-files/fa/FaMapPin";
import { BsClockFill } from "@react-icons/all-files/bs/BsClockFill";
import { FaRoute } from "@react-icons/all-files/fa/FaRoute";
import { FaHourglassHalf } from "@react-icons/all-files/fa/FaHourglassHalf";
import { FaTaxi } from "@react-icons/all-files/fa/FaTaxi";
import { FaCreditCard } from "@react-icons/all-files/fa/FaCreditCard";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import { Tooltip , Spinner } from "flowbite-react";
import { useState } from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { useFormik } from "formik";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FaSuitcase } from "@react-icons/all-files/fa/FaSuitcase";
import { FaPlaneDeparture } from "@react-icons/all-files/fa/FaPlaneDeparture";
import { handleGetDistance } from "../../../utils/google-helpers";
import AutocompleteInput from "./AutocompleteInput";
import Receipt from "../Svg/Receipt";
import { useAppContext } from "../../context/state";
import ReturnSummary from "./ReturnSummary";

export default function Summary(props, children) {
  const { data, setData } = useAppContext();
  const completed =
    "flex flex-row-reverse justify-start float-left px-1 gap-1 text-sky-500 ";
  const uncompleted = "mx-auto py-2 text-gray-500 ";
 
  const [locationEditable, setLocationEditable] = useState(false);
  const [destinationEditable, setDestinationEditable] = useState(false);
  const [passengersEditable, setPassengersEditable] = useState(false);
  const [dateEditable, setDateEditable] = useState(false);
  const [timeEditable, setTimeEditable] = useState(false);
  const [passengers, setPassengers] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dateAndTime,setDateAndTime]=useState("")
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [departureTabActive, setDepartureTabActive] = useState(true);
  const [returnTabActive, setReturnTabActive] = useState(false);
  const dateObject = new Date();
  const minute = dateObject.getMinutes();
  const hour = dateObject.getHours() + 1;
  let day = dateObject.getDate();
  let month = dateObject.getMonth() + 1;
  const maxMonths = dateObject.getMonth() + 4;
  const year = dateObject.getFullYear();
  if (month < 10) month = `0${  month}`;
  if (day < 10) day = `0${  day}`;
  const now = `${hour  }:${  minute}`;
  const today = `${year  }-${  month  }-${  day}`;
  const threeMonthsFromNow = `${year  }-${  maxMonths  }-${  day}`;

  const { getFieldProps, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string()
        .required("Name is required")
        .min(2, "Name is too short")
        .max(50, "Name is too long")
        .matches(
          /^[A-z]+(([',. [a-z ][A-Z ])?[-]?[a-zA-Z]*)*$/,
          "Name must not contain invalid characters"
        ),

      lastName: Yup.string()
        .required("Name is required")
        .min(2, "Name is too short")
        .max(50, "Name is too long")
        .matches(
          /^[A-z]+(([',. [a-z ][A-Z ])?[-]?[a-zA-Z]*)*$/,
          "Name must not contain invalid characters"
        ),

      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
      acceptTerms: Yup.bool().oneOf([true], "Accept Ts & Cs is required"),
    }),
    onSubmit: (values) => {
      // same shape as initial values
      setFirstName(values.firstName);
      setLastName(values.lastName);
      setEmail(values.email);
    },
  });

  function callback(response, status) {
    console.log("status", status);
    try {
      // setDistance(response.rows[0].elements[0].distance.text);
      // setDuration(response.rows[0].elements[0].duration.text);

      data.distance = response.rows[0].elements[0].distance.text;
      data.duration = response.rows[0].elements[0].duration.text;
      setData(data);
      setTimeout(() => console.log(data.distance, data.duration), 2000);
      // setDistanceResults({ distance: distance, duration: duration });

      console.log(response, status);
    } catch (error) {
      data.distance = "error";
      data.duration = "error";
      setData(data);
      alert(`incorrect location or destination`);
    }
  }

  const handleChangeOrigin = (e) => {
    setOrigin(e);
  };

  const handleSelectOrigin = (e) => {
    geocodeByAddress(e)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("Success", latLng);
      })
      .catch((error) => console.error("Error", error));
    setOrigin(e);
    console.log("origin:", origin);
  };
  const handleChangeDestination = (e) => {
    setDestination(e);
  };
  const handleSelectDestination = (e) => {
    geocodeByAddress(e)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("Success", latLng);
      })
      .catch((error) => console.error("Error", error));
    setDestination(e);
    console.log("destination:", destination);
  };
  function edit(e) {
    // setEditable((editable)=>editable.input=true)
    switch (e.target.parentNode.id) {
      case "location":
        setLocationEditable(true);
        break;
      case "destination":
        setDestinationEditable(true);
        break;
      case "passengers":
        setPassengersEditable(true);
        break;
      case "date":
        setDateEditable(true);

        break;
      case "time":
        setTimeEditable(true);

        break;

      default:
        break;
    }
    console.log(e.target.parentNode.id);
  }
  function save(e) {
    switch (e.target.parentNode.id) {
      case "location":
        setLocationEditable(false);
        break;
      case "destination":
        setDestinationEditable(false);
        break;
      case "passengers":
        setPassengersEditable(false);
        break;
      case "date":
        setDateEditable(false);

        break;
      case "time":
        setTimeEditable(false);

        break;

      default:
        break;
    }
    if (origin != "") {
      data.location = origin;
    }
    if (destination != "") {
      data.destination = destination;
    }
    if (passengers != "") {
      data.passengers = passengers;
    }
    if (date != "") {
      data.date = date;
    }
    if (time != "") {
      data.time = time;
    }
    setData(data);
    if (data.location != undefined && data.destination != undefined) {
      handleGetDistance(data.location, data.destination, callback);
    }
    
  }
  function handleChangeSummaryTab(e) {
    if (e.target.id === "departureTab") {
      setDepartureTabActive(true);
      setReturnTabActive(false);
    }
    if (e.target.id === "returnTab") {
      setDepartureTabActive(false);
      setReturnTabActive(true);
    }
  }
  function handleDateAndTimeChange(e){
    setDateAndTime(e.target.value)
    const d = dateAndTime.split("T");
    setDate(d[0]);
    setTime(d[1]);
    setData(data)
  }
  return (
    <div className="flex fixed lg:sticky overflow-hidden bg-fixed lg:top-0 lg:self-end lg:right-0 lg:overflow-auto w-screen h-screen lg:h-full bg-clip-content bg-gray-100  lg:rounded-sm lg:w-[32rem]">
      <div className="overflow-auto ovescroll-none bg-green-4 lg:h-fit pb-32 bg-fixed  lg:pt-0 lg:pb-24 w-full mt-10 lg:mt-0 lg:max-w-lg">
      <div className="flex ovescroll-none top-10 lg:top-0 bg-gray-100 w-full lg:w-[32rem] self-center h-20 lg:h-auto  justify-center mb-4 text-3xl font-bold  text-gray-800   ">
            <p className="self-center">Summary</p>
          </div>
        <div className="bg-fixed overscroll-none">
          
          {data.return && (
            <div className="flex justify-between m-auto my-4 w-5/6 h-full">
              <span
                id="departureTab"
                onClick={handleChangeSummaryTab}
                className={`flex cursor-pointer rounded-l-lg ring-1 ring-sky-500 px-10 py-2 w-full ${
                  departureTabActive
                    ? "text-gray-50 bg-sky-500"
                    : "text-gray-900 bg-gray-100"
                } text-2xl tracking-tight font-medium justify-center  `}>
                Departure
              </span>
              <span
                id="returnTab"
                onClick={handleChangeSummaryTab}
                className={`flex cursor-pointer rounded-r-lg ring-1 ring-sky-500 px-10 py-2 w-full ${
                  returnTabActive
                    ? "text-gray-50 bg-sky-500"
                    : "text-gray-900 bg-gray-100"
                }  text-2xl tracking-tight font-medium justify-center`}>
                Return
              </span>
            </div>
          )}
          {departureTabActive && (
            <>
              <div className="flex m-auto w-5/6 bg-gray-200 rounded-2xl">
                <div className="flex flex-col gap-4 py-6 grow">
                  <div className="flex flex-row m-auto w-5/6 text-3xl font-bold text-gray-800">
                    {" "}
                    <div className="">
                      <label className="sr-only">Distance</label>
                      <Tooltip style="light" content="Distance">
                        <FaRoute className="z-2" />
                      </Tooltip>
                    </div>
                    <div className="mx-4 h-1/2 border-t-0 border-b-2 border-gray-400 border-dashed grow" />
                    <div className="self-center text-base font-bold">
                      {data.distance == undefined ? <Spinner /> : data.distance}
                    </div>
                  </div>

                  <div className="flex flex-row self-center m-auto w-5/6 text-3xl font-bold text-gray-800">
                    {" "}
                    <div className="">
                      <label className="sr-only">Estimated trip time</label>
                      <Tooltip style="light" content="Estimated trip time">
                        <FaHourglassHalf />
                      </Tooltip>
                    </div>
                    <div className="mx-4 h-1/2 border-t-0 border-b-2 border-gray-400 border-dashed grow" />
                    <div className="self-center text-base font-bold">
                      {data.duration == undefined ? <Spinner /> : data.duration}
                    </div>
                  </div>
                </div>{" "}
                
              </div>
              <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl">
                  <div className="col-span-1 my-auto text-3xl text-gray-800">
                    {" "}
                    <div className={data.location ? completed : uncompleted}>
                      {data.location ? (
                        <FaCheck className="float-right z-[4] text-sm" />
                      ) : (
                        ""
                      )}
                      <FaMapMarkerAlt className="z-[4]" />
                    </div>
                  </div>
                  <div className="col-span-2 pt-1">
                    <p className="font-bold text-gray-800 lg:text-sm">
                      Pickup address
                    </p>
                    {locationEditable ? (
                      <AutocompleteInput
                        value={origin}
                        onChange={handleChangeOrigin}
                        onSelect={handleSelectOrigin}
                      />
                    ) : (
                      <p className="text-sm text-gray-500">
                        {origin == "" ? data.location : origin}
                      </p>
                    )}
                  </div>

                  <div id="location" className="my-auto">
                    {locationEditable ? (
                      <button
                        onClick={save}
                        className="mb-10 text-sm font-bold text-indigo-700 underline sm:mb-0 lg:mb-10 hover:no-underline hover:text-indigo-500">
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={edit}
                        className="text-sm font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500">
                        Change
                      </button>
                    )}
                  </div>
                </div>
              <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl">
                  <div className="col-span-1 my-auto text-3xl text-gray-800">
                    {" "}
                    <div className={data.destination ? completed : uncompleted}>
                      {data.destination ? (
                        <FaCheck className="float-right text-sm z-[4]" />
                      ) : (
                        ""
                      )}
                      <FaMapPin className="z-[4]" />
                    </div>
                  </div>
                  <div className="col-span-2 pt-1">
                    <p className="font-bold text-gray-800 lg:text-sm">
                      Dropoff address
                    </p>
                    {destinationEditable ? (
                      <AutocompleteInput
                        value={destination}
                        onChange={handleChangeDestination}
                        onSelect={handleSelectDestination}
                      />
                    ) : (
                      <p className={`${data.destination}text-sm text-gray-500`}>
                        {destination == "" ? data.destination : destination}
                      </p>
                    )}
                  </div>

                  <div id="destination" className="my-auto">
                    {destinationEditable ? (
                      <button
                        onClick={save}
                        className="mb-10 text-sm font-bold text-indigo-700 underline sm:mb-0 lg:mb-10 hover:no-underline hover:text-indigo-500">
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={edit}
                        className="text-sm font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500">
                        Change
                      </button>
                    )}
                  </div>
                </div>

              <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl">
                  <div className="col-span-1 my-auto text-3xl text-gray-800">
                    {" "}
                    <div className={data.passengers ? completed : uncompleted}>
                      {data.passengers ? (
                        <FaCheck className="float-right text-sm z-[4]" />
                      ) : (
                        ""
                      )}
                      <BsFillPersonPlusFill className="z-[4]" />
                    </div>
                  </div>
                  <div className="col-span-2 pt-1">
                    <p className="font-bold text-gray-800 lg:text-sm">
                      Passengers
                    </p>
                    {passengersEditable ? (
                      <input
                        className="flex flex-1 px-4 py-2 w-auto text-base placeholder-gray-500 text-gray-700 bg-gray-50 rounded-md border-0 ring-2 shadow-sm appearance-none grow focus-ring-full focus:outline-none focus:ring-2 focus:ring-sky-600"
                        type="number"
                        min="1"
                        max="16"
                        value={passengers}
                        onChange={(e) => setPassengers(e.target.value)}
                      />
                    ) : (
                      <p className="text-sm text-gray-500">
                        {passengers == "" ? data.passengers : passengers}
                      </p>
                    )}
                  </div>

                  <div id="passengers" className="my-auto">
                    {passengersEditable ? (
                      <button
                        onClick={save}
                        className="mb-10 text-sm font-bold text-indigo-700 underline sm:mb-0 lg:mb-10 hover:no-underline hover:text-indigo-500">
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={edit}
                        className="text-sm font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500">
                        Change
                      </button>
                    )}
                  </div>
                </div>

              <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl">
                  <div className="col-span-1 my-auto text-3xl text-gray-800">
                    {" "}
                    <div className={data.date ? completed : uncompleted}>
                      {data.date ? (
                        <FaCheck className="float-right text-sm z-[4]" />
                      ) : (
                        ""
                      )}
                      <BsCalendarFill className="z-[4]" />
                    </div>
                  </div>
                  <div className="col-span-2 pt-1">
                    <p className="font-bold text-gray-800 lg:text-sm">
                      Pickup date
                    </p>
                    {dateEditable ? (data.date==="ASAP"?
                    <input
                        className="flex flex-1 px-4 py-2 w-auto text-base placeholder-gray-500 text-gray-700 bg-gray-50 rounded-md border-0 ring-2 shadow-sm appearance-none grow focus-ring-full focus:outline-none focus:ring-2 focus:ring-sky-600"
                        type="datetime-local"
                        min={today}
                        max={threeMonthsFromNow}
                        value={dateAndTime}
                        onChange={handleDateAndTimeChange}
                      />:<input
                        className="flex flex-1 px-4 py-2 w-auto text-base placeholder-gray-500 text-gray-700 bg-gray-50 rounded-md border-0 ring-2 shadow-sm appearance-none grow focus-ring-full focus:outline-none focus:ring-2 focus:ring-sky-600"
                        type="date"
                        min={today}
                        max={threeMonthsFromNow}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    ) : (
                      <p className="text-sm text-gray-500">
                        {date == "" ? data.date : date}
                      </p>
                    )}
                  </div>

                  <div id="date" className="my-auto">
                    {dateEditable ? (
                      <button
                        onClick={save}
                        className="mb-10 text-sm font-bold text-indigo-700 underline sm:mb-0 lg:mb-10 hover:no-underline hover:text-indigo-500">
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={edit}
                        className="text-sm font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500">
                        Change
                      </button>
                    )}
                  </div>
                </div>
              {data.time && data.date !== "ASAP" && (
                <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl">
                  <div className="col-span-1 my-auto text-3xl text-gray-800">
                    {" "}
                    <div className={data.time ? completed : uncompleted}>
                      {data.time ? (
                        <FaCheck className="float-right text-sm z-[4]" />
                      ) : (
                        ""
                      )}
                      <BsClockFill className="z-[4]" />
                    </div>
                  </div>
                  <div className="col-span-2 pt-1">
                    <p className="font-bold text-gray-800 lg:text-sm">
                      Pickup time
                    </p>
                    {timeEditable ? (
                      <input
                        className="flex flex-1 px-4 py-2 w-auto text-base placeholder-gray-500 text-gray-700 bg-gray-50 rounded-md border-0 ring-2 shadow-sm appearance-none grow focus-ring-full focus:outline-none focus:ring-2 focus:ring-sky-600"
                        type="time"
                        min={now}
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      />
                    ) : (
                      <p className="text-sm text-gray-500">{data.time}</p>
                    )}
                  </div>

                  <div id="time" className="my-auto">
                    {timeEditable ? (
                      <button
                        onClick={save}
                        className="mb-10 text-sm font-bold text-indigo-700 underline sm:mb-0 lg:mb-10 hover:no-underline hover:text-indigo-500">
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={edit}
                        className="text-sm font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500">
                        Change
                      </button>
                    )}
                  </div>
                </div>
              )}
              {data.flight_monitoring && (
                <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl">
                  <div className="col-span-1 my-auto text-3xl text-gray-800">
                    {" "}
                    <div
                      className={
                        data.flight_number &&
                        data.plane_arriving_from &&
                        data.airline_name
                          ? completed
                          : uncompleted
                      }>
                      {data.flight_number &&
                      data.plane_arriving_from &&
                      data.airline_name ? (
                        <FaCheck className="float-right text-sm z-[4]" />
                      ) : (
                        ""
                      )}
                      <FaPlaneDeparture className="z-[4]" />
                    </div>
                  </div>
                  <div className="col-span-2 pt-1">
                    <p className="font-bold text-gray-800 lg:text-sm">
                      Flight Monitoring
                    </p>
                    {data.flight_number &&
                    data.plane_arriving_from &&
                    data.airline_name ? (
                      <>
                        <p className="text-sm text-gray-500">
                          {data.plane_arriving_from}
                        </p>
                        <p className="text-sm text-gray-500">
                          {" "}
                          {data.airline_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {data.flight_number}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-gray-500">
                        You haven't provided any flight details.
                      </p>
                    )}
                  </div>

                  <div className="my-auto">
                    <a className="text-sm font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500" />
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl">
                  <div className="col-span-1 my-auto text-3xl text-gray-800">
                    {" "}
                    <div className={data.service ? completed : uncompleted}>
                      {data.service ? (
                        <FaCheck className="float-right text-sm z-[4]" />
                      ) : (
                        ""
                      )}
                      <FaTaxi className="z-[4]" />
                    </div>
                  </div>
                  <div className="col-span-2 pt-1">
                    <p className="font-bold text-gray-800 lg:text-sm">
                      Service
                    </p>
                    {data.service ? (
                      <p className="text-sm text-gray-500">{data.service}</p>
                    ) : (
                      <p className="text-sm text-pink-400">Required</p>
                    )}
                  </div>

                  <div className="my-auto">
                    <a className="text-sm font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500" />
                  </div>
                </div>
              <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl">
                  <div className="col-span-1 my-auto text-3xl text-gray-800">
                    {" "}
                    <div
                      className={
                        data.first_name &&
                        data.last_name &&
                        data.email &&
                        data.phone
                          ? completed
                          : uncompleted
                      }>
                      {data.first_name &&
                      data.last_name &&
                      data.email &&
                      data.phone ? (
                        <FaCheck className="float-right text-sm z-[4]" />
                      ) : (
                        ""
                      )}
                      <BsFillPersonFill className="z-[4]" />
                    </div>
                  </div>
                  <div className="col-span-2 pt-1">
                    <p className="font-bold text-gray-800 lg:text-sm">
                      Passenger details
                    </p>

                    {data.first_name &&
                    data.last_name &&
                    data.email &&
                    data.phone ? (
                      <>
                        <p className="text-sm text-gray-500">
                          {data.first_name} {data.last_name}
                        </p>
                        <p className="text-sm text-gray-500">{data.email}</p>
                        <p className="text-sm text-gray-500">{data.phone}</p>
                      </>
                    ) : (
                      <p className="text-sm text-pink-400">Required</p>
                    )}
                  </div>

                  <div className="my-auto">
                    <a className="text-sm font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500" />
                  </div>
                </div>
              <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl">
                  <div className="col-span-1 my-auto text-3xl text-gray-800">
                    {" "}
                    <div className={data.payment ? completed : uncompleted}>
                      {data.payment ? (
                        <FaCheck className="float-right text-sm z-[4]" />
                      ) : (
                        ""
                      )}
                      <FaCreditCard className="z-[4]" />
                    </div>
                  </div>
                  <div className="col-span-2 pt-1">
                    <p className="font-bold text-gray-800 lg:text-sm">
                      Payment Method
                    </p>
                    {data.payment ? (
                      <p className="text-sm text-gray-500">{data.payment}</p>
                    ) : (
                      <p className="text-sm text-pink-400">Required</p>
                    )}
                  </div>

                  <div className="my-auto">
                    <a className="text-sm font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500" />
                  </div>
                </div>
              
            </>
          )}

          {returnTabActive && <ReturnSummary />}
          <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 rounded-2xl bg-gray-100/25">
            <div className="col-span-1 my-auto text-3xl font-medium text-gray-800">
              {" "}
              Total:{" "}
              <hr className="h-[0.12rem] mt-1 bg-gray-400 absolute w-3/4" />
            </div>
            <div className="col-span-2 pt-1">
              <p className="font-bold text-gray-800 lg:text-sm" />
              <p className="text-sm text-gray-500" />
            </div>

            <div className="my-auto text-3xl">
              <a className="text-3xl text-gray-500">
                ??
                {data.total_trip_price === undefined ||
                data.total_trip_price === NaN ? (
                  <Spinner />
                ) : (
                  data.total_trip_price
                )}
              </a>
            </div>
          </div>
          <div className="h-10" />
          <button
            onClick={props.onClick}
            disabled={props.disabled}
            className="hidden justify-center p-4 m-auto w-5/6 text-3xl font-medium text-gray-50 bg-sky-500 rounded-lg lg:flex h-max disabled:bg-gray-400">
            Book Now
          </button>
          <div className="h-10" />
        </div>
      </div>
    </div>
  );
}
