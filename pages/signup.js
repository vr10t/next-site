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
// import { useAppContext } from "../../context/state";
import Image from "next/image";


export default function SignUp(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [showReturnDetails, setShowReturnDetails] = useState(false);
//   const { data, setData } = useAppContext();
 
 
  useEffect(() => {
   
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
  
  function handleFormChange(values,errors){
    setFirstName(values.firstName);
    setLastName(values.lastName);
    setEmail(values.email);
    // useEffect(()=>{
    //   if(errors&&Object.keys(errors).length>0){
    //     data.canSubmit=false
    //     setData(data)
    //   }
    //   if(errors&&Object.keys(errors).length===0){
    //     data.canSubmit=true
    //     setData(data)
    //   }
    //   if(errors&&Object.keys(errors).length===1){
    //     data.canSubmit=false
    //     setData(data)
    //   }
    // },[Object.keys(errors).length])
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
  return (<><div className="z-[-20] h-sc bg-gray-50"><Image src={"/spiral.png"} layout="fill" /></div>
      <div className="flex bg-gray-200 justify-center">
      
      
    <div className="flex z-20 flex-col  h-3/4 my-8 w-full max-w-md px-4 py-8 bg-gray-100 rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
                <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl ">
                  Login
                </div>
                <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    target="_blank"
                    className="text-sm text-blue-500 underline hover:text-blue-700">
                    Sign up
                  </a>
                </span>
                <div className="mt-8">
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
          <span className="inline-flex items-center px-3 text-lg text-gray-50 bg-sky-500 rounded-l-md border-r-2 shadow-sm h">
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
          <span className="inline-flex items-center px-3 text-lg text-gray-50 bg-sky-500 rounded-l-md border-r-2 shadow-sm h">
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
          <span className="inline-flex items-center px-3 text-lg text-gray-50 bg-sky-500 rounded-l-md border-r-2 shadow-sm h">
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
        <div className="flex justify-center py-4 w-full">
                      <button
                       
                        type="submit"
                        className=" w-1/2 h-10 bg-sky-500  rounded-full text-stone-50 text-xl self-center    transition-all duration-1000 ease-in-out  ">
                        Login
                      </button>
                    </div>
        </div>
       
    </div></div></>
  );
}
