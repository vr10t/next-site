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
  const {chargeId} = req.body;
  
  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: "2020-08-27",
  });
 
  if(chargeId){
    try {
      const refund = await stripe.refunds.create({
        charge: chargeId,
    });
    
    res.send({data:refund,error:null});
    } catch (error) {
      res.send({data:null,error});
    }
    
    
  }
  else{
    res.status(500).json({data:null,error:"no charge id"});
  }
  
}
export default handler;