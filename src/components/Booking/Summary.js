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
import { useAppContext } from "../../context/state";
import { Tooltip } from "flowbite-react";
import Receipt from "../Svg/Receipt";
import { useState } from "react";
import AutocompleteInput from "../Booking/AutocompleteInput";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { handleGetDistance } from "../../../utils/google-helpers";
import { Spinner } from "flowbite-react";
import { useFormik } from "formik";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FaSuitcase } from "@react-icons/all-files/fa/FaSuitcase";
import { FaPlaneDeparture } from "@react-icons/all-files/fa/FaPlaneDeparture";
import ReturnSummary from "./ReturnSummary"
export default function Summary(props, children) {
  const { data, setData } = useAppContext();
  const completed =
    "flex flex-row-reverse justify-start float-left px-1 gap-1 text-sky-500 ";
  const uncompleted = "mx-auto py-2 text-gray-500 ";
  const [editable, setEditable] = useState({
    location: false,
    destination: false,
    passengers: false,
    date: false,
    time: false,
  });
  const [locationEditable, setLocationEditable] = useState(false);
  const [destinationEditable, setDestinationEditable] = useState(false);
  const [passengersEditable, setPassengersEditable] = useState(false);
  const [dateEditable, setDateEditable] = useState(false);
  const [timeEditable, setTimeEditable] = useState(false);
  const [passengers, setPassengers] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [departureTabActive,setDepartureTabActive] = useState(true)
  const [returnTabActive,setReturnTabActive] = useState(false)
  let dateObject = new Date();
  let minute = dateObject.getMinutes();
  let hour = dateObject.getHours() + 1;
  let day = dateObject.getDate();
  let month = dateObject.getMonth() + 1;
  let maxMonths = dateObject.getMonth() + 4;
  let year = dateObject.getFullYear();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  let now = hour + ":" + minute;
  let today = year + "-" + month + "-" + day;
  let threeMonthsFromNow = year + "-" + maxMonths + "-" + day;

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
      setData(data)
      setTimeout(()=>console.log(data.distance, data.duration),2000)
      // setDistanceResults({ distance: distance, duration: duration });

      console.log(response, status);
    } catch (error) {
      data.distance='error'
      data.duration='error'
      setData(data)
      alert(`incorrect location or destination`)
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
    if(data.location !=undefined&&data.destination!=undefined){
    handleGetDistance(data.location, data.destination, callback)
  }
  
  }
  function handleChangeSummaryTab(e){
    if (e.target.id==="departureTab") {
      setDepartureTabActive(true)
      setReturnTabActive(false)
    }
    if (e.target.id==="returnTab") {
      setDepartureTabActive(false)
      setReturnTabActive(true)
    }
  }
  return (
    <div className="flex w-screen bg-clip-content bg-gray-100 shadow-2xl lg:rounded-xl lg:w-full">
      <div className="overflow-auto mt-24 w-full lg:mt-2 lg:max-w-lg">
        <div className="">
        
          <h2 className="flex justify-center text-3xl font-bold text-left text-gray-800 mb-4 lg:my-10 lg:block lg:ml-16">
            Summary
          </h2>
          {data.return&& <div className="w-5/6 m-auto my-4  h-full  flex justify-between">
          <span id="departureTab" onClick={handleChangeSummaryTab} className={`flex cursor-pointer rounded-l-lg ring-1 ring-sky-500 px-10 py-2 w-full ${departureTabActive?"bg-sky-500 text-gray-50":"bg-gray-100 text-gray-900"} text-2xl tracking-tight font-medium justify-center  `}>Departure</span>
          <span id="returnTab" onClick={handleChangeSummaryTab} className={`flex cursor-pointer rounded-r-lg ring-1 ring-sky-500 px-10 py-2 w-full ${returnTabActive?"bg-sky-500 text-gray-50":"bg-gray-100 text-gray-900"}  text-2xl tracking-tight font-medium justify-center`} >Return</span>
        </div>}
        {departureTabActive &&<>
          <div className="flex rounded-2xl w-5/6 m-auto bg-gray-200 ">
            <div className="flex flex-col gap-4 py-6 grow">
              <div className="flex flex-row  m-auto  w-5/6 text-3xl font-bold text-gray-800">
                {" "}
                <div className="">
                  <label className="sr-only">Distance</label>
                  <Tooltip style="light" content="Distance">
                    <FaRoute />
                  </Tooltip>
                </div>
                <div className="h-1/2 mx-4 border-t-0 border-b-2 border-gray-400 border-dashed grow"></div>
                <div className="self-center text-base font-bold">
                  {data.distance==undefined?  <Spinner />:data.distance}
                </div>
              </div>

              <div className="flex flex-row self-center m-auto  w-5/6 text-3xl font-bold text-gray-800">
                {" "}
                <div className="">
                  <label className="sr-only">Estimated trip time</label>
                  <Tooltip style="light" content="Estimated trip time">
                    <FaHourglassHalf />
                  </Tooltip>
                </div>
                <div className="h-1/2 mx-4 border-t-0 border-b-2 border-gray-400 border-dashed grow"></div>
                <div className="self-center text-base font-bold">
                {data.duration==undefined?  <Spinner />:data.duration}
                </div>
              </div>
            </div>{" "}
            <Receipt className="" />
          </div>
          <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl">
            <div className="col-span-1 my-auto text-3xl text-gray-800">
              {" "}
              <div className={data.location ? completed : uncompleted}>
                {data.location ? (
                  <FaCheck className="float-right text-sm" />
                ) : (
                  ""
                )}
                <FaMapMarkerAlt />
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
                <p className={`text-sm text-gray-500`}>
                  {origin == "" ? props.location : origin}
                </p>
              )}
            </div>

            <div id="location" className="my-auto">
              {locationEditable ? (
                <button
                  onClick={save}
                  className="text-sm mb-10 sm:mb-0 font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500">
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
                  <FaCheck className="float-right text-sm" />
                ) : (
                  ""
                )}
                <FaMapPin />
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
                  {destination == "" ? props.destination : destination}
                </p>
              )}
            </div>

            <div id="destination" className="my-auto">
              {destinationEditable ? (
                <button
                  onClick={save}
                  className="text-sm mb-10 sm:mb-0 font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500">
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
                  <FaCheck className="float-right text-sm" />
                ) : (
                  ""
                )}
                <BsFillPersonPlusFill />
              </div>
            </div>
            <div className="col-span-2 pt-1">
              <p className="font-bold text-gray-800 lg:text-sm">Passengers</p>
              {passengersEditable ? (
                <input
                  className=" w-auto  flex grow border-0 rounded-md flex-1 appearance-none focus-ring-full py-2 px-4 bg-gray-50 text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none ring-2 focus:ring-2 focus:ring-sky-600"
                  type="number"
                  min="1"
                  max="16"
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                />
              ) : (
                <p className={`text-sm text-gray-500`}>
                  {passengers == "" ? props.passengers : passengers}
                </p>
              )}
            </div>

            <div id="passengers" className="my-auto">
              {passengersEditable ? (
                <button
                  onClick={save}
                  className="text-sm  mb-10 sm:mb-0 font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500">
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
                {data.date ? <FaCheck className="float-right text-sm" /> : ""}
                <BsCalendarFill />
              </div>
            </div>
            <div className="col-span-2 pt-1">
              <p className="font-bold text-gray-800 lg:text-sm">Pickup date</p>
              {dateEditable ? (
                <input
                  className=" w-auto  flex grow border-0 rounded-md flex-1 appearance-none focus-ring-full py-2 px-4 bg-gray-50 text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none ring-2 focus:ring-2 focus:ring-sky-600"
                  type="date"
                  min={today}
                  max={threeMonthsFromNow}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              ) : (
                <p className={`text-sm text-gray-500`}>
                  {date == "" ? data.date : date}
                </p>
              )}
            </div>

            <div id="date" className="my-auto">
              {dateEditable ? (
                <button
                  onClick={save}
                  className="text-sm  mb-10 sm:mb-0 font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500">
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
          {data.time&&data.date!=="ASAP" &&<div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl">
            <div className="col-span-1 my-auto text-3xl text-gray-800">
              {" "}
              <div className={data.time ? completed : uncompleted}>
                {data.time ? <FaCheck className="float-right text-sm" /> : ""}
                <BsClockFill />
              </div>
            </div>
            <div className="col-span-2 pt-1">
              <p className="font-bold text-gray-800 lg:text-sm">Pickup time</p>
              {timeEditable ? (
                <input
                  className=" w-auto  flex grow border-0 rounded-md flex-1 appearance-none focus-ring-full py-2 px-4 bg-gray-50 text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none ring-2 focus:ring-2 focus:ring-sky-600"
                  type="time"
                  min={now}
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              ) : (
                <p className={`text-sm text-gray-500`}>
                  {data.time}
                </p>
              )}
            </div>

            <div id="time" className="my-auto">
              {timeEditable ? (
                <button
                  onClick={save}
                  className="text-sm mb-10 sm:mb-0 font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500">
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
          </div>}
          {data.flight_monitoring&&
            <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl">
              <div className="col-span-1 my-auto text-3xl text-gray-800">
                {" "}
                <div className={data.flight_number ? completed : uncompleted}>
                  {data.flight_number ? (
                    <FaCheck className="float-right text-sm" />
                  ) : (
                    ""
                  )}
                  <FaPlaneDeparture />
                </div>
              </div>
              <div className="col-span-2 pt-1">
                <p className="font-bold text-gray-800 lg:text-sm">Flight Monitoring</p>
                {data.flight_number ? (
                  <p className={`text-sm text-gray-500`}>{data.flight_number}</p>
                ) : (
                  <p className="text-sm text-gray-500">You haven't provided any flight details.</p>
                )}
              </div>

              <div className="my-auto">
                <a className="text-sm font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500"></a>
              </div>
            </div>
          }
          {data.luggage!=="0"&&
            <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl">
              <div className="col-span-1 my-auto text-3xl text-gray-800">
                {" "}
                <div className={data.luggage ? completed : uncompleted}>
                  {data.luggage? (
                    <FaCheck className="float-right text-sm" />
                  ) : (
                    ""
                  )}
                  <FaSuitcase />
                </div>
              </div>
              <div className="col-span-2 pt-1">
                <p className="font-bold text-gray-800 lg:text-sm">Luggage</p>
                
                  <p className={`text-sm text-gray-500`}>{data.luggage} (small)</p>
               
              </div>

              <div className="my-auto">
                <a className="text-sm font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500"></a>
              </div>
            </div>
          }
          {
            <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl">
              <div className="col-span-1 my-auto text-3xl text-gray-800">
                {" "}
                <div className={data.service ? completed : uncompleted}>
                  {data.service ? (
                    <FaCheck className="float-right text-sm" />
                  ) : (
                    ""
                  )}
                  <FaTaxi />
                </div>
              </div>
              <div className="col-span-2 pt-1">
                <p className="font-bold text-gray-800 lg:text-sm">Service</p>
                {data.service ? (
                  <p className={`text-sm text-gray-500`}>{data.service}</p>
                ) : (
                  <p className="text-sm text-pink-400">Required</p>
                )}
              </div>

              <div className="my-auto">
                <a className="text-sm font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500"></a>
              </div>
            </div>
          }
          {
            <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl">
              <div className="col-span-1 my-auto text-3xl text-gray-800">
                {" "}
                <div
                  className={
                    
                    data.first_name &&data.last_name&& data.email && data.phone
                      ? completed
                      : uncompleted
                  }>
                  {data.first_name &&data.last_name&& data.email && data.phone ? (
                    <FaCheck className="float-right text-sm" />
                  ) : (
                    ""
                  )}
                  <BsFillPersonFill />
                </div>
              </div>
              <div className="col-span-2 pt-1">
                <p className="font-bold text-gray-800 lg:text-sm">
                  Passenger details
                </p>
               
                {data.first_name &&data.last_name&& data.email && data.phone ? (
                  <>
                    <p className={`text-sm text-gray-500`}>{data.first_name}{" "}{data.last_name}</p>
                    <p className={`text-sm text-gray-500`}>{data.email}</p>
                    <p className={`text-sm text-gray-500`}>{data.phone}</p>
                  </>
                ) : (
                  <p className="text-sm text-pink-400">Required</p>
                )}
              </div>

              <div className="my-auto">
                <a className="text-sm font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500"></a>
              </div>
            </div>
          }
          {
            <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl">
              <div className="col-span-1 my-auto text-3xl text-gray-800">
                {" "}
                <div className={data.payment ? completed : uncompleted}>
                  {data.payment ? (
                    <FaCheck className="float-right text-sm" />
                  ) : (
                    ""
                  )}
                  <FaCreditCard />
                </div>
              </div>
              <div className="col-span-2 pt-1">
                <p className="font-bold text-gray-800 lg:text-sm">
                  Payment Method
                </p>
                {data.payment ? (
                  <p className={`text-sm text-gray-500`}>{data.payment}</p>
                ) : (
                  <p className="text-sm text-pink-400">Required</p>
                )}
              </div>

              <div className="my-auto">
                <a className="text-sm font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500"></a>
              </div>
            </div>
          }
          { data.return_location &&
            <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 bg-gray-200 rounded-2xl">
              <div className="col-span-1 my-auto text-3xl text-gray-800">
                {" "}
                <div className={data.service ? completed : uncompleted}>
                  {data.service ? (
                    <FaCheck className="float-right text-sm" />
                  ) : (
                    ""
                  )}
                  <FaTaxi />
                </div>
              </div>
              <div className="col-span-2 pt-1">
                <p className="font-bold text-gray-800 lg:text-sm">Service</p>
                {data.service ? (
                  <p className={`text-sm text-gray-500`}>{data.service}</p>
                ) : (
                  <p className="text-sm text-pink-400">Required</p>
                )}
              </div>

              <div className="my-auto">
                <a className="text-sm font-bold text-indigo-700 underline hover:no-underline hover:text-indigo-500"></a>
              </div>
            </div>
          }
          </>}

          {returnTabActive &&
          <ReturnSummary />}
          <div className="grid grid-cols-4 gap-2 p-4 px-4 m-auto mt-5 w-5/6 rounded-2xl bg-gray-100/25">
            <div className="col-span-1 my-auto text-3xl font-medium text-gray-800">
              {" "}
              Total:{" "}
              <hr className="h-[0.12rem] mt-1 bg-gray-400 absolute w-3/4" />
            </div>
            <div className="col-span-2 pt-1">
              <p className="font-bold text-gray-800 lg:text-sm"></p>
              <p className={`text-sm text-gray-500`}></p>
            </div>

            <div className="my-auto text-3xl">
              <a className="text-3xl text-gray-500">
                £
                {props.price === undefined || props.price === NaN
                  ? "loading.."
                  : props.price}
              </a>
            </div>
          </div>
          <div className="h-10"></div>
          <button
            onClick={props.onClick}
            disabled={props.disabled}
            className="hidden justify-center p-4 m-auto w-5/6 text-3xl font-medium text-gray-50 bg-sky-500 rounded-lg lg:flex h-max disabled:bg-gray-400">
            Book Now
          </button>
          <div className="h-10"></div>
        </div>
      </div>
    </div>
  );
}
