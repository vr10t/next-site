import { supabase } from "../../utils/supabaseClient";
import { withSentry } from '@sentry/nextjs';
async function handler(req, res) {
  // Get body submitted in request's body.
  // const router =useRouter()
  const body = req.body;
  console.log(body.return_date)
  let { data, error } = await supabase
    .from("bookings")
    .insert([
      {
        pickup_location: body.location,
        dropoff_destination: body.destination,
        passengers: body.passengers,
        pickup_date: body.date,
        distance: body.distance,
        service: body.service,
        return_date: body.return_date,
        flight_number:body.flight_number,
        name:body.name,
        email:body.email,
        phone:body.phone,
      },
    ]);

  if (error) {
    // console.warn(error);
    return res.status(401).json({ error: error.message });
  }
  // Send 200 success if there were no errors!
  // and also return a copy of the object we received from Supabase
  return res.status(200).json({ data: data });
}
export default withSentry(handler);