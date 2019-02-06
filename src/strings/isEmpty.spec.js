/* eslint no-console: 0, max-nested-callbacks: 0 */
import { isEmpty } from './isEmpty'

describe('src | utils | strings | isEmpty', () => {
  it('return false', () => {
    const expected = false
    let value = false
    let received = isEmpty(value)
    expect(received).toEqual(expected)
    value = null
    received = isEmpty(value)
    expect(received).toEqual(expected)
    value = 1234
    received = isEmpty(value)
    expect(received).toEqual(expected)
    value = 0
    received = isEmpty(value)
    expect(received).toEqual(expected)
    value = undefined
    received = isEmpty(value)
    expect(received).toEqual(expected)
    value = null
    received = isEmpty(value)
    expect(received).toEqual(expected)
    value = []
    received = isEmpty(value)
    expect(received).toEqual(expected)
    value = {}
    received = isEmpty(value)
    expect(received).toEqual(expected)
  })
  it('return true', () => {
    const expected = true
    let value = '     '
    let received = isEmpty(value)
    expect(received).toEqual(expected)
    value = ''
    received = isEmpty(value)
    expect(received).toEqual(expected)
  })
})
