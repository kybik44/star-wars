import { Avatar } from "@mui/material";
import React from "react";
import { getAvatarColor, getAvatarInitial } from "@utils/formatters";
import styles from "./Avatar.module.css";

interface AvatarProps {
  name: string;
  size?: "small" | "medium" | "large" | "xlarge";
  className?: string;
}

const AvatarComponent: React.FC<AvatarProps> = React.memo(({
  name,
  size = "medium",
  className,
}) => {
  const sizeClass = styles[`avatar${size.charAt(0).toUpperCase() + size.slice(1)}`] || styles.avatar;
  const avatarClass = `${styles.avatar} ${sizeClass} ${className || ""}`.trim();

  return (
    <Avatar
      className={avatarClass}
      style={{ backgroundColor: getAvatarColor(name) }}
    >
      {getAvatarInitial(name)}
    </Avatar>
  );
});

AvatarComponent.displayName = 'AvatarComponent';

export default AvatarComponent; 