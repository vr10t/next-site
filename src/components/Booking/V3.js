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
import { Tooltip } from "flowbite-react";
import {FaArrowRight} from "@react-icons/all-files/fa/FaArrowRight"
import {handleGetDistance} from "../../../utils/google-helpers"
import {throttle} from "throttle-debounce"

const PlacesAutocomplete = dynamic(() => import("react-places-autocomplete"));
// const HCaptcha = dynamic(() => import("@hcaptcha/react-hcaptcha"));

const Form = () => {
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    version: "weekly",
    libraries: ["places"],
  });
  loader.load().then(() => {
    setMapsLoaded(true);
  });
  const { data, setData } = useAppContext();
  useCallback(() => {}, [onSubmit]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [travelDate,setTravelDate]=useState("ASAP")
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

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

    
  });
  
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  function onSubmit(e) {
    JSON.stringify(e, null, 4);
    let formData = e;
    Object.assign(formData, { location: origin, destination: destination });

    setData(formData);
    console.log(data);
    window.localStorage.removeItem("BOOKING_DATA");
    // router.push("/booking");
    return false;
  }
  useEffect(()=>{
    setData(data)
    handleChangeOrSelect()
    
    setTimeout(() => {
      console.log(data)
    }, 1000);
    

  },[origin,destination])
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
      console.log(`incorrect location or destination`)
    }
  }
  function debounce(func, wait, immediate) {
    // 'private' variable for instance
    // The returned function will be able to reference this due to closure.
    // Each call to the returned function will share this common timer.
    var timeout;
  
    // Calling debounce returns a new anonymous function
    return function() {
      // reference the context and args for the setTimeout function
      let context = this,
        args = arguments;
  
      // Should the function be called now? If immediate is true
      //   and not already in a timeout then the answer is: Yes
      let callNow = immediate && !timeout;
  
      // This is the basic debounce behaviour where you can call this 
      //   function several times, but it will only execute once 
      //   [before or after imposing a delay]. 
      //   Each time the returned function is called, the timer starts over.
      clearTimeout(timeout);
  
      // Set the new timeout
      timeout = setTimeout(function() {
  
        // Inside the timeout function, clear the timeout variable
        // which will let the next execution run when in 'immediate' mode
        timeout = null;
  
        // Check if the function already ran with the immediate flag
        if (!immediate) {
          // Call the original function with apply
          // apply lets you define the 'this' object as well as the arguments 
          //    (both captured before setTimeout)
          func.apply(context, args);
        }
      }, wait);
  
      // Immediate mode and no wait timer? Execute the function..
      if (callNow) func.apply(context, args);
    }
  }
  const debounceHandleGetDistance = throttle(2000,handleGetDistance)
  const handleChangeOrigin = (e) => {
    setOrigin(e)
    data.location=origin
    setData(data)
    console.log(data.location)
    handleChangeOrSelect()
  };
  
  function handleChangeOrSelect(){
    console.log(origin,destination)
    if(data.location !=undefined&&data.destination!=undefined){
     debounceHandleGetDistance(origin, destination, callback)
    }
  }
  const handleSelectOrigin = (e) => {
    // geocodeByAddress(e)
    //   .then((results) => getLatLng(results[0]))
    //   .then((latLng) => {
    //     console.log("Success", latLng);
    //   })
    //   .catch((error) => console.error("Error", error));
    setOrigin(e);
    data.location=origin
    console.log(origin);
    setData(data)
    
  };
  const handleChangeDestination = (e) => {
    setDestination(e)
    data.destination=destination
    setData(data)
   
  };
  const handleSelectDestination = (e) => {
    // geocodeByAddress(e)
    //   .then((results) => getLatLng(results[0]))
    //   .then((latLng) => {
    //     console.log("Success", latLng);
    //   })
    //   .catch((error) => console.error("Error", error));
    setDestination(e);
    data.destination=destination
    console.log(data)
    setData(data)
   
  };
  function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  function showPosition(position) {
    console.log(
      "Latitude: " +
        position.coords.latitude +
        "<br>Longitude: " +
        position.coords.longitude
    );
    reverseGeocode(position.coords.latitude, position.coords.longitude);
  }
  async function reverseGeocode(lat, long) {
    try {
      let res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
      );
      let data = await res.json();
      console.log(data.results[0].formatted_address);
      setOrigin(data.results[0].formatted_address);
    } catch (err) {
      alert(err.message);
    }
  }
  
  
  

  return (
    <div className="relative  z-[9]  justify-center xs:mx-auto mx-1 w-full bg-none py-4 ">
      {/* {mapsLoaded && <Map>asasa </Map>} */}
      <form id="booking" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 max-screen-xs xs:mx-auto mx-3 w-5/6  lg:[28rem] lg:max-lg min-max ">
          <div className="flex flex-row rounded-lg xs:mx-auto  grow w-full  ">
            {" "}
            <span className="inline-flex  rounded-l-md  items-center px-3  bg-sky-100  text-gray-700 shadosm text-lg">
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
               
                searchOptions={{ componentRestrictions: { country: "gb" } }}>
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div >
                    <input 
                      {...register("location")}
                      {...getInputProps({
                        
                        id: "location",
                        className:
                          "truncate w-[72vw]  flex grow border-0 rounded-r-md flex-1 appearance-none focus-ring-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-500 shadosm text-base focus:outline-none focus:ring-2 focus:ring-sky-100",
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
                <FaCrosshairs /></Tooltip>
              </button> 
            </span>
          </div>

          <div className="flex flex-row rounded-lg xs:mx-auto w-full border-1 border-gray-900">
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
                searchOptions={{ componentRestrictions: { country: "gb" } }}>
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                  
                    <input
                      {...register("destination")}
                      {...getInputProps({
                        id: "destination",
                        className: `${styles.places}  relative grow  border-0 rounded-r-md flex-1 appearance-none focus-ring-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-500 shado-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-100`,
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
                            let key = suggestion.id;
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style, key
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
          </div>

          <div className="flex flex-row rounded-lg  border-1 border-gray-900">
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
              className="  flex max-w-[72vw] min-w-[72vw]  border-0 rounded-r-md flex-1 appearance-none focus-ring-full  py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-cyan-600"
              name="passengers"
              required={true}
              type="number"
              placeholder="Passengers"
              min="1"
              max="16"
            />
          </div>

          <div className="flex justify-between gap-2 w-full  max-w-96">
            <div className="flex flex-row col-span-3 rounded-lg  w-full border-1 border-gray-900">
              {" "}
              <span className="inline-flex  rounded-l-md  items-center px-3  bg-sky-100  text-gray-700 shadow-sm text-lg">
                <label htmlFor="date" className="sr-only ">
                  
                </label>
                <BsCalendarFill />
              </span>
              <select {...register("date")} onChange={(e)=>setTravelDate(e.target.value)} className=" border-0 rounded-r-md flex-1 appearance-none focus-ring-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-cyan-600" defaultValue="ASAP">
                <option  value="ASAP">ASAP</option>
                <option value="Later">Later</option>
              </select>
              
            </div>
          </div>
          {travelDate=="Later"&&<div className="flex justify-between gap-2 w-full  max-w-96">
            <div className="flex flex-row col-span-3 rounded-lg  w-full border-1 border-gray-900">
              {" "}
              <span className="inline-flex  rounded-l-md  items-center px-3  bg-sky-100  text-gray-700 shadow-sm text-lg">
              <FaArrowRight /></span>
              <input
                {...register("date")}
                id="date"
                className=" border-0 rounded-r-md flex-1 appearance-none focus-ring-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-cyan-600"
                name="date"
                // required={true}
                type="datetime-local"
                
              />
              </div></div>}
          <div className="flex flex-row rounded-lg mx-1 w-full">
            <button
              type="submit"
              className="  lg:max-lg shadosm py-2 px-4 xs:mx-auto mx-1 w-full 80  rounded-full bg-sky-500 text-stone-50 text-xl   font-bold transition-all duration-1000 ease-in-out  ">
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Form;
