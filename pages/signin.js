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
import { FaLock } from "@react-icons/all-files/fa/FaLock";
import Link from "next/link";
import { Alert } from "flowbite-react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";



export default function SignIn(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [loginError, setLoginError]= useState("")
  const [showReturnDetails, setShowReturnDetails] = useState(false);
  const router = useRouter()
//   const { data, setData } = useAppContext();
 const referrer=router.query.referrer
 console.log(referrer);
  useEffect(() => {
  
  }, [firstName, lastName, email, phone]);
  
 
 
  const handleSubmit = async (ev) => {
      console.log(ev);
    
    // const res = await fetch("/api/login", {
    //   body: JSON.stringify({
    //     email: ev.email,
    //     password: ev.password,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "POST",
    // })

    const {user, error} = await supabase.auth.signIn({email:ev.email,password:ev.password})
    if(user) router.push(referrer||"/")
    if(user) console.log(user);
    if (error) setLoginError(error.message)
  };

  return (<>
  {loginError && (
          <div className="fixed top-[10%] w-auto h-auto z-[9999] right-10">
            <Alert onDismiss={() => setLoginError("")} color="red">
              <span className="text-lg font-bold">Login failed!</span>
              <p>{loginError}</p>
            </Alert>
          </div>
        )}
  <div className="z-[-20] h-sc bg-gray-50"><Image src={"/spiral.png"} layout="fill" /></div>
      <div className="flex bg-gray-200 justify-center">
      
      
    <div className="flex z-20 flex-col  h-3/4 my-8 w-full max-w-md px-4 py-8 bg-gray-100 rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
                <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl ">
                  Login
                </div>
                <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"><a
                    
                    className="text-sm  text-blue-500 underline hover:text-blue-700">
                    Sign up</a>
                  </Link>
                </span>
                <div className="mt-8">
<Formik
 initialValues= {{
       
        email: "",
        password:""}
      }
      validationSchema= {Yup.object().shape({
        

        email: Yup.string()
          .required("Email is required")
          .email("Email is invalid"),
        // password: Yup.string()
        // .required("Password is required")
        // .min(8,"Password is too short")
      })}
      onSubmit={handleSubmit}
 >
{({
            setFieldValue,
            setFieldTouched,
            values,
            errors,
            touched,
          }) => (
      <Form  className="flex flex-col ">

        
        
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
            <div className="absolute w-full h-full text-sm font-medium text-pink-500 rounded-lg ring-2 ring-pink-400 pointer-events-none">
              <p className="relative left-1 -top-3 px-2 w-max bg-gray-50">
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
           autoComplete="current-password"
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
            <div className="absolute w-full h-full text-sm font-medium text-pink-500 rounded-lg ring-2 ring-pink-400 pointer-events-none">
              <p className="relative left-1 -top-3 px-2 w-max bg-gray-50">
                {errors.password}
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-end w-full mt-4"> <p className="text-sm text-blue-500 font-light "><Link href="/reset">Forgot password?</Link></p></div>
        <div className="flex justify-center py-4 w-full">
                      <button
                       
                        type="submit"
                        className=" w-1/2 h-10 bg-sky-500  rounded-full text-stone-50 text-xl self-center    transition-all duration-1000 ease-in-out  ">
                        Login
                      </button>
                    </div>
        </Form>)}
        </Formik>
        
        
        </div>
       
    </div></div></>
  );
}
