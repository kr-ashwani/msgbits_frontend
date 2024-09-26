import React, { useRef, useEffect, ReactNode, useCallback } from "react";

interface SwipeRightToReplyProps {
  children: ReactNode;
  onReply: () => void;
  thresholdPx?: number;
  leftBufferPx?: number;
  minSwipePx?: number;
  className?: string;
}

const SwipeRightToReply: React.FC<SwipeRightToReplyProps> = ({
  children,
  onReply,
  thresholdPx = 50,
  leftBufferPx = 20,
  minSwipePx = 2,
  className = "",
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const isScrollingRef = useRef(false);
  const hasReachedThresholdRef = useRef(false);

  const handleMove = useCallback(
    (deltaX: number) => {
      if (Math.abs(deltaX) > minSwipePx && elementRef.current) {
        // Clamp the translation between 0 and thresholdPx
        const newTranslateX = Math.max(0, Math.min(deltaX, thresholdPx));
        elementRef.current.style.transform = `translateX(${newTranslateX}px)`;

        if (newTranslateX >= thresholdPx && !hasReachedThresholdRef.current) {
          hasReachedThresholdRef.current = true;
          onReply();
        }
      }
    },
    [onReply, minSwipePx, thresholdPx],
  );

  const resetPosition = useCallback(() => {
    if (elementRef.current) {
      elementRef.current.style.transform = "translateX(0)";
      elementRef.current.style.transition = "transform 0.3s ease-out";
    }
    startXRef.current = null;
    startYRef.current = null;
    isDraggingRef.current = false;
    isScrollingRef.current = false;
    hasReachedThresholdRef.current = false;
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;

      const rect = element.getBoundingClientRect();
      const touchStartX = touch.clientX - rect.left;

      if (touchStartX >= leftBufferPx) {
        startXRef.current = touch.clientX;
        startYRef.current = touch.clientY;
        isScrollingRef.current = false;
        hasReachedThresholdRef.current = false;
        element.style.transition = "none";
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (startXRef.current === null || startYRef.current === null) return;

      const touch = e.touches[0];
      if (!touch) return;

      const deltaX = touch.clientX - startXRef.current;
      const deltaY = touch.clientY - startYRef.current;

      if (!isDraggingRef.current && !isScrollingRef.current) {
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          isScrollingRef.current = true;
          return;
        }
        if (Math.abs(deltaX) > minSwipePx) {
          isDraggingRef.current = true;
        }
      }

      if (isScrollingRef.current) return;

      e.preventDefault(); // Prevent scrolling while swiping
      handleMove(deltaX);
    };

    const handleTouchEnd = resetPosition;
    const handleTouchCancel = resetPosition;

    element.addEventListener("touchstart", handleTouchStart);
    element.addEventListener("touchmove", handleTouchMove);
    element.addEventListener("touchend", handleTouchEnd);
    element.addEventListener("touchcancel", handleTouchCancel);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
      element.removeEventListener("touchcancel", handleTouchCancel);
    };
  }, [
    leftBufferPx,
    thresholdPx,
    onReply,
    minSwipePx,
    handleMove,
    resetPosition,
  ]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = elementRef.current?.getBoundingClientRect();
    if (rect) {
      const mouseStartX = e.clientX - rect.left;
      if (mouseStartX >= leftBufferPx) {
        startXRef.current = e.clientX;
        startYRef.current = e.clientY;
        isDraggingRef.current = false;
        isScrollingRef.current = false;
        hasReachedThresholdRef.current = false;
        if (elementRef.current) {
          elementRef.current.style.transition = "none";
        }
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (startXRef.current === null || startYRef.current === null) return;

    const deltaX = e.clientX - startXRef.current;
    const deltaY = e.clientY - startYRef.current;

    if (!isDraggingRef.current && !isScrollingRef.current) {
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        isScrollingRef.current = true;
        return;
      }
      if (Math.abs(deltaX) > minSwipePx) {
        isDraggingRef.current = true;
      }
    }

    if (isScrollingRef.current) return;

    handleMove(deltaX);
  };

  const handleMouseUp = resetPosition;
  const handleMouseLeave = resetPosition;

  return (
    <div
      ref={elementRef}
      className={`swipe-right-to-reply ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default SwipeRightToReply;
