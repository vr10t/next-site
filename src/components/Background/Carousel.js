import { Carousel } from "react-bootstrap";
import { useState } from "react";
import Item from "./CarouselItem";
import "./Carousel.module.css"


import ButtonPhat from "../Buttons/ButtonPhat";
function BgCarousel() {
  return (
    <div id="" className="h-auto  w-auto max-w-screen bg-gray-50">
      <Carousel className="" fade controls={false} indicators={false}>
        <Carousel.Item>
          <Item text="AVAILABLE 24/7" Img="bg-2.jpg" />
        </Carousel.Item>
        <Carousel.Item>
          <Item text="FAST AND RELIABLE" Img="bg-1.jpg" />
        </Carousel.Item>
      </Carousel>

      
    </div>
  );
}
export default BgCarousel;
