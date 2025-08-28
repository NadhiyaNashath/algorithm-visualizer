export function getLinearSearchSteps(array, target) {
  const steps = [];
  const n = array.length;

  for (let i = 0; i < n; i++) {
    // Show the comparison at index i
    steps.push({
      array: array.slice(),
      comparing: i,       // index being compared
      foundIndex: null,   // not found yet
      target
    });

    if (array[i] === target) {
      // Mark the found index
      steps.push({
        array: array.slice(),
        comparing: i,
        foundIndex: i,     // found here
        target
      });
      break; // stop searching
    }
  }

  // If not found, add final step
  if (!steps.some(step => step.foundIndex !== null)) {
    steps.push({
      array: array.slice(),
      comparing: null,
      foundIndex: -1,     // indicates not found
      target
    });
  }

  return steps;
}