function sumArray(numbers) {
  if (!Array.isArray(numbers)) {
    throw new Error('Input must be an array');
  }
  return numbers.reduce((sum, num) => sum + num, 0);
}

function findMax(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error('Input must be a non-empty array');
  }
  return Math.max(...numbers);
}

function removeDuplicates(array) {
  if (!Array.isArray(array)) {
    throw new Error('Input must be an array');
  }
  return [...new Set(array)];
}

function flatten(array) {
  if (!Array.isArray(array)) {
    throw new Error('Input must be an array');
  }
  return array.flat();
}

module.exports = { sumArray, findMax, removeDuplicates, flatten };