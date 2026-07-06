function isEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isStrongPassword(password) {
  if (typeof password !== 'string') return false;
  return password.length >= 8 && 
         /[A-Z]/.test(password) && 
         /[a-z]/.test(password) && 
         /[0-9]/.test(password);
}

function isValidAge(age) {
  return Number.isInteger(age) && age >= 0 && age <= 120;
}

function formatPhoneNumber(number) {
  const cleaned = number.replace(/\D/g, '');
  if (cleaned.length !== 10) {
    throw new Error('Phone number must have 10 digits');
  }
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
}

module.exports = { isEmail, isStrongPassword, isValidAge, formatPhoneNumber };