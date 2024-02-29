export function useSearch(arr, target) {
  // Set the initial indices
  arr = arr.sort((a, b) => a.id - b.id);
  let left = 0;
  let right = arr.length - 1;

  // Continue the search while the left index is less than or equal to the right index
  while (left <= right) {
    // Calculate the mid index
    let mid = Math.floor((left + right) / 2);

    // Check if the target is at the mid index
    if (arr[mid] === target) {
      return mid;
    }

    // If the target is less than the element at the mid index, search the left half
    else if (arr[mid] > target) {
      right = mid - 1;
    }

    // If the target is greater than the element at the mid index, search the right half
    else {
      left = mid + 1;
    }
  }
  // If the target is not found, return -1

  return -1;
}
