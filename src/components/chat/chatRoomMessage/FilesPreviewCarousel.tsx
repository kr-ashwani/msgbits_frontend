import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useFiles } from "./ChatAreaFooter";
import FilePreview from "./FilePreview";
import { MessageSvg } from "@/components/svg/MessageSvg";

export function FilesPreviewCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const { files, setFiles } = useFiles();

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  function removeFile(fileId: string) {
    setFiles((files) => files.filter((file) => file.fileId !== fileId));
  }

  return (
    <div className="flex grow flex-col justify-center overflow-hidden py-10">
      <Carousel
        setApi={setApi}
        className="max-h-[600px] w-[calc(100%-120px)] grow translate-x-[60px]"
      >
        <CarouselContent className="h-full">
          {files.map((file, index) => (
            <CarouselItem key={file.fileId}>
              <Card className="h-full border-none outline-none">
                <CardContent className="relative flex h-full w-full items-center justify-center p-0">
                  <FilePreview file={file.file} />
                  <div
                    onClick={() => removeFile(file.fileId)}
                    className="absolute right-0 top-0 rounded-full bg-input-bg p-2 font-bold"
                  >
                    {MessageSvg("xIcon", {
                      width: "18",
                      height: "18",
                    })}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
