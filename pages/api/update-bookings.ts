import { NextApiRequest, NextApiResponse } from 'next';
import { getServiceSupabase } from "../../utils/supabaseClient";

async function handler(req:NextApiRequest,res:NextApiResponse) {
    const supabase = getServiceSupabase()
    const {userId,bookingId,previousBookings}=req.body
    const { data, error,status } = await supabase
    .from("profiles")
    .update({ bookings: [previousBookings + "," + bookingId] })
    .eq("id", userId)
    .single();
    return res.status(status).json({data,error})
}
export default handler