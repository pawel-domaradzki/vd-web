import styles from "../styles/components/PlayBtn.module.scss";
import Image from "next/image";

const PlayBtn = ({ onClick }: PlayButtonProps) => {
  return (
    <button className={styles.playBtn} onClick={onClick}>
      <Image
        className={styles.icon}
        src="/icon-play.svg"
        width="23"
        height="23"
        alt="play"
      />
      <span>Play</span>
    </button>
  );
};

export default PlayBtn;

interface PlayButtonProps {
  onClick: () => void;
}
