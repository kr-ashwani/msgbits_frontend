import React, { ReactNode, useState, useRef } from "react";
import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";

interface SwipeRightToReplyProps {
  children: ReactNode;
  className?: string;
  onReply: () => void;
  thresholdPx?: number;
  leftBufferPx?: number;
}

const SwipeRightToReply: React.FC<SwipeRightToReplyProps> = ({
  children,
  className = "",
  onReply,
  thresholdPx = 50,
  leftBufferPx = 20,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const thresholdReachedRef = useRef(false);
  const dragStartXRef = useRef<number | null>(null);

  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  const bind = useDrag(
    ({ active, movement: [mx], cancel, event }) => {
      if (active && dragStartXRef.current === null) {
        const touch =
          (event as TouchEvent).touches?.[0] || (event as MouseEvent);
        const rect = (
          event.currentTarget as HTMLElement
        ).getBoundingClientRect();
        dragStartXRef.current = touch.clientX - rect.left;

        if (dragStartXRef.current < leftBufferPx) {
          cancel();
          return;
        }
      }

      if (active && mx < 0) {
        cancel();
      }

      if (active && mx > 0) {
        setIsDragging(true);
        if (mx >= thresholdPx && !thresholdReachedRef.current) {
          thresholdReachedRef.current = true;
          api.start({ x: thresholdPx, immediate: true });
          onReply();
        } else if (!thresholdReachedRef.current) {
          api.start({ x: mx, immediate: true });
        }
      } else {
        setIsDragging(false);
        api.start({
          x: 0,
          immediate: false,
          config: { tension: 500, friction: 30 },
        });
        thresholdReachedRef.current = false;
        dragStartXRef.current = null;
      }
    },
    {
      axis: "x",
      bounds: { left: 0, right: thresholdPx },
      rubberband: true,
      from: () => [x.get(), 0],
    },
  );

  const progress = x
    .to([0, thresholdPx], [0, 100])
    .to((p) => `${Math.min(p, 100).toFixed(0)}%`);

  const swipeIndicatorStyle = useSpring({
    opacity: isDragging ? 1 : 0,
    config: { tension: 300, friction: 10 },
  });

  return (
    <div className="relative w-full" ref={elementRef}>
      <animated.div
        {...bind()}
        className={`w-full touch-pan-y ${className}`}
        style={{ x }}
      >
        {children}
      </animated.div>
    </div>
  );
};

export default SwipeRightToReply;
