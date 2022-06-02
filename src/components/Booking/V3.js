import React, { useCallback } from "react";
import { useRef } from "react";
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
    date: Yup.string().required("Date of Birth is required"),

    time: Yup.string().required("Email is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  function onSubmit(e) {
    JSON.stringify(e, null, 4);
    let formData = e;
    Object.assign(formData, { location: origin, destination: destination });

    setData(formData), console.log(formData);
    window.localStorage.removeItem("BOOKING_DATA");
    router.push("/booking");
    return false;
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
  function revealPosition(e) {
    console.log(e);
  }
  function handlePermission() {
    // navigator.permissions
    //   .query({ name: "geolocation" })
    //   .then(function (result) {
    //     if (result.state == "granted") {
    //       report(result.state);
    //     } else if (result.state == "prompt") {
    //       report(result.state);

    //       navigator.geolocation.getCurrentPosition(revealPosition);
    //     } else if (result.state == "denied") {
    //       report(result.state);
    //     }
    //     result.addEventListener("change", function () {
    //       report(result.state);
    //     });
    //   });
  }

  function report(state) {
    console.log("Permission " + state);
  }
  // useEffect(() => {
  //   handlePermission();
  // }, []);

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
                  <div>
                    <input
                      {...register("location")}
                      {...getInputProps({
                        id: "location",
                        className:
                          "truncate w-[72vw] flex grow border-0 rounded-r-md flex-1 appearance-none focus-ring-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-500 shadosm text-base focus:outline-none focus:ring-2 focus:ring-sky-100",
                        name: "location",
                        type: "text",
                        required: true,
                        placeholder: "From...",
                      })}
                    />

                    <div className="absolute bg-gray-50 max max-xs ">
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
                        let key = suggestion.value;
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
            <span className="inline-flex relative text-gray-700 w-6 right-8 my-3  ">
            <button onClick={getLocation}>
              <FaCrosshairs />
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
                        className: `${styles.places} relative grow truncate  border-0 rounded-r-md flex-1 appearance-none focus-ring-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-500 shado-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-100`,
                        name: "destination",
                        type: "text",
                        required: true,
                        placeholder: "To...",
                      })}
                    />
                    <div className="absolute bg-gray-50    ">
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
          <div className="grid grid-cols-5 justify-between gap-2 min-w-[72vw] max-w-[72vw]">
            <div className="flex flex-row col-span-3 rounded-lg  w-full border-1 border-gray-900">
              {" "}
              <span className="inline-flex  rounded-l-md  items-center px-3  bg-sky-100  text-gray-700 shadow-sm text-lg">
                <label htmlFor="date" className="sr-only ">
                  From
                </label>
                <BsCalendarFill />
              </span>
              <input
                {...register("date")}
                id="date"
                className=" border-0 rounded-r-md flex-1 appearance-none focus-ring-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-cyan-600"
                name="date"
                required={true}
                type="date"
                placeholder={today}
                defaultValue={today}
              />
            </div>
            <div className="flex flex-row rounded-lg xs:mx-auto col-start-6  ">
              <span className="inline-flex border-x-2  rounded-l-md  items-center px-3  bg-sky-100  text-gray-700 shadow-sm text-lg">
                <label htmlFor="time" className="sr-only ">
                  Time
                </label>
                <BsClockFill />
              </span>
              <input
                {...register("time")}
                id="time"
                className=" border-0 max-w-fit rounded-r-md appearance-none focus-ring-full  py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-cyan-600"
                name="time"
                required={true}
                type="time"
                placeholder=""
                defaultValue=""
              />
            </div>
          </div>
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
