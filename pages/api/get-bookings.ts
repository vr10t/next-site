import { NextApiRequest, NextApiResponse } from 'next';
import { getServiceSupabase } from "../../utils/supabaseClient";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const supabase = getServiceSupabase()
   console.log("req.query",typeof req.headers.id);
   
    const {id} =req.headers
   // loop through userBookings and save them as a single string with the shape '("bookingId1", "bookingId2", "bookingId3", ...)'
   if(id){

   
   const {data:bookings,error,status} = await supabase.from('bookings').select('*').filter('id', 'in', `(${id})`)

        return res.status(status).json({data:bookings,error})
    

   }
    return res.status(400).json({error:"Bad Request",})
   
   
}