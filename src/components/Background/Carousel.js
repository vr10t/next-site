import { Carousel } from "react-bootstrap";
import { useState } from "react";
import Caption from "./CarouselItem";
import styles from "./Carousel.module.scss";
import Link from "next/link";
import Image from "next/image";
import bg2 from "../../../public/bg-2.jpg"
import slider1 from "../../../public/slider1.jpg"
import slider2 from "../../../public/slider2.jpg"
import slider3 from "../../../public/slider3.jpg"

import ButtonPhat from "../Buttons/ButtonPhat";
function BgCarousel() {
  // const imageClasses=""
  return (
    <div id="" className="h-auto  w-auto max-w-screen bg-stone-100">
      <Carousel className="" fade pause={false} controls={false} indicators={false}>
        <Carousel.Item>
          <div className="flex flex-col">
            <div className=" max-w-screen  w-auto h-96 lg:h-screen">
              <Image
                
                className="relative  object-cover"
                src={slider1}
                placeholder="blur"
                alt="..."
                layout="fill"
              />
            </div>

            <Caption className="shadow" text="TRUSTED BY THOUSANDS" />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="flex flex-col">
            <div className=" max-w-screen  w-auto   h-96 lg:h-screen">
              <Image
               placeholder="blur"
                className="relative object-cover"
                src={bg2}
                alt="..."
                layout="fill"
              />
            </div>
            <Caption text="AVAILABLE 24/7" />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="flex flex-col">
            <div className=" max-w-screen  w-auto   h-96 lg:h-screen">
              <Image
               placeholder="blur"
                className="relative object-cover"
                src={slider2}
                alt="..."
                layout="fill"
              />
            </div>
            <Caption text="CHEAP FARES" />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="flex flex-col">
            <div className=" max-w-screen  w-auto   h-96 lg:h-screen">
              <Image
              placeholder="blur"
                className="relative object-cover"
                src={slider3}
                alt="..."
                layout="fill"
              />
            </div>
            <Caption text="FAST AND RELIABLE" />
          </div>
        </Carousel.Item>
      </Carousel>
      <div
          className={`${styles.aniR} flex z-[999] bottom-32 justify-center relative `}>
          <Link href="#about">
            <a className="no-underline text-white">
              <ButtonPhat
                
                clr="bg-orange-500 hover:bg-orange-600 transition-all duration-500 ease-in-out  "
                text="Learn More"
              />
            </a>
          </Link>
        </div>
    </div>
  );
}
export default BgCarousel;
