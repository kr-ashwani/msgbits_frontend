export function getCurrentTranslateX(element: HTMLElement) {
  // Get the computed style of the element
  const style = window.getComputedStyle(element);

  // Get the transform property value
  const matrix = style.transform;

  // Parse the matrix to get the translateX value
  const matrixValues = matrix.match(/matrix.*\((.+)\)/);
  if (matrixValues) {
    const values = matrixValues[1].split(", ");
    // TranslateX is the fourth value in the matrix
    const translateX = parseFloat(values[4]);
    return translateX;
  }

  return 0; // Default to 0 if no transform is found
}
