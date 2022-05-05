import React from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header.js';
import Reviews from './Testimonials/Testimonials';
import Welcome from './Welcome/Welcome';
import FAQ from "./FAQ/FAQ"
import Contact from './Contact/Contact'
import Link from 'next/link';
import Form from "./Modal/Form";
import { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient'
// import Auth from '../../pages/Auth'
// import Account from '../components/Account'
function App() {
  function handleClick(){
    return <Link href="/ " />
  }
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  return (

    <div className='transition-all ease-in-out delay-150 duration-300'>
 
      <Header />
      {/* {!session ? '': <div className="container" style={{ padding: '50px 0 100px 0' }}>
       <Account key={session.user.id} session={session} />
    </div>} */}
      <Form  />
      <Welcome />
      <button onClick={handleClick} className="fixed inline-flex float-right mr-20 w-12 h-12 text-center  z-10 bg-orange-500  text-white rounded-full text-7xl" >&#708;
</button>
      <Reviews />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );

}

export default App;
