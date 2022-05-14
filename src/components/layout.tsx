import Head from 'next/head'
import Image from 'next/image'
import App from './App'
import Link from 'next/link'
import Navbar from './Navbar/V2'

import Footer from './Footer/Footer'
import { ReactNode } from 'react'
import { propTypes } from 'react-bootstrap/esm/Image'


type Props = {
  children: ReactNode;
  title?: string;
};

 const Layout = ({
  children,
  title = 'TypeScript Next.js Stripe Example',
}: Props) => (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Airport Transfer service from Airports Taxi Transfers. Book your private airport transfers online, for a reliable transportation service at competitive, all inclusive prices."
        />
        
        <meta name="og:title" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      
        <Navbar />
     
      <main>{children}</main>
      
        <div className="">
        <Footer />
        </div>
      
    </>
  )
  ;
  export default Layout