function isWeekend(date) {
  if (!(date instanceof Date)) {
    throw new Error('Input must be a Date object');
  }
  const day = date.getDay();
  return day === 0 || day === 6;
}

function addDays(date, days) {
  if (!(date instanceof Date)) {
    throw new Error('First argument must be a Date object');
  }
  if (!Number.isInteger(days)) {
    throw new Error('Days must be an integer');
  }
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date) {
  if (!(date instanceof Date)) {
    throw new Error('Input must be a Date object');
  }
  return date.toISOString().split('T')[0];
}

function daysBetween(date1, date2) {
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
    throw new Error('Both arguments must be Date objects');
  }
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

module.exports = { isWeekend, addDays, formatDate, daysBetween };