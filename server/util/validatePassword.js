
module.exports = function invalidPassword(str) {
  const minLength = 6;
  const maxLength = 30;
  if (str.length < minLength) {
    return `Password length is ${str.length} and must be at least ${minLength} characters`
  } else if (str.length > maxLength) {
    return `Password length is ${str.length} and cannot be longer than ${maxLength} characters`
  }
  return false
}