
import { getServiceSupabase } from "../../utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from 'next';
 async function handler(req: NextApiRequest,res:NextApiResponse) {
  console.log(req)
  const supabase=getServiceSupabase()
 const id = req.headers.id
    const { data, error,status } = await supabase
      .from("users")
      .select()
      .eq("user_id", id);
  
      if (status===200){
          return res.status(200).json(data)
      }
      else{
          return res.status(status).json({error:error?.message})
      }
//  return req
  }
  export default handler