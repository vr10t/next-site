import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import App from "./App";
import Navbar from "./Navbar/V2";
import Summary from "./Booking/Summary"
import Footer from "./Footer/Footer";

type Props = {
  children: ReactNode;
  title?: string;
};

function Layout({ children, title }: Props) {
  return <>
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
    <div className="h-20 bg-transparent" />
    <main className="overflow-x-hidden min-h-screen" >{children}</main>

    <div className="">
      <Footer />
    </div>
  </>
}
export default Layout;
