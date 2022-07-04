import { useState, useEffect, useRef, useCallback } from "react";
import * as Yup from "yup";
import { Field, Formik, useFormik, Form } from "formik";
import { supabase } from "../utils/supabaseClient";
import PhoneInput, {
  formatPhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill";
// import { useAppContext } from "../../context/state";
import Image from "next/image";
import { useRouter } from "next/router";
import { Checkbox } from "flowbite-react";
import { FaLock } from "@react-icons/all-files/fa/FaLock";
import Link from "next/link";

export default function SignUp(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [showReturnDetails, setShowReturnDetails] = useState(false);
  //   const { data, setData } = useAppContext();
  const router = useRouter();
  const referrer = router.query.referrer;

  useEffect(() => {}, [firstName, lastName, email, phone]);
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

  async function handleSubmit(ev) {
    console.log(ev);
    // const {user, error} = await supabase.auth.signUp({email:ev.email,password:ev.password})
    // if(user) router.push(referrer||"/")
    // if(user) console.log(user);
    // if (error) setLoginError(error.message)
  }

  return (
    <>
      <div className="z-[-20] h-sc bg-gray-50">
        <Image src={"/spiral.png"} layout="fill" />
      </div>
      <div className="flex bg-gray-200 justify-center">
        <div className="flex z-20 flex-col  h-3/4 my-8 w-full max-w-md px-4 py-8 mx-4 bg-gray-100 rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
          <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl ">
            Sign Up
          </div>
          <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/signin"><a
             
              className="text-sm text-blue-500 underline hover:text-blue-700">
              Sign in
            </a></Link>
          </span>
          <div className="mt-8">
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                repeat_password: "",
                acceptTerms: false,
              }}
              validationSchema={Yup.object().shape({
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
                password: Yup.string()
                  .required()
                  .min(8, "Password must be at least 8 characters")
                  .max(64, "Password is too long"),
                repeat_password: Yup.string()
                  .required("Please confirm your password")
                  .oneOf([Yup.ref("password")], "Passwords do not match"),
                acceptTerms: Yup.bool().oneOf(
                  [true],
                  "Accept Ts & Cs is required"
                ),
              })}
              onSubmit={handleSubmit}>
              {({ errors, touched,values }) => (
                <Form onChange={()=>console.log(values)} className="flex flex-col ">
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
                    autoComplete="given-name"

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
                      <div className="absolute w-full h-10 text-sm font-medium text-pink-500 rounded-lg ring-2 ring-pink-400 pointer-events-none">
                        <p className="relative left-1 -top-3 px-2 w-max bg-pink-400 text-white rounded-lg">
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
                    autoComplete="family-name"
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
                      <div className="absolute w-full h-10 text-sm font-medium text-pink-500 rounded-lg ring-2 ring-pink-400 pointer-events-none">
                        <p className="relative left-1 -top-3 px-2 w-max bg-pink-400 text-white rounded-lg">
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
                    autoComplete="email"
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
                      <div className="absolute w-full h-10 text-sm font-medium text-pink-500 rounded-lg ring-2 ring-pink-400 pointer-events-none">
                        <p className="relative left-1 -top-3 px-2 w-max bg-pink-400 text-white rounded-lg">
                          {errors.email}
                        </p>
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="password"
                    className="text-gray-900 pb-2 text-base font-medium">
                    Password
                  </label>
                  <div className="flex relative mb-2 w-full shadow-sm">
                    <span className="inline-flex items-center px-3 text-lg text-gray-50 bg-sky-500 rounded-l-md border-r-2 shadow-sm h">
                      <FaLock className="z-[2]" />
                    </span>

                    <Field
                    autoComplete="new-password"
                      name="password"
                      type="password"
                      id="password"
                      className={`flex-1 px-4 py-2 w-full text-base placeholder-gray-400 text-gray-600 bg-gray-50 rounded-r-lg border-0 shadow-sm appearance-none focus:outline-none focus:ring-2 ${
                        errors.password && touched.password
                          ? "focus:ring-pink-400 "
                          : "focus:ring-sky-500"
                      }`}
                      placeholder="Your password"
                    />
                    {errors.password && touched.password && (
                      <div className="absolute w-full h-10 text-sm font-medium text-pink-500 rounded-lg ring-2 ring-pink-400 pointer-events-none">
                        <p className="relative left-1 -top-3 px-2 w-max bg-pink-400 text-white rounded-lg">
                          {errors.password}
                        </p>
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="repeat_password"
                    className="text-gray-900 pb-2 text-base font-medium">
                    Repeat password
                  </label>
                  <div className="flex relative mb-2 w-full shadow-sm">
                    <span className="inline-flex items-center px-3 text-lg text-gray-50 bg-sky-500 rounded-l-md border-r-2 shadow-sm h">
                      <FaLock className="z-[2]" />
                    </span>

                    <Field
                     autoComplete="new-password"
                      name="repeat_password"
                      type="password"
                      id="repeat_password"
                      className={`flex-1 px-4 py-2 w-full text-base placeholder-gray-400 text-gray-600 bg-gray-50 rounded-r-lg border-0 shadow-sm appearance-none focus:outline-none focus:ring-2 ${
                        errors.repeat_password && touched.repeat_password
                          ? "focus:ring-pink-400 "
                          : "focus:ring-sky-500"
                      }`}
                      placeholder="Repeat password"
                    />
                    {errors.repeat_password && touched.repeat_password && (
                      <div className="absolute w-full h-10 text-sm font-medium text-pink-500 rounded-lg ring-2 ring-pink-400 pointer-events-none">
                        <p className="relative left-1 -top-3 px-2 w-max bg-pink-400 text-white rounded-lg">
                          {errors.repeat_password}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="h-[100px]"></div> {errors.acceptTerms && touched.acceptTerms && (
                    
                      <p className="relative top-3 px-2 text-sm font-medium w-max bg-pink-400 text-white rounded-lg">
                        {errors.acceptTerms} 
                      </p>
                    
                  )}
                  <span  className="flex py-2 gap-2 justify-start "><Field
                    className="rounded-md h-5 w-5 self-center cursor-pointer"
                    type="checkbox"
                    name="acceptTerms"
                    id="acceptTerms" /> <label htmlFor="acceptTerms" className="cursor-pointer self-center text-md font-medium tracking-tight text-gray-700">I agree to the 
                   <Link href="/terms" ><a className=" text-sky-600 hover:text-sky-500"> Terms of Service </a></Link> 
                    and the 
                    <Link href="/privacy" ><a className=" text-sky-600 hover:text-sky-500"> Privacy Policy </a></Link> </label> </span>
                 
                  <div className="flex justify-center py-4 w-full">
                    <button
                      type="submit"
                      className="  py-2 px-4 bg-sky-600 hover:bg-sky-500  rounded-md text-stone-50 text-lg tracking-tight font-medium  self-center    transition-all duration-200 ease-in-out  ">
                      Create your account
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <div className=" relative bottom-[15rem] xs:bottom-[14.3rem]">
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
                 
                  placeholder="Your phone number"
                  value={phone}
                  error={phoneError}
                  onChange={setPhone}
                  onBlur={handlePhoneError}
                />
                {phoneError && (
                  <div className="absolute pointer-events-none w-full h-full -left-[1px] text-sm font-medium text-pink-500 rounded-lg  ring-[2px] ring-pink-400">
                    <p className="relative left-1 -top-3 px-2 w-max bg-pink-400 text-white rounded-lg">
                      {phoneError}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
