export function joinArrayWithAnd(array: string[]) {
  if (array.length === 0) return "";

  if (array.length === 1) return array[0];

  if (array.length === 2) return array.join(" and ");

  // For more than two items
  const allButLast = array.slice(0, -1).join(", ");
  const lastItem = array[array.length - 1];

  return `${allButLast} and ${lastItem}`;
}
