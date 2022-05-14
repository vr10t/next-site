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
import SignIn from "./SignIn"
// import Account from '../components/Account'
function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [showSignin, setShowSignin] = useState(false)
  const [session, setSession] = useState(null);
 

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  function handleSignup() {
    console.log(showSignup);
    setShowSignup(!showSignup);
  }
  function handleSignin(){
  !session&& setShowSignin(!showSignin)
  }

  return (
    <div>
      <Header>
        {/* {!session ? '': <div className="container" style={{ padding: '50px 0 100px 0' }}>
       <Account key={session.user.id} session={session} />
    </div>} */}

        <button className="flex mx-2 my-2 md:my-auto shadow-md align-middle py-1 relative  h-10 w-24  bg-gradient-to-r hover:to-cyan-600 hover:from-sky-500 from-sky-400  to-cyan-500  rounded-full text-stone-50 text-lg justify-center   font-bold transition-all duration-1000 ease-in-out " onClick={handleSignin}>
          <a>{session ? session.user.id : "Login"}</a>
        </button>
        {!session && (
          <button className="flex mx-2  shadow-md align-middle py-1 relative  h-10 w-24  bg-sky-50  rounded-full text-gray-900 tracking-tight text-lg justify-center   font-bold transition-all duration-1000 ease-in-out " onClick={handleSignup}>
            <a>Sign Up</a>
          </button>
        )}
      </Header>

      <SignUp show={showSignup} />
      <SignIn show={showSignin} />

      <Form />
      <Welcome />
      <Reviews />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
