import { useRef, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface DraggablePortalProps {
  children: ReactNode;
}

export function DraggablePortal({ children }: DraggablePortalProps) {
  const mount = useRef(document.body);
  const el = useRef(document.createElement('div'));

  useEffect(() => {
    const mountNode = mount.current;
    const elementNode = el.current;
    mountNode.appendChild(elementNode);
    return () => {
      mountNode.removeChild(elementNode);
    };
  }, []);

  return createPortal(children, el.current);
}
