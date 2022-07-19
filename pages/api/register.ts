import { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from "nanoid";
import { supabase } from "../../utils/supabaseClient";

export default async function registerUser(req:NextApiRequest, res:NextApiResponse) {
  // destructure the e-mail and password received in the request body.
  const { first_name, last_name, email, phone } = req.body;
console.log(req.body);
  // make a SignUp attempt to Supabase and
  // capture the user (on success) and/or error.

  const { user, error,session } = await supabase.auth.signUp(
    {email
      ,
      password:req.body.password||nanoid()
    },
    { data: {first_name ,last_name, phone } }
  );
  res.status(200).json({ user, error,session });
}

