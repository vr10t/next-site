
import { getServiceSupabase } from "../../utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from 'next';
 async function handler(req: NextApiRequest,res:NextApiResponse) {
  console.log(req)
  const supabase=getServiceSupabase()
 const id = req.headers.id
    const { data, error,status } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id);
  
      
 return res.status(status).json({data,error})
  }
  export default handler