import { Carousel } from "react-bootstrap";
import styles from "./Carousel.module.css"
import ButtonPhat from "../Buttons/ButtonPhat";
import Link from "next/link"

export default function CarouselItem(props) {
  return (
    <div className=" bg-fixed bg-black">
      <div>
        <img
          className=" max-w-screen  w-auto object-none sm:h-auto h-screen"
          src={props.Img}
          alt="..."
        />
        <Carousel.Caption>
          <div className={` ${styles.aniL} -top-64 md:-top-96 justify-start bottom-40  lg:w-3/5 xl:w-2/5 flex flex-col items-start md:items-start relative z-10`}>
         
            <h1 className="mb-10  w-4 shadow-xl font-bold text-6xl sm:text-7xl    mt-4">
              {props.text}
            </h1>
</div>
<div className={`${styles.aniR} md:-top-96 relative md:-left-96`}>
<Link href="#about">
<a className="no-underline text-white">
            <ButtonPhat
              className=""
              clr="bg-orange-500 hover:bg-orange-600 transition-all duration-500 ease-in-out "
              text="Learn More"
            /></a></Link>
          </div>
        </Carousel.Caption>
      </div>
    </div>
  );
}
