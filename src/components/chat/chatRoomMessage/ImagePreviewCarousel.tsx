import React, { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import {
  CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ZoomableImageCard from "./ZoomableImageCard";
import { ImagePreviewState } from "@/lib/store/features/chat/chatRoomDataSlice";

const ImagePreviewCarousel: React.FC<{
  imagePreview: ImagePreviewState;
}> = ({ imagePreview }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isSwipeable, setIsSwipeable] = useState(true);

  useEffect(() => {
    if (imagePreview.initialImageCursor !== undefined && api) {
      api.scrollTo(imagePreview.initialImageCursor);
    }
  }, [imagePreview.initialImageCursor, api]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    setCount(api.scrollSnapList().length);
    onSelect(); // Set initial current value

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const toggleSwipeable = useCallback((state: boolean) => {
    setIsSwipeable(state);
  }, []);

  return (
    <div className="flex grow flex-col justify-center overflow-hidden py-7">
      <Carousel
        setApi={setApi}
        className="max-h-[600px] w-[calc(100%-10px)] grow translate-x-[5px] snap-none"
        opts={{ watchDrag: isSwipeable }}
      >
        <CarouselContent className="h-full">
          {imagePreview.images.map((image, index) => (
            <CarouselItem key={image.fileId || index} className="h-full">
              <Card className="h-full border-none outline-none">
                <ZoomableImageCard
                  src={image}
                  toggleCarouselSwipeable={toggleSwipeable}
                />
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ImagePreviewCarousel;
