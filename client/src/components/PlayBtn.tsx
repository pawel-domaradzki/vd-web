import { useFetch } from "@/utils/hooks/useFetch";
import styles from "../styles/components/PlayBtn.module.scss";
import Image from "next/image";
import { getVideo } from "@/utils/requests";
import axios from "axios";
import { useState } from "react";
import ReactPlayer from "react-player";

const PlayBtn = ({ id, type }: PlayButtonProps) => {
  const [showModal, setShowModal] = useState(false);
  const [embedUrl, setEmbedUrl] = useState("");

  const handlePlay = async () => {
    const videosQuery = getVideo(id, type);
    console.log(id, type);

    if (!videosQuery) return;

    const { data } = await axios.get(videosQuery);
    const embedUrl = `https://www.youtube.com/embed/${data.key}?controls=0`;
    setEmbedUrl(embedUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEmbedUrl("");
  };

  return (
    <>
      <button className={styles.playBtn} onClick={handlePlay}>
        <Image
          className={styles.icon}
          src="/icon-play.svg"
          width="23"
          height="23"
          alt="play"
        />
        <span>Play</span>
      </button>
      {showModal && (
        <div className={styles.modal}>
          <button className={styles.closeModal} onClick={closeModal}>
            <span>X</span> Close
          </button>
          <ReactPlayer
            url={embedUrl}
            controls={true}
            playing={true}
            width="89%"
            height="89%"
          />
        </div>
      )}
    </>
  );
};

export default PlayBtn;

interface PlayButtonProps {
  id: string | number;
  type: string;
}
