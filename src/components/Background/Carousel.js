import { Carousel } from "react-bootstrap";
import { useState } from "react";
import Caption from "./CarouselItem";
import "./Carousel.module.css";
import Image from "next/image";

import ButtonPhat from "../Buttons/ButtonPhat";
function BgCarousel() {
  // const imageClasses=""
  return (
    <div id="" className="h-auto  w-auto max-w-screen bg-gray-50">
      <Carousel className="" fade controls={false} indicators={false}>
        <Carousel.Item>
          <div className="flex flex-col">
            <div className=" max-w-screen  w-auto  h-screen">
              <Image
                className="relative object-cover"
                src="/bg-1.jpg"
                alt="..."
                layout="fill"
              />
            </div>
            <Caption text="AVAILABLE 24/7" />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="flex flex-col">
            <div className=" max-w-screen  w-auto   h-screen">
              <Image
                className="relative object-cover"
                src="/bg-2.jpg"
                alt="..."
                layout="fill"
              />
            </div>
            <Caption text="FAST AND RELIABLE" />
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
export default BgCarousel;
