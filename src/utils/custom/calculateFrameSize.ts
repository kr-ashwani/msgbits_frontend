const MAX_FRAME_WIDTH = 300;
const MAX_FRAME_HEIGHT = 700;

export interface Dimensions {
  width: number;
  height: number;
}

/**
 * Calculates the optimal frame size for image/video while maintaining aspect ratio
 * @param imgWidth - The original width of the image/video
 * @param imgHeight - The original height of the image/video
 * @param maxWidth - The maximum allowed width (default: 300)
 * @param maxHeight - The maximum allowed height (default: 700)
 * @returns An object containing the calculated width and height
 * @throws {Error} If image dimensions are invalid
 */
export function calculateFrameSize(
  imgWidth: number,
  imgHeight: number,
  maxWidth: number = MAX_FRAME_WIDTH,
  maxHeight: number = MAX_FRAME_HEIGHT,
): Dimensions {
  // Early validation
  if (
    !Number.isFinite(imgWidth) ||
    !Number.isFinite(imgHeight) ||
    imgWidth <= 0 ||
    imgHeight <= 0
  ) {
    throw new Error("Invalid image dimensions");
  }

  // If the image fits within the max dimensions, return its original size
  if (imgWidth <= maxWidth && imgHeight <= maxHeight) {
    return { width: imgWidth, height: imgHeight };
  }

  const aspectRatio = imgWidth / imgHeight;

  // Calculate both scenarios
  const byWidth: Dimensions = {
    width: maxWidth,
    height: Math.round(maxWidth / aspectRatio),
  };

  const byHeight: Dimensions = {
    width: Math.round(maxHeight * aspectRatio),
    height: maxHeight,
  };

  // Choose the scenario that fits within both constraints
  if (byWidth.height <= maxHeight) {
    return byWidth;
  } else if (byHeight.width <= maxWidth) {
    return byHeight;
  } else {
    // If neither fits, choose the one that's closest to the target aspect ratio
    const frameAspectRatio = maxWidth / maxHeight;
    return Math.abs(aspectRatio - frameAspectRatio) <
      Math.abs(1 / aspectRatio - frameAspectRatio)
      ? byWidth
      : byHeight;
  }
}
