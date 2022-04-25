import { Carousel } from "react-bootstrap";
import styles from "./Carousel.module.css";
import ButtonPhat from "../Buttons/ButtonPhat";
import Link from "next/link";


export default function Caption(props) {
  return (
    <Carousel.Caption>
   
      <div className="flex flex-col gap-10 bottom-32 relative bg-black">
        <div
          className={` ${styles.aniL} flex justify-center relative max-w-screen`}>
          <h1 className=" text-center font-bold text-7xl ">{props.text}</h1>
        </div>
        <div
          className={`${styles.aniR} flex justify-center relative `}>
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
