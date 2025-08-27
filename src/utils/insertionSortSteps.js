export function getInsertionSortSteps(array) {
  const steps = [];
  const arr = array.slice();
  const n = arr.length;

  // Initial state - first element is considered sorted
  steps.push({
    array: arr.slice(),
    comparing: null,
    swapped: null,
    sortedIndices: [0],
    currentKey: null,
    insertingAt: null
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    // Show the key we're currently inserting
    steps.push({
      array: arr.slice(),
      comparing: null,
      swapped: null,
      sortedIndices: Array.from({length: i}, (_, k) => k),
      currentKey: i,
      insertingAt: null
    });

    // Find the correct position for the key
    while (j >= 0) {
      // Mark comparison between key and current element
      steps.push({
        array: arr.slice(),
        comparing: [j, i],
        swapped: null,
        sortedIndices: Array.from({length: i}, (_, k) => k),
        currentKey: i,
        insertingAt: null
      });

      if (arr[j] > key) {
        // Shift element to the right
        arr[j + 1] = arr[j];
        
        steps.push({
          array: arr.slice(),
          comparing: null,
          swapped: [j, j + 1],
          sortedIndices: Array.from({length: i}, (_, k) => k),
          currentKey: i,
          insertingAt: null
        });

        j--;
      } else {
        break;
      }
    }

    // Insert the key at its correct position
    arr[j + 1] = key;
    
    steps.push({
      array: arr.slice(),
      comparing: null,
      swapped: null,
      sortedIndices: Array.from({length: i + 1}, (_, k) => k),
      currentKey: null,
      insertingAt: j + 1
    });
  }

  // Final sorted state
  steps.push({
    array: arr.slice(),
    comparing: null,
    swapped: null,
    sortedIndices: Array.from({length: n}, (_, k) => k),
    currentKey: null,
    insertingAt: null
  });

  return steps;
}