import getStripe from "./getStripe"
import {useState} from 'react'


// export const price = await stripePromise.prices.create({
//     unit_amount: unitPrice,
//     currency: "gbp",
//     product: "prod_LeTroyUMahjlde",
//   });

function total(price){
  const [unitPrice, setUnitPrice]=useState(0)
setUnitPrice(()=>unitPrice+ price)
console.log(unitPrice)
return unitPrice
 } 
export{total}