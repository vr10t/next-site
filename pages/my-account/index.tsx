import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaPencilAlt } from "@react-icons/all-files/fa/FaPencilAlt";
import * as Yup from "yup";
import Image from "next/image";
import {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import { Form, Field, Formik } from "formik";
import min from "libphonenumber-js/min/metadata";
import {
  formatIncompletePhoneNumber,
  Metadata,
  parsePhoneNumber,
  validatePhoneNumberLength,
} from "libphonenumber-js/core";
import toast, { Toaster } from "react-hot-toast";
import Initial from "../../src/components/Account/Initial";
import {
  getBookings,
  getBookingsForUser,
 
  updateUserDetails,
} from "../../utils/supabase-helpers";
import { supabase } from "../../utils/supabaseClient";
import Sidebar from "../../src/components/Account/Sidebar";
import Layout from "../../src/components/layout";
import { useAuthContext } from "../../src/context/state";

// const fetcher = (id) => fetch(id).then((res) => res.json() )
export default function MyAccount() {
  interface UserDetails{
    id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string;
          bookings?: any[];
  }
  
  const user = useAuthContext();
  const user_id = ""
  // session?.user.id;
 
  console.log(user,"DATA");
 
  const [edit, setEdit] = useState(false);
 
  useEffect(() => {
   
    console.log(router.asPath, "router as path");
  }, [user]);
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const fullName =user?.user_metadata.full_name || `${user?.first_name  } ${  user?.last_name}`;
  const initial = user?.first_name?.slice(0, 1);
  const profilePic=<Image className="object-fill rounded-full -z-20" src={user?.user_metadata.avatar_url||'/'} width={128} height={128} />;
 

  const router = useRouter();

  
  useEffect(() => {
    console.log(user);
    if (!user) {
      // router.push("/signin")
      
    }
    

    
  }, [user]);

  async function handleSubmit(values: { phone: string; first_name: string; last_name: string; email: string; }) {
    const notification = toast.loading("Updating Profile....");
    
    console.log("SUBMITTING");
    setLoading(true);
    
    console.log(isPossiblePhoneNumber(values.phone, "GB"), values.phone);
    if (!isPossiblePhoneNumber(values.phone, "GB")) {
      setPhoneError("Invalid number");
      
    } else {
      try {
        
        let newDetails: {
            id:string | undefined,
            first_name:string,
            last_name:string,
            email: string,
            phone:string,
            bookings: any[],
          }
        newDetails ={
          id: user?.id ||"",
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          phone: values.phone,
          bookings: user?.bookings,
        };
        await updateUserDetails(user_id, {
          id: user?.id,
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          phone: values.phone,
          bookings: user.bookings,
        }).then(async (res) => {
          console.log(res?.status,"res.status");
          if (res?.status === 200) {
           await supabase.auth
              .update({ email: values.email })
              .then(({ data, error }) => {
                console.log(data, error,"auth update:data,error");
                if (data) {
                  console.log("Profile updated!");
                
                  toast.success("Profile updated!", {
                    position:"top-right",
                    duration: 4000,
                    id: notification,
                  });

                 
                  setEdit(false);
                } else {
                  toast.error(error!.message, {
                    duration: 4000,
                    id: notification,
                  });
                }
              });
          } else {
            toast.error(res!.error!.message, {
              duration: 4000,
              id: notification,
            });
          }

          console.log(res?.status, "UpDAET");
        });
        //
      } catch (error:any) {
        toast.error(error!.message, {
          duration: 4000,
          // id: notification,
        });
      } finally {
        setLoading(false);
      }
    }
  }
  return (
    <Layout title="My Account">
        <div className="flex relative z-20">
          <Sidebar />
          
          <div className="flex flex-col gap-4 items-center pt-10 w-full h-screen bg-gray-100 -z-20">
            <div
              className="flex  justify-center items-center pb-2 w-32 h-32 text-5xl font-medium rounded-full select-none  text-black/80">
              {profilePic||initial}
            </div>{" "}
            <Toaster />
            {edit ? (
              <Formik
                initialValues={{
                  first_name: user?.first_name,
                  last_name: user?.last_name,
                  email: user?.email,
                  phone: user?.phone,
                }}
                validationSchema={Yup.object().shape({
                  first_name: Yup.string()
                    .required("Name is required")
                    .min(2, "Name is too short")
                    .max(50, "Name is too long")
                    .matches(
                      /^[A-z]+(([',. [a-z ][A-Z ])?[-]?[a-zA-Z]*)*$/,
                      "Name must not contain invalid characters"
                    ),

                  last_name: Yup.string()
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
                  phone: Yup.string().required("Phone is required"),
                  // password:Yup.string().required("Password is required")
                })}
                onSubmit={handleSubmit}>
                {({ errors, touched }) => (
                  <Form className="flex flex-col gap-2">
                    <Field
                      type="text"
                      name="first_name"
                      className="px-4 py-2 w-full rounded-lg ring-1 ring-gray-500 focus:ring-sky-500"
                      placeholder="First Name"
                    />
                    {errors.first_name && touched.first_name && (
                      <div className="text-sm text-red-500">
                        {errors.first_name}
                      </div>
                    )}
                    <Field
                      type="text"
                      name="last_name"
                      className="px-4 py-2 w-full rounded-lg ring-1 ring-gray-500 focus:ring-sky-500"
                      placeholder="Last Name"
                    />
                    {errors.last_name && touched.last_name && (
                      <div className="text-sm text-red-500">
                        {errors.last_name}
                      </div>
                    )}
                    <Field
                      type="email"
                      name="email"
                      className="px-4 py-2 w-full rounded-lg ring-1 ring-gray-500 focus:ring-sky-500"
                      placeholder="Email"
                    />
                    {errors.email && touched.email && (
                      <div className="text-sm text-red-500">{errors.email}</div>
                    )}
                    <Field
                      type="tel"
                      name="phone"
                      className="px-4 py-2 w-full rounded-lg ring-1 ring-gray-500 focus:ring-sky-500"
                      placeholder="Phone"
                    />
                    {(errors.phone && touched.phone) ||
                      (phoneError && (
                        <div className="text-sm text-red-500">
                          {errors.phone}
                          {phoneError}
                        </div>
                      ))}
                    {/* <Field type="password" name="password"  className="px-4 py-2 w-full rounded-lg ring-1 ring-gray-500 focus:ring-sky-500" placeholder="Your password" />
                {errors.password&&touched.password&&<div className="text-sm text-red-500">{errors.password}</div>} */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 text-lg text-gray-50 bg-sky-600 rounded-lg duration-200 hover:bg-sky-500">
                      Save
                    </button>
                    <button
                      onClick={() => setEdit(false)}
                      className="px-4 py-2 text-lg text-gray-50 bg-gray-600 rounded-lg duration-200 hover:bg-gray-500">
                      Cancel
                    </button>
                  </Form>
                )}
              </Formik>
            ) : (
              <div className=" group ring-0 py-4 px-10 z-[21] rounded-lg hover:ring-1 ring-black/40 flex flex-col items-center">
                <span
                  onClick={() => setEdit(true)}
                  className="flex relative -right-2/3 invisible justify-center w-6 h-6 text-gray-800 rounded-md hover:bg-sky-500 hover:text-gray-50 group-hover:visible">
                  {" "}
                  <FaPencilAlt aria-label="Edit" className="z-20 self-center" />
                </span>
                <p className="">
                  {fullName}
                </p>
                <p className="">{ user?.email}</p>
                <p className="">{user?.phone}</p>
              </div>
            )}
          </div>
        </div>{" "}
      </Layout>
  );
}
