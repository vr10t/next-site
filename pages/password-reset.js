import React, { useState, useEffect } from "react";
import toast, {Toaster} from "react-hot-toast";
import Layout from "../src/components/layout";
import { supabase } from "../utils/supabaseClient";

function PasswordReset() {
  const [password, setPassword] = useState(null);

  const [hash, setHash] = useState(null);

  useEffect(() => {
    setHash(window.location.hash);
    console.log(hash,"hash");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const notification = toast.loading("Changing Password");

    try {
      // if the user doesn't have accesstoken
      if (!hash) {
        return toast.error("Sorry, Invalid token", {
          duration:4000,
          id: notification,
        });
      } else if (hash) {
        const hashArr = hash
          .substring(1)
          .split("&")
          .map((param) => param.split("="));

        let type;
        let accessToken;
        for (const [key, value] of hashArr) {
          if (key === "type") {
            type = value;
          } else if (key === "access_token") {
            accessToken = value;
          }
        }

        if (
          type !== "recovery" ||
          !accessToken ||
          typeof accessToken === "object"
        ) {
          toast.error("Invalid access token or type", {
            duration:4000,
            id: notification,
          });
          return;
        }

        //   now we will change the password
        const { error } = await supabase.auth.api.updateUser(accessToken, {
          password: password,
        });

        if (error) {
          toast.error(error.message, {
            id: notification,
          });
        } else if (!error) {
          toast.success("Password Changed", {
            duration:4000,
            id: notification,
          });
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Sorry Error occured", {
        duration:4000,
        id: notification,
      });
    }
  };

  return (
    <Layout title="Find your account">
    <Toaster/>
{!hash  && <p className="text-xl flex justify-center mx-auto pt-10 text-gray-900 font-medium bg-gray-100 pb-96">{toast.error}</p>}
    {hash &&<div className="w-5/6 mx-auto h-full rounded-lg my-10 py-10 bg-gray-50 flex flex-col justify-self-center items-center">
    <h1 className="text-3xl font-bold" >Reset Your Password</h1>
    <p className="text-md text-gray-700 py-4">Please enter your new password in the box below:</p>
      <form className="flex flex-col self-center items-center" onSubmit={(e) => handleSubmit(e)}>
        <input
        className="bg-gray-50 rounded-lg border-gray-600 focus:border-sky-500 appearance-none focus:ring-2 focus:ring-sky-500"
        autoComplete="new-password"
          type="password"
          placeholder = "Please enter your new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="my-4 py-2 px-4 duration-200 hover:bg-sky-400 bg-sky-500 text-gray-50 font-medium text-lg rounded-lg" type="submit">Submit</button>
      </form>
    </div>}</Layout>
  );
}

export default PasswordReset;