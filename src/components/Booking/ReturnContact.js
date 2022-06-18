import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import PhoneInput, {
  formatPhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill";
import { useAppContext } from "../../context/state";
import {Checkbox} from "flowbite-react"

export default function ReturnContact() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [showReturnDetails,setShowReturnDetails]=useState(false)
    const {data, setData}= useAppContext()
    useEffect(() => {
        data.return_first_name = firstName;
        data.return_last_name = lastName;
        data.return_email = email;
        data.return_phone = phone;
        
        setData(data);
      }, [
       firstName,lastName,email,phone
      ]);

  const { getFieldProps, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      returnFirstName: "",
      returnLastName: "",
      returnEmail: "",
    },
    validationSchema: Yup.object().shape({
      returnFirstName: Yup.string()
        .required("Name is required")
        .min(2, "Name is too short")
        .max(50, "Name is too long")
        .matches(
          /^[A-z]+(([',. [a-z ][A-Z ])?[-]?[a-zA-Z]*)*$/,
          "Name must not contain invalid characters"
        ),

      returnLastName: Yup.string()
        .required("Name is required")
        .min(2, "Name is too short")
        .max(50, "Name is too long")
        .matches(
          /^[A-z]+(([',. [a-z ][A-Z ])?[-]?[a-zA-Z]*)*$/,
          "Name must not contain invalid characters"
        ),

      returnEmail: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
      returnacceptTerms: Yup.bool().oneOf([true], "Accept Ts & Cs is required"),
    }),
    onSubmit: (values) => {
      // same shape as initial values
      setFirstName(values.returnFirstName);
      setLastName(values.returnLastName);
      setEmail(values.returnEmail);
    },
  });

  function handlePhoneError() {
    setPhoneError(null);

    if (!phone) {
      setPhoneError("Phone number is required");
    }
    if (phone) {
      console.log(isPossiblePhoneNumber(phone), "IS IT UNDEFINED");
      if (isPossiblePhoneNumber(phone) === false) {
        setPhoneError("Invalid phone number");
      } else {
        console.log(phone);
        setPhoneError(null);
      }
    }
  }
  return (
      <>
       <p className="text-gray-600 font-medium py-2 uppercase">Return Details</p>
    <form onBlur={handleSubmit} className="flex flex-col "> 
    <label htmlFor="returnFirstName" className="text-gray-900 text-base font-medium">
          First Name
        </label>
      <div className="flex relative mb-2 w-full shadow-sm">
        <span className="inline-flex items-center px-3 text-lg text-gray-600 bg-gray-50 rounded-l-md border-r-2 shadow-sm h">
          <BsFillPersonFill className="z-[2]" />
        </span>
       
        <input
          {...getFieldProps("returnFirstName")}
          // onChange={formik.handleChange}
          // value={formik.values.firstName}

          name="returnFirstName"
          type="text"
          id="returnFirstName"
          className={`flex-1  px-4 py-2 w-full text-base placeholder-gray-400 text-gray-600 bg-gray-50 rounded-r-lg border-0 shadow-sm appearance-none focus:outline-none focus:ring-2 ${
            errors.returnFirstName && touched.returnFirstName
              ? "focus:ring-pink-400 "
              : "focus:ring-sky-500"
          }`}
          placeholder="Your first name"
        />
        {errors.returnFirstName && touched.returnFirstName && (
          <div className="absolute w-full h-full text-sm font-medium text-pink-500 rounded-lg ring-2 ring-pink-400 pointer-events-none">
            <p className="relative left-1 -top-3 px-2 w-max bg-gray-50">
              {errors.returnFirstName}
            </p>
          </div>
        )}
      </div>
<label htmlFor="returnLastName" className="text-gray-900 text-base font-medium">
          Last Name
        </label>
      <div className="flex relative mb-2 w-full shadow-sm">
        <span className="inline-flex items-center px-3 text-lg text-gray-600 bg-gray-50 rounded-l-md border-r-2 shadow-sm h">
          <BsFillPersonFill className="z-[2]" />
        </span>
        
        <input
          {...getFieldProps("returnLastName")}
          // onChange={formik.handleChange}
          // value={formik.values.lastName}
          name="returnLastName"
          type="text"
          id="returnLastName"
          className={`flex-1 px-4 py-2 w-full text-base placeholder-gray-400 text-gray-600 bg-gray-50 rounded-r-lg border-0 shadow-sm appearance-none focus:outline-none focus:ring-2 ${
            errors.returnLastName && touched.returnLastName
              ? "focus:ring-pink-400 "
              : "focus:ring-sky-500"
          }`}
          placeholder="Your last name"
        />
        {errors.returnLastName && touched.returnLastName && (
          <div className="absolute w-full h-full text-sm font-medium text-pink-500 rounded-lg ring-2 ring-pink-400 pointer-events-none">
            <p className="relative left-1 -top-3 px-2 w-max bg-gray-50">
              {errors.returnLastName}
            </p>
          </div>
        )}
      </div>
<label htmlFor="returnEmail" className="text-gray-900 text-base font-medium">
          Email Address
        </label>
      <div className="flex relative mb-2 w-full shadow-sm">
        <span className="inline-flex items-center px-3 text-lg text-gray-600 bg-gray-50 rounded-l-md border-r-2 shadow-sm h">
          <FaEnvelope className="z-[2]" />
        </span>
        
        <input
          {...getFieldProps("returnEmail")}
          //   onChange={formik.handleChange}
          //  value={formik.values.email}
          name="returnEmail"
          type="email"
          id="returnEmail"
          className={`flex-1 px-4 py-2 w-full text-base placeholder-gray-400 text-gray-600 bg-gray-50 rounded-r-lg border-0 shadow-sm appearance-none focus:outline-none focus:ring-2 ${
            errors.returnEmail && touched.returnEmail
              ? "focus:ring-pink-400 "
              : "focus:ring-sky-500"
          }`}
          placeholder="Your email address"
        />
        {errors.returnEmail && touched.returnEmail && (
          <div className="absolute w-full h-full text-sm font-medium text-pink-500 rounded-lg ring-2 ring-pink-400 pointer-events-none">
            <p className="relative left-1 -top-3 px-2 w-max bg-gray-50">
              {errors.returnEmail}
            </p>
          </div>
        )}
      </div>
      <label htmlFor="returnPhone" className="text-gray-900 text-base font-medium">
          Phone
        </label>
      <div className="flex relative mb-2 w-full shadow-sm">
        <PhoneInput
          // {...getFieldProps("phone")}
          name="returnPhone"
          id="returnPhone"
          className={`inline-flex items-center pl-2 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border-r-2 shadow-sm appearance-none focus:outline-none focus:ring-2`}
          defaultCountry="GB"
          initialValueFormat="national"
          useNationalFormatForDefaultCountryValue
          placeholder="Your phone number"
          value={phone}
          error={phoneError}
          onChange={setPhone}
          onBlur={handlePhoneError}
        />
        {phoneError && (
          <div className="absolute pointer-events-none w-full h-full -left-[1px] text-sm font-medium text-pink-500 rounded-lg  ring-[2px] ring-pink-400">
            <p className="relative left-1 -top-3 px-2 w-max bg-gray-50">
              {phoneError}
            </p>
          </div>
        )}
      </div>
     
    </form></>
  );
}
