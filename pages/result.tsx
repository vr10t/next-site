
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import useSWR from 'swr';
import Layout from '../src/components/layout';
import PrintObject from '../src/components/PrintObject';
import Cart from '../src/components/Cart';
import ClearCart from '../src/components/ClearCart';

import { fetchGetJSON } from '../utils/api-helpers';
import { useAppContext } from '../src/context/state';
import {deleteBooking} from "../utils/supabase-helpers"

const ResultPage: NextPage = () => {
  const router = useRouter();
const {data:bookingData,setData}= useAppContext()
  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  );

  if (error) {
    setData(bookingData)
    const {id} = bookingData
deleteBooking(id)
  };

  return (
    <Layout title="Checkout Payment Result | Next.js + TypeScript Example">
      <div className="page-container">
        <h1>Checkout Payment Result</h1>
        <h2>Status: {data?.payment_intent?.status ?? 'loading...'}</h2>
        <h3>CheckoutSession response:</h3>
        <PrintObject content={data ?? 'loading...'} />
        <Cart>
          <ClearCart />
        </Cart>
      </div>
    </Layout>
  );
};

export default ResultPage;