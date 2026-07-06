function capitalize(str) {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function reverse(str) {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }
  return str.split('').reverse().join('');
}

function isPalindrome(str) {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === reverse(cleaned);
}

function countVowels(str) {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }
  const vowels = str.match(/[aeiouAEIOU]/g);
  return vowels ? vowels.length : 0;
}

module.exports = { capitalize, reverse, isPalindrome, countVowels };