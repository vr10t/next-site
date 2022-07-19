import { Carousel } from "react-bootstrap";
import Link from "next/link";
import styles from "./Carousel.module.scss";
import ButtonPhat from "../Buttons/ButtonPhat";


export default function Caption(props) {
  return (
    <Carousel.Caption>
   
      <div className="flex flex-col gap-10 bottom-44 lg:bottom-72 relative ">
        <div
          className={` motion-safe: ${styles.aniL} flex justify-center relative max-w-md sm:max-w-5xl`}>
          <h1 className=" text-center  font-bold text-5xl sm:text-6xl lg:text-7xl">{props.text}</h1>
        </div>
        
      </div>
    </Carousel.Caption>
  );
}
