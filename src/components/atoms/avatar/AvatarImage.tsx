import { Avatar } from "antd";
import { IAvatarImageProps } from "./interfaces";

const AvatarImage = ({
  className,
  src,
  fallback,
  size,
  shape,
}: IAvatarImageProps) => {
  if (!src) {
    return (
      <Avatar size={size} shape={shape} className={className}>
        {fallback}
      </Avatar>
    );
  }

  return (
    <Avatar src={src} size={size} shape={shape}>
      {fallback}
    </Avatar>
  );
};

export default AvatarImage;
