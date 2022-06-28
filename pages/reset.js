

import { supabase } from "../utils/supabaseClient" 
import React, { useState } from "react";
import toast from "react-hot-toast";
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
          id: notification,
        });
      } else if (data) {
        console.log(data);
        toast.success("Sent", {
          id: notification,
        });
      }
    } catch (error) {
      toast.error("Sorry Error occured", {
        id: notification,
      });
    }
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="email"
          placeholder = "Please enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}