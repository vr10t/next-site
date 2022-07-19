import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAppContext } from "../../context/state";

export default function FlightMonitoring() {
  const [planeArrivingFrom, setPlaneArrivingFrom] = useState("");
  const [airlineName, setAirlineName] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
 const { data,setData}= useAppContext()
  useEffect(()=>{
data.plane_arriving_from=planeArrivingFrom
data.airline_name=airlineName
data.flight_number=flightNumber
setData(data)
  },[planeArrivingFrom,airlineName,flightNumber])
  const { getFieldProps, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      plane_arriving_from: "",
      airline_name: "",
      flight_number: "",
    },
    validationSchema: Yup.object().shape({
      plane_arriving_from: Yup.string().required(
        "Please enter the name of the airport from where the plane is arriving"
      ),
      airline_name: Yup.string().required("Airline name is required"),
      flight_number: Yup.string().required("Please enter the flight number (e.g. RYR 1234)"),
    }),
    onSubmit: (values) => {
      // same shape as initial values
      setPlaneArrivingFrom(values.plane_arriving_from);
      setAirlineName(values.airline_name);
      setFlightNumber(values.flight_number);
    },
  });

  return (
    <div onBlur={handleSubmit}>
      <div className="flex items-stretch w-full text-lg font-medium tracking-wider text-gray-600 bg-gray-100">
        <p className="grow"> FLIGHT DETAILS</p>
      </div>
      <label
        htmlFor="plane_arriving_from"
        className="text-gray-900 font-medium">
        Plane Arriving From
      </label>
      {errors.plane_arriving_from && touched.plane_arriving_from && (
        <p className="pointer-events-none  text-sm pb-2 text-pink-500">
          {errors.plane_arriving_from}
        </p>
      )}
      <div className="flex relative mb-2 w-full shadow-sm">
        <input
          {...getFieldProps("plane_arriving_from")}
          name="plane_arriving_from"
          type="text"
          id="plane_arriving_from"
          className={`flex-1  px-4 py-2 w-full text-base placeholder-gray-400 text-gray-600 bg-gray-50 rounded-lg border-0 shadow-sm appearance-none focus:outline-none focus:ring-2 ${
            errors.plane_arriving_from && touched.plane_arriving_from
              ? "focus:ring-pink-400 "
              : "focus:ring-sky-500"
          }`}
          placeholder="Airport Name"
        />
        {errors.plane_arriving_from && touched.plane_arriving_from && (
          <div className="absolute pointer-events-none  w-full h-full text-sm font-medium text-pink-500 rounded-lg ring-2 ring-pink-400" />
        )}
      </div>

      <label
        htmlFor="plane_arriving_from"
        className="text-gray-900 font-medium">
        Airline Name
      </label>
      {errors.airline_name && touched.airline_name && (
        <p className="pointer-events-none  text-sm pb-2 text-pink-500">
          {errors.airline_name}
        </p>
      )}
      <div className="flex relative mb-2 w-full shadow-sm">
        <input
          {...getFieldProps("airline_name")}
          name="airline_name"
          type="text"
          id="airline_name"
          className={`flex-1  px-4 py-2 w-full text-base placeholder-gray-400 text-gray-600 bg-gray-50 rounded-lg border-0 shadow-sm appearance-none focus:outline-none focus:ring-2 ${
            errors.airline_name && touched.airline_name
              ? "focus:ring-pink-400 "
              : "focus:ring-sky-500"
          }`}
          placeholder="e.g. Ryanair"
        />
        {errors.airline_name && touched.airline_name && (
          <div className="absolute pointer-events-none  w-full h-full text-sm font-medium text-pink-500 rounded-lg ring-2 ring-pink-400" />
        )}
      </div>

      <div>
      <label
        htmlFor="plane_arriving_from"
        className="text-gray-900 font-medium">
        Flight Number
      </label>
      {errors.flight_number && touched.flight_number && (
        <p className="pointer-events-none  text-sm pb-2 text-pink-500">
          {errors.flight_number}
        </p>
      )}
      <div className="flex relative mb-2 w-full shadow-sm">
        <input
          {...getFieldProps("flight_number")}
          name="flight_number"
          type="text"
          id="flight_number"
          className={`flex-1  px-4 py-2 w-full text-base placeholder-gray-400 text-gray-600 bg-gray-50 rounded-lg border-0 shadow-sm appearance-none focus:outline-none focus:ring-2 ${
            errors.flight_number && touched.flight_number
              ? "focus:ring-pink-400 "
              : "focus:ring-sky-500"
          }`}
          placeholder="e.g. RYR 1234"
        />
        {errors.flight_number && touched.flight_number && (
          <div className="absolute pointer-events-none  w-full h-full text-sm font-medium text-pink-500 rounded-lg ring-2 ring-pink-400" />
        )}
      </div>
      </div>
    </div>
  );
}
