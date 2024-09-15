export function joinArrayWithAnd(array: string[], capitalizeItems = false) {
  if (array.length === 0) return "";

  // Helper function to capitalize strings
  const capitalizeStr = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const formattedArray = capitalizeItems
    ? array.map((item) => capitalizeStr(item))
    : array;

  if (formattedArray.length === 1) return formattedArray[0];

  if (formattedArray.length === 2) return formattedArray.join(" and ");

  // For more than two items
  const allButLast = formattedArray.slice(0, -1).join(", ");
  const lastItem = formattedArray[formattedArray.length - 1];

  return `${allButLast} and ${lastItem}`;
}
