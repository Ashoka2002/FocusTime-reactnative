export function StringEllipsis(str, maxLength) {
  if (typeof str !== "string") return "";
  // Check if the string length is greater than the maxLength
  if (str.length > maxLength) {
    // Truncate the string and add ellipsis
    return str.substring(0, maxLength) + "...";
  } else {
    // If the string length is within maxLength, return the original string
    return str;
  }
}
