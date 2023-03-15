import Image from "next/image";
import styles from "../styles/components/Thumbnail.module.scss";
import Tv from "../assets/icon-nav-tv-series.svg";
import Movie from "../assets/icon-nav-movies.svg";
import PlayBtn from "./PlayBtn";
import Bookmark from "./Bookmark";
import { FC } from "react";

interface ThumbnailProps {
  result: any;
  isSliderItem?: boolean;
}

const Thumbnail: FC<ThumbnailProps> = ({ result, isSliderItem }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original";

  const {
    backdrop_path,
    poster_path,
    first_air_date,
    release_date,
    adult,
    title,
    name,
    original_name,
    media_type,
  } = result;

  const {
    thumbnail,
    imageContainer,
    image,
    description,
    mediaType,
    icon,
    sliderThumbnail,
    descriptionContainer,
  } = styles;

  const releaseFullYear = new Date(
    first_air_date || release_date
  ).getFullYear();

  const fullSrcUrl = `${BASE_URL}${backdrop_path || poster_path || ''}`
   
 

  const thumbnailVariant = isSliderItem ? sliderThumbnail : thumbnail;
  return (
    <div className={thumbnailVariant}>
      <div className={imageContainer}>
        <Image
          src={fullSrcUrl}
          alt="thumbnail"
          width={280}
          height={174}
          className={image}
        />
        <Bookmark />
        <PlayBtn />
      </div>
      <div className={descriptionContainer}>
        <div className={description}>
          <div>{releaseFullYear}</div>
          <>&#8226;</>
          <div className={mediaType}>
            {media_type === "movie" ? (
              <div>
                <Movie className={icon} />
                Movie
              </div>
            ) : (
              <div>
                <Tv className={icon} />
                TV
              </div>
            )}
          </div>
          <>&#8226;</>
          <div>{adult ? "+18" : "PG"} </div>
        </div>
        <h1>{title || name || original_name}</h1>
      </div>
    </div>
  );
};

export default Thumbnail;
