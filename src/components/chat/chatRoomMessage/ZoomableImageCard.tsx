import { CardContent } from "@/components/ui/card";
import { SafeImage } from "@/components/utility/SafeImage";
import { ImagePreview } from "@/context/ImagePreviewContext";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchContentRef,
} from "react-zoom-pan-pinch";

const ZoomableImageCard = ({
  src,
  toggleCarouselSwipeable,
}: {
  src: ImagePreview;
  toggleCarouselSwipeable?: (state: boolean) => void;
}) => {
  const [scale, setScale] = useState(1);
  const transformComponentRef = useRef<ReactZoomPanPinchContentRef>(null);
  const [isPanningEnabled, setIsPanningEnabled] = useState(false);

  const handleZoomChange = useCallback((ref: any) => {
    if (ref.state) {
      setScale(ref.state.scale);
      setIsPanningEnabled(ref.state.scale > 1);
    }
    if (!transformComponentRef.current) return;
  }, []);

  useEffect(() => {
    if (toggleCarouselSwipeable) toggleCarouselSwipeable(!isPanningEnabled);
  }, [toggleCarouselSwipeable, isPanningEnabled]);

  const controlStyles =
    "rounded-full bg-white p-2 text-gray-700 shadow-[0_4px_6px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.06)] transition-all duration-200 ease-in-out hover:shadow-[0_6px_8px_rgba(0,0,0,0.15),0_3px_6px_rgba(0,0,0,0.1)] hover:bg-gray-50 active:scale-95";

  return (
    <div className="relative h-full w-full overflow-hidden">
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
        minScale={0.1}
        maxScale={8}
        limitToBounds={true}
        centerZoomedOut
        centerOnInit
        wheel={{
          step: 0.1,
        }}
        pinch={{ disabled: false }}
        doubleClick={{ mode: "reset", step: 10 }}
        panning={{
          disabled: !isPanningEnabled,
          velocityDisabled: false,
          lockAxisX: false,
          lockAxisY: false,
        }}
        onZoom={handleZoomChange}
        onZoomStop={handleZoomChange}
        ref={transformComponentRef}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div
              className={`absolute left-4 top-4 z-10 px-3 py-1 text-sm ${controlStyles}`}
            >
              {Math.round(scale * 100)}%
            </div>
            <div className="absolute right-4 top-4 z-10 flex justify-center space-x-2">
              <button
                onClick={() => {
                  zoomIn(0.1);
                  const newScale = Math.min(8, scale + 0.1);
                  setScale(newScale);
                  if (isPanningEnabled !== newScale > 1)
                    setIsPanningEnabled(newScale > 1);
                }}
                className={controlStyles}
                aria-label="Zoom in"
              >
                <ZoomIn size={18} />
              </button>
              <button
                onClick={() => {
                  zoomOut(0.1);
                  const newScale = Math.max(0, scale - 0.1);
                  setScale(newScale);
                  if (isPanningEnabled !== newScale > 1)
                    setIsPanningEnabled(newScale > 1);
                }}
                className={controlStyles}
                aria-label="Zoom out"
              >
                <ZoomOut size={18} />
              </button>
              <button
                onClick={() => {
                  resetTransform();
                  setScale(1);
                  setIsPanningEnabled(false);
                }}
                className={controlStyles}
                aria-label="Reset zoom"
              >
                <RotateCcw size={18} />
              </button>
            </div>
            <TransformComponent
              wrapperClass="!w-full !h-full"
              contentClass="!w-full !h-full"
            >
              <CardContent className="relative flex h-full w-full items-center justify-center p-0">
                <div className="relative h-full w-full">
                  <SafeImage
                    src={src.url}
                    alt="Zoomable preview image"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "contain" }}
                    className="rounded-lg"
                    draggable={false}
                  />
                </div>
              </CardContent>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default ZoomableImageCard;
