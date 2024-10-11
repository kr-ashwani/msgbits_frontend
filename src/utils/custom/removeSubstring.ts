/**
 * Removes all occurrences of a substring from a string.
 * @param originalString The string to modify.
 * @param substringToRemove The substring to remove from the original string.
 * @returns A new string with all occurrences of the substring removed.
 */
export function removeSubstring(
  originalString: string,
  substringToRemove: string,
): string {
  // Check if the substring exists in the original string
  if (originalString.includes(substringToRemove)) {
    // Use replace method with a global flag to remove all occurrences
    return originalString.replace(new RegExp(substringToRemove, "g"), "");
  } else {
    // If substring not found, return the original string
    return originalString;
  }
}
