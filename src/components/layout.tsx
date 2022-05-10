import Head from 'next/head'
import Image from 'next/image'
import App from './App'
import Link from 'next/link'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import { ReactNode } from 'react'


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
          content="Learn how to build a personal website using Next.js"
        />
        
        <meta name="og:title" content={'yaas'} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className="">
        <Navbar>{children}</Navbar>
      </header>
      <main>{children}</main>
      
        <div className="">
        <Footer />
        </div>
      
    </>
  )
  ;
  export default Layout
