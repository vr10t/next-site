import Head from 'next/head'
import Image from 'next/image'
import App from './App'
import Link from 'next/link'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'

const name = 'Your Name'
export const siteTitle = 'Next.js Sample Website'

export default function Layout({ children }) {
  return (
    <div className="">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className="">
        <Navbar />
      </header>
      <main>{children}</main>
      
        <div className="">
        <Footer />
        </div>
      
    </div>
  )
}