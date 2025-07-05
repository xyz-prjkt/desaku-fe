import { ReactNode } from "react";

export interface IAvatarImageProps {
  className?: string;
  src?: string | null;
  fallback?: ReactNode;
  size?: "default" | "small" | "large" | number;
  shape?: "circle" | "square";
}
