import { NextApiRequest, NextApiResponse } from "next";
import initStripe from "stripe";
import { supabase } from "../../utils/supabaseClient";

// eslint-disable-next-line consistent-return
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  console.log()
  if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send("You are not authorized to call this API");
  }
  // eslint-disable-next-line new-cap
  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: "2020-08-27",
  });
  const customer = await stripe.customers.create({
    email: req.body.record.email,
  });
  console.log(customer);
  const result=await supabase
    .from("profiles")
    .update({ stripe_customer: customer.id })
    .eq("id", "225d7a4a-b125-490c-bd4d-ba185f99f955");
    console.log(result);
  res.send({ message: result});
};
export default handler;
