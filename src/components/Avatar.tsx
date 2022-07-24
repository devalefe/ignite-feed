import styles from "./Avatar.module.css";

interface AvatarType {
  src: string;
  hasBorder?: boolean;
}

export function Avatar({ src, hasBorder }: AvatarType) {
  return (
    <img
      className={hasBorder ? styles.avatarBordered : styles.avatar}
      src={src}
    />
  );
}
