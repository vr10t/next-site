import React from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header.js";
import Reviews from "./Testimonials/Testimonials";
import Welcome from "./Welcome/Welcome";
import FAQ from "./FAQ/FAQ";
import Contact from "./Contact/Contact";
import Link from "next/link";
import Form from "./Modal/Form";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import Auth from "./Auth";
// import Account from '../components/Account'
function App() {
  const [showModal, setShowModal] = useState(false);
  const [session, setSession] = useState(null);
  function handleClick() {
    return <Link href="/ " />;
  }

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  function handleLogin() {
    console.log(showModal);
    setShowModal(!showModal);
  }
  function handleSignin(){

  }

  return (
    <div>
      <Header>
        {/* {!session ? '': <div className="container" style={{ padding: '50px 0 100px 0' }}>
       <Account key={session.user.id} session={session} />
    </div>} */}

        <button onClick={handleSignin}>
          <a>{session ? session.user.id : "Sign up"}</a>
        </button>
        {!session && (
          <button onClick={handleLogin}>
            <a>Login</a>
          </button>
        )}
      </Header>

      <Auth show={showModal} />

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
