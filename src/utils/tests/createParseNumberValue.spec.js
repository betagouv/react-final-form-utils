import { createParseNumberValue } from '../createParseNumberValue'

describe('src | strings | createParseNumberValue', () => {
  it('return good parsed text value', () => {
    // given
    let number
    // when
    number = createParseNumberValue('text')(45)
    // then
    expect(number).toEqual("45")

    // when
    number = createParseNumberValue('text')("45.5")
    // then
    expect(number).toEqual("45.5")

    // when
    number = createParseNumberValue('text')("0")
    // then
    expect(number).toEqual("0")

    // when
    number = createParseNumberValue('text')('')
    // then
    expect(number).toEqual('')

    // when
    number = createParseNumberValue('text')(undefined)
    // then
    expect(number).toEqual(null)
  })

  it('return good parsed number value', () => {
    // given
    let number
    // when
    number = createParseNumberValue('number')(45)
    // then
    expect(number).toEqual(45)

    // when
    number = createParseNumberValue('number')(45.5)
    // then
    expect(number).toEqual(45.5)

    // when
    number = createParseNumberValue('number')(0)
    // then
    expect(number).toEqual(0)

    // when
    number = createParseNumberValue('number')('')
    // then
    expect(number).toEqual('')

    // when
    number = createParseNumberValue('number')(undefined)
    // then
    expect(number).toEqual(null)
  })

  it('should return a parsed number when number contains a comma', () => {
    // given
    const numberAsString = '11,1'

    // when
    const result = createParseNumberValue('number')(numberAsString)

    // then
    expect(result).toEqual(11.1)
  })
})
