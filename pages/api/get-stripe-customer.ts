/* eslint-disable new-cap */
import { NextApiRequest, NextApiResponse } from "next";
import initStripe from "stripe";
import { getServiceSupabase} from "../../utils/supabaseClient";

// eslint-disable-next-line consistent-return
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.body);
  if (req.body.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send("You are not authorized to call this API");
  }
  // eslint-disable-next-line new-cap
  const {bookingId} = req.body;
  const supabase = getServiceSupabase();
  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: "2020-08-27",
  });
 const {data,error}= await supabase
    .from("bookings")
    .select("checkout_session")
    .eq("id", bookingId);
//  if(data) res.send({data:data,error});
  
 if(data){ 
    // get checkout session object
    const session = await stripe.checkout.sessions.retrieve(data[0].checkout_session);
    // get payment intent object
    if(session){
    const paymentIntent = await stripe.paymentIntents.retrieve((session.payment_intent as string));
 res.send({paymentIntent});
 // get refund
   
}
}



else{
    res.send({data,error});
}
}
export default handler;