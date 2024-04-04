function useTrimString(str, maxLength) {
  if (str.length > maxLength) {
    // Clip the string to the desired length and add an ellipsis
    return str.slice(0, maxLength - 1) + "...";
  }
  return str; // If the string is already within the limit, return it as is
}

export default useTrimString;
