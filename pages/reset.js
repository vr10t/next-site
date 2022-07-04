

import { supabase } from "../utils/supabaseClient" 
import React, { useState } from "react";
import toast, {Toaster} from "react-hot-toast";
import Layout from "../src/components/layout";
export default function ResetPassword(params) {
    

   


  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    console.log("name");

    e.preventDefault();

    const notification = toast.loading("Sending Email....");

    try {
      const { data, error } = await supabase.auth.api.resetPasswordForEmail(
        email,
        {
          redirectTo: "http://localhost:3000/password-reset", //// this will redirect to us at password-reset page,
          //// you can also set your own page for it.
        }
      );

      if (error) {
        toast.error(error.message, {
          duration:4000,
          id: notification,
        });
      } else if (data) {
        console.log(data);
        toast.success("Sent", {
          duration:4000,
          id: notification,
        });
      }
    } catch (error) {
      toast.error("Sorry Error occured", {
        duration:4000,
        id: notification,
      });
    }
  };
  return (
    <Layout title="Find your account">
    <Toaster/>
    <div className="w-5/6 mx-auto h-full rounded-lg my-10 py-10 bg-gray-50 flex flex-col justify-self-center items-center">
    <h1 className="text-3xl font-bold" >Let's find your account</h1>
    <p className="text-md text-gray-700 py-4">Please enter your email in the box below:</p>
      <form className="flex flex-col self-center items-center" onSubmit={(e) => handleSubmit(e)}>
        <input
        className="bg-gray-50 rounded-lg border-gray-600 focus:border-sky-500 appearance-none focus:ring-2 focus:ring-sky-500"
        autoComplete="email"
          type="email"
          placeholder = "Please enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="my-4 py-2 px-4 duration-200 hover:bg-sky-400 bg-sky-500 text-gray-50 font-medium text-lg rounded-lg" type="submit">Search</button>
      </form>
    </div></Layout>
  );
}