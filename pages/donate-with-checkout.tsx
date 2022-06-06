import { NextPage } from 'next'
import Layout from '../src/components/layout'

import CheckoutForm from '../src/components/CheckoutForm'

const DonatePage: NextPage = () => {
  return (
    <Layout >
      <div className="page-container">
        <h1>Donate with Checkout</h1>
        <p>Donate to our project </p>
        {/* <CheckoutForm /> */}
        {/* <button onClick={()=>console.log(total(20))}>Total</button> */}
      </div>
    </Layout>
  )
}

export default DonatePage