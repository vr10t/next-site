import { NextApiRequest, NextApiResponse } from 'next';
import { getServiceSupabase } from "../../utils/supabaseClient";

async function handler(req:NextApiRequest,res:NextApiResponse) {
    const supabase = getServiceSupabase()


    const {query,id}=req.body
    // const queryObj=JSON.parse(query)
    console.log(query);
    const { data, error,status } = await supabase
    .from("bookings")
    .update(query)
    .eq("id", id)
    .single();
    return res.status(status).json({data,error})
}
export default handler