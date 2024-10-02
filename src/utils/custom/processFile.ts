export async function processFile(file: File): Promise<File> {
  // Check if the file is an image
  if (file.type.startsWith("image/")) {
    try {
      // Create a new image object
      const img = new Image();

      // Create a blob URL for the file
      const url = URL.createObjectURL(file);

      // Wait for the image to load
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
      });

      // Create a canvas element
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Calculate new dimensions (max width of 800px)
      const maxWidth = 800;
      let newWidth = img.width;
      let newHeight = img.height;
      if (newWidth > maxWidth) {
        newHeight = (newHeight * maxWidth) / newWidth;
        newWidth = maxWidth;
      }

      // Set canvas dimensions and draw the image
      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx?.drawImage(img, 0, 0, newWidth, newHeight);

      // Convert canvas to blob, preserving original type
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, file.type, 0.85); // Use original file type, adjust quality as needed
      });

      // Clean up
      URL.revokeObjectURL(url);

      if (blob) {
        // Create a new File object with the optimized image, preserving original name and type
        return new File([blob], file.name, {
          type: file.type,
          lastModified: file.lastModified,
        });
      } else {
        throw new Error("Failed to create blob from canvas");
      }
    } catch (error) {
      console.error("Error optimizing image:", error);
      return file; // Return original file if optimization fails
    }
  } else {
    // If it's not an image, return the original file
    return file;
  }
}
