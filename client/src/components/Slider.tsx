import styles from "@/styles/components/Slider.module.scss";
import Thumbnail from "./Thumbnail";
import classnames from "classnames";
import { useRef, useState, MouseEvent } from "react";

const Slider = ({ results }) => {
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setscrollLeft] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    setIsDown(true);
    if (sliderRef.current) {
      setStartX(event.pageX - sliderRef.current.offsetLeft);
      setscrollLeft(sliderRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleOnMouseUp = () => {
    setIsDown(false);
  };

  const handleOnMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isDown) return;

    event.preventDefault();
    if (sliderRef.current) {
      const x = event.pageX - sliderRef.current.offsetLeft;
      const walk = (x - startX) * 1.2;
      sliderRef.current.scrollLeft = scrollLeft - walk;
      console.log(walk);
    }

    console.log("handleOnMouseMove");
  };

  return (
    <>
      <h1>Trending</h1>
      <div
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleOnMouseUp}
        onMouseMove={handleOnMouseMove}
        className={classnames(styles.sliderContainer, isDown && styles.active)}
      >
        <div className={styles.fade} />

        <div
          className={classnames(styles.slider, styles.scrollbarHide)}
          ref={sliderRef}
        >
          {results.map((result) => (
            <Thumbnail key={result.id} result={result} isSliderItem />
          ))}
        </div>
      </div>
    </>
  );
};

export default Slider;
