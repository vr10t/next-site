
import { NextApiRequest, NextApiResponse } from 'next';
import { getServiceSupabase } from "../../utils/supabaseClient";

 async function handler(req: NextApiRequest,res:NextApiResponse) {
  console.log(req)
  const supabase=getServiceSupabase()
 const {id} = req.headers
    const { data, error,status } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id);
  
      
 return res.status(status).json({data,error})
  }
  export default handler