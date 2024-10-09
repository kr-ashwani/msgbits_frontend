export function getHostnameFromURL(url: string) {
  try {
    // Create a URL object to parse the input URL
    const urlObject = new URL(url);

    return urlObject.hostname;
  } catch (error) {
    return "";
  }
}
