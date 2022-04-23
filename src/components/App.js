import React from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header.js';
import Reviews from './Testimonials/Testimonials';
import Welcome from './Welcome/Welcome';
import FAQ from "../../pages/FAQ"
import Contact from './Contact/Contact'
import Link from 'next/link';
import Form from "./Modal/Form";
function App() {
  function handleClick(){
    return <Link href="/ " />
  }
  return (

    <div className='transition-all ease-in-out delay-150 duration-300'>
 
      <Header />
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
