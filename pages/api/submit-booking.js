import { supabase } from "../../utils/supabaseClient";
import { withSentry } from '@sentry/nextjs';
import { nanoid } from "nanoid";
async function handler(req, res) {
  // Get body submitted in request's body.
  // const router =useRouter()
  const body = req.body;
  console.log(body)
  let { data, error } = await supabase
    .from("bookings")
    .insert([
      {
        id:nanoid(8).toUpperCase(),
        first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      phone: body.phone,
      return_first_name: body.return_first_name,
      return_last_name: body.return_last_name,
      return_email: body.return_email,
      return_phone: body.return_phone,
      location: body.location,
      destination: body.destination,
      passengers: body.passengers,
      date: body.date,
      time:body.time,
      return_date: body.return_date,
      flight_number: body.flight_number,
      distance: body.distance,
     
      service: body.service,
    return_time: body.return_time,
  plane_arriving_from: body.plane_arriving_from,
  airline_name:body.airline_name,
    return_location: body.return_location,
    return_destination: body.return_destination,
      },
    ]);

  if (error) {
    // console.warn(error);
    return res.status(401).json({ error: error.message});
  }
  // Send 200 success if there were no errors!
  // and also return a copy of the object we received from Supabase
  return res.status(200).json({ data: data });
}
export default withSentry(handler);