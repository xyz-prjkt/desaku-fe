import { ReactNode } from 'react';

export interface IAvatarImageProps {
  src?: string | null;
  fallback?: ReactNode;
  size?: 'default' | 'small' | 'large' | number;
  shape?: 'circle' | 'square';
}
