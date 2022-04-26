import { Carousel } from "react-bootstrap";
import styles from "./Carousel.module.scss";
import ButtonPhat from "../Buttons/ButtonPhat";
import Link from "next/link";


export default function Caption(props) {
  return (
    <Carousel.Caption>
   
      <div className="flex flex-col gap-10 bottom-44 relative ">
        <div
          className={` motion-safe: ${styles.aniL} flex justify-center relative max-w-xs md:max-w-5xl`}>
          <h1 className=" text-center  font-bold text-5xl sm:text-7xl ">{props.text}</h1>
        </div>
        
      </div>
    </Carousel.Caption>
  );
}
