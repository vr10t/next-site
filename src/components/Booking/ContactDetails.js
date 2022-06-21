import { useState, useEffect, useRef, useCallback } from "react";
import * as Yup from "yup";
import { Field, Formik, useFormik, Form } from "formik";
import PhoneInput, {
  formatPhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill";
import { useAppContext } from "../../context/state";
import { Checkbox } from "flowbite-react";
import ReturnContact from "./ReturnContact";
import {throttle} from "throttle-debounce"

export default function ContactDetails(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [showReturnDetails, setShowReturnDetails] = useState(false);
  const { data, setData } = useAppContext();
 
 
  useEffect(() => {
    data.first_name = firstName;
    data.last_name = lastName;
    data.email = email;
    data.phone = phone;
    console.log(data, "FORMDATAAAA");
    console.log("setting data");
    setData(data);
  }, [firstName, lastName, email, phone]);
  function handlePhoneError() {
    setPhoneError("");

    if (!phone) {
      setPhoneError("Phone number is required");
    }
    if (phone) {
      console.log(isPossiblePhoneNumber(phone), "IS IT UNDEFINED");
      if (isPossiblePhoneNumber(phone) === false) {
        setPhoneError("Invalid phone number");
      } else {
        console.log(phone);
        setPhoneError("");
      }
    }
  }
  function handleCheckboxClick(e) {
    if (e.target.id === "different_return_details") {
      if (e.target.checked) {
        setShowReturnDetails(true);
      } else {
        setShowReturnDetails(false);
        data.return_first_name = null;
        data.return_last_name = null;
        data.return_email = null;
        data.return_phone = null;
        console.log("setting data");
        setData(data);
      }
    }
  }
  function handleFormChange(values,errors){
    setFirstName(values.firstName);
    setLastName(values.lastName);
    setEmail(values.email);
    useEffect(()=>{
      if(errors&&Object.keys(errors).length>0){
        data.canSubmit=false
        setData(data)
      }
      if(errors&&Object.keys(errors).length===0){
        data.canSubmit=true
        setData(data)
      }
      if(errors&&Object.keys(errors).length===1){
        data.canSubmit=false
        setData(data)
      }
    },[Object.keys(errors).length])
    console.log(Object.keys(errors).length,"errors is not empty");
    // if(Object.keys(errors).length>0){
    //   console.log("THROTTLING")
    //   data.canSubmit=false
    //  throttle(2000,) 
    //   console.log(errors," errors setting data",data.canSubmit);
    // }
    // else{
    //   data.canSubmit=true
    // }
  }
  return (
    <div >
      <p className="text-gray-600 font-medium py-2  uppercase">
        Contact Information
      </p>
<Formik
 initialValues= {{
        firstName: "",
        lastName: "",
        email: "",}
      }
      validationSchema= {Yup.object().shape({
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
      })}
 >
{({
            setFieldValue,
            setFieldTouched,
            values,
            errors,
            touched,
          }) => (
      <Form onChange={handleFormChange(values,errors)} className="flex flex-col ">

        <label
          htmlFor="firstName"
          className="text-gray-900 pb-2 text-base font-medium">
          First Name
        </label>
        <div className="flex relative mb-2 w-full shadow-sm">
          <span className="inline-flex items-center px-3 text-lg text-gray-600 bg-gray-50 rounded-l-md border-r-2 shadow-sm h">
            <BsFillPersonFill className="z-[2]" />
          </span>

          <Field
            // {...getFieldProps("firstName")}
            // onChange={(e)=>console.log(e)}
            // value={formik.values.firstName}

            name="firstName"
            type="text"
            id="firstName"
            className={`flex-1  px-4 py-2 w-full text-base placeholder-gray-400 text-gray-600 bg-gray-50 rounded-r-lg border-0 shadow-sm appearance-none focus:outline-none focus:ring-2 ${
              errors.firstName && touched.firstName
                ? "focus:ring-pink-400 "
                : "focus:ring-sky-500"
            }`}
            placeholder="Your first name"
          />
          {errors.firstName && touched.firstName && (
            <div className="absolute w-full h-full text-sm font-medium text-pink-500 rounded-lg ring-2 ring-pink-400 pointer-events-none">
              <p className="relative left-1 -top-3 px-2 w-max bg-gray-50">
                {errors.firstName}
              </p>
            </div>
          )}
        </div>
        <label
          htmlFor="lastName"
          className="text-gray-900 pb-2 text-base font-medium">
          Last Name
        </label>
        <div className="flex relative mb-2 w-full shadow-sm">
          <span className="inline-flex items-center px-3 text-lg text-gray-600 bg-gray-50 rounded-l-md border-r-2 shadow-sm h">
            <BsFillPersonFill className="z-[2]" />
          </span>

          <Field
            // {...getFieldProps("lastName")}
            // onChange={formik.handleChange}
            // value={formik.values.lastName}
            name="lastName"
            type="text"
            id="lastName"
            className={`flex-1 px-4 py-2 w-full text-base placeholder-gray-400 text-gray-600 bg-gray-50 rounded-r-lg border-0 shadow-sm appearance-none focus:outline-none focus:ring-2 ${
              errors.lastName && touched.lastName
                ? "focus:ring-pink-400 "
                : "focus:ring-sky-500"
            }`}
            placeholder="Your last name"
          />
          {errors.lastName && touched.lastName && (
            <div className="absolute w-full h-full text-sm font-medium text-pink-500 rounded-lg ring-2 ring-pink-400 pointer-events-none">
              <p className="relative left-1 -top-3 px-2 w-max bg-gray-50">
                {errors.lastName}
              </p>
            </div>
          )}
        </div>
        <label
          htmlFor="email"
          className="text-gray-900 pb-2 text-base font-medium">
          Email Address
        </label>
        <div className="flex relative mb-2 w-full shadow-sm">
          <span className="inline-flex items-center px-3 text-lg text-gray-600 bg-gray-50 rounded-l-md border-r-2 shadow-sm h">
            <FaEnvelope className="z-[2]" />
          </span>

          <Field
            // {...getFieldProps("email")}
            //   onChange={formik.handleChange}
            //  value={formik.values.email}
            name="email"
            type="email"
            id="email"
            className={`flex-1 px-4 py-2 w-full text-base placeholder-gray-400 text-gray-600 bg-gray-50 rounded-r-lg border-0 shadow-sm appearance-none focus:outline-none focus:ring-2 ${
              errors.email && touched.email
                ? "focus:ring-pink-400 "
                : "focus:ring-sky-500"
            }`}
            placeholder="Your email address"
          />
          {errors.email && touched.email && (
            <div className="absolute w-full h-full text-sm font-medium text-pink-500 rounded-lg ring-2 ring-pink-400 pointer-events-none">
              <p className="relative left-1 -top-3 px-2 w-max bg-gray-50">
                {errors.email}
              </p>
            </div>
          )}
        </div>
        </Form>)}
        </Formik>
        <label
          htmlFor="phone"
          className="text-gray-900 pb-2 text-base font-medium">
          Phone
        </label>
        <div className="flex relative my-2  w-full shadow-sm">
          <PhoneInput
            // {...getFieldProps("phone")}
            name="phone"
            id="phone"
            className={`inline-flex items-center pl-2 w-full text-lg text-gray-900  bg-gray-50 rounded-lg border-r-2 shadow-sm appearance-none focus:outline-none focus:ring-2`}
            defaultCountry="GB"
            initialValueFormat="national"
            useNationalFormatForDefaultCountryValue={true}
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
        <div className="flex py-2 items-center justify-between">
          <div className="gap-1 items-center flex">
            <Checkbox
              onClick={handleCheckboxClick}
              id="different_return_details"
            />
            <label
              className="self-center text-base text-gray-900 "
              htmlFor="different_return_details">
              Different contact information on return?
            </label>
          </div>
        </div>
     
      {showReturnDetails && <ReturnContact />}
    </div>
  );
}
