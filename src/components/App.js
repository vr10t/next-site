import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from './Footer/Footer';
import Header from './Header/Header.js';
import Reviews from './Testimonials/Testimonials';
import Welcome from './Welcome/Welcome';
import FAQ from './FAQ/FAQ';
import Contact from './Contact/Contact';
import Form from './Booking/V3';
import { supabase } from '../../utils/supabaseClient';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Layout from './layout';
import FormV3 from './Booking/V3';
// import Account from '../components/Account'
function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [session, setSession] = useState(null);
  const [pageLoaded, setPageLoaded] = useState(false);
  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    setPageLoaded(true);
  }, []);
  function handleSignup() {
    console.log(showSignup);
    setShowSignup(!showSignup);
  }
  function handleSignin() {
    !session && setShowSignin(!showSignin);
  }

  return (
    <div>
      <Layout>
        <SignUp show={showSignup} />
        <SignIn show={showSignin} />
        <Image
          className='absolute bg-contain'
          priority
          src='/bg-2.jpg'
          width={1920}
          height={1080}
        />

        {pageLoaded && <FormV3 />}
        <div className='shadow-md'>
          <svg
            className='pointer-events-none'
            xmlns='http://www.w3.org/2000/svg'
            version='1.1'
            preserveAspectRatio='none'
            viewBox='0 0 1440 560'
          >
            <g mask='url("#SvgjsMask1066")' fill='none'>
              <path
                d='M 0,185 C 144,211.4 432,342.6 720,317 C 1008,291.4 1296,109 1440,57L1440 560L0 560z'
                fill='rgb(2 132 199)'
               />
            </g>
            <defs>
              <mask id='SvgjsMask1066'>
                <rect width='1440' height='560' fill='#ffffff' />
              </mask>
            </defs>
          </svg>
        </div>
        <div className=' bg-sky-600 w-screen h-56' />
        <div className='rotate-180  bg-clip-content '>
          <svg
            className='pointer-events-none'
            xmlns='http://www.w3.org/2000/svg'
            version='1.1'
            preserveAspectRatio='none'
            viewBox='0 0 1440 560'
          >
            <g mask='url("#SvgjsMask1066")' fill='none'>
              <path
                d='M 0,403 C 144,370 432,244.8 720,238 C 1008,231.2 1296,342.8 1440,369L1440 560L0 560z'
                fill='rgb(2 132 199)'
               />
            </g>
            <defs>
              <mask id='SvgjsMask1066'>
                <rect fill='#ffffff' />
              </mask>
            </defs>
          </svg>
        </div>
        <Welcome />
        <Reviews />
        <FAQ />
        <Contact />
      </Layout>
    </div>
  );
}

export default App;
