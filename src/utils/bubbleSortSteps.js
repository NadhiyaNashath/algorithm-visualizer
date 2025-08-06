export function getBubbleSortSteps(array) {
  const steps = [];
  const arr = array.slice();
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      // Mark comparison
      steps.push({
        array: arr.slice(),
        comparing: [j, j + 1],
        swapped: null, // Changed from false to null
        sortedIndices: Array.from({length: i}, (_, k) => n - 1 - k),
      });

      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        steps.push({
          array: arr.slice(),
          comparing: null, // Changed from [j, j + 1] to null
          swapped: [j, j + 1], // Changed from true to [j, j + 1]
          sortedIndices: Array.from({length: i}, (_, k) => n - 1 - k),
        });
      }
    }
  }

  // Final sorted state
  steps.push({
    array: arr.slice(),
    comparing: null, // Changed from [] to null
    swapped: null, // Changed from false to null
    sortedIndices: Array.from({length: n}, (_, k) => k),
  });

  return steps;
}