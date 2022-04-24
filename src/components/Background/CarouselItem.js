import { Carousel } from "react-bootstrap";
import styles from "./Carousel.module.css";
import ButtonPhat from "../Buttons/ButtonPhat";
import Link from "next/link";
import Image from "next/image";

export default function Caption(props) {
  return (
    <Carousel.Caption>
      <div className="flex flex-col gap-10 bottom-32 md:-ml-20 relative max-w-md">
        <div className={` ${styles.aniL} flex justify-center md:justify-start relative max-w-screen`}>
          <h1 className=" md:text-left font-bold text-7xl ">
            {props.text}
          </h1>
        </div>
        <div
          className={`${styles.aniR} flex justify-center md:justify-start relative `}>
          <Link href="#about">
            <a className="no-underline text-white">
              <ButtonPhat
                className=""
                clr="bg-orange-500 hover:bg-orange-600 transition-all duration-500 ease-in-out "
                text="Learn More"
              />
            </a>
          </Link>
        </div>
      </div>
    </Carousel.Caption>
  );
}
