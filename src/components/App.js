import React from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header.js";
import Reviews from "./Testimonials/Testimonials";
import Welcome from "./Welcome/Welcome";
import FAQ from "./FAQ/FAQ";
import Contact from "./Contact/Contact";
import Link from "next/link";
import Form from "./Booking/V3";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Layout from "./layout";
// import Account from '../components/Account'
function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [session, setSession] = useState(null);
 const [pageLoaded, setPageLoaded]= useState(false)
  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    setPageLoaded(true)
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

       {pageLoaded && <Form />}
        <Welcome />
        <Reviews />
        <FAQ />
        <Contact />
      </Layout>
    </div>
  );
}

export default App;
