function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchData(url) {
  if (!url) {
    throw new Error('URL is required');
  }
  
  await delay(100); 
  if (url.includes('error')) {
    throw new Error('Network error');
  }
  
  return { data: 'Mock data', url };
}

async function processArray(array) {
  if (!Array.isArray(array)) {
    throw new Error('Input must be an array');
  }
  
  await delay(50);
  return array.map(x => x * 2);
}

module.exports = { delay, fetchData, processArray };