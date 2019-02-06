export const createParseNumberValue = type => value => {
  if (typeof value === 'undefined') {
    return null
  }
  if (type === "number") {
    if (value.includes('.')) {
      return parseFloat(value)
    }
    return parseInt(value, 10)
  }
  return value
}
