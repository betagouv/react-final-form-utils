export const createParseNumberValue = type => value => {
  if (typeof value === 'undefined') {
    return null
  }

    let stringifiedNumberValue = value
    if (typeof stringifiedNumberValue !== 'string') {
        stringifiedNumberValue = String(value)
    }

    if (stringifiedNumberValue === '') {
        return ''
    }

    if (type === 'number') {
        let number
        if (stringifiedNumberValue.includes('.')) {
            number = parseFloat(stringifiedNumberValue)
        } else if (stringifiedNumberValue.includes(',')) {
            const formattedValue = stringifiedNumberValue.replace(/,/g, '.')
            number = parseFloat(formattedValue)
        } else {
            number = parseInt(stringifiedNumberValue, 10)
        }
        return number
    }

    return stringifiedNumberValue
}
