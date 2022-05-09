module.exports = function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}