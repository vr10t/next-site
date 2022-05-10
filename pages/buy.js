import { initiateCheckout, price } from "../utils/payments";
import { loadStripe } from "@stripe/stripe-js";
import getDistance from '../utils/get-distance'
export default  () => {
  
  return (
    <div>
      <button
        onClick={() =>
          getDistance()
        }>
        Buy
      </button>
    </div>
  );
};
