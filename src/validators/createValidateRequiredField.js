import { isEmpty } from '../strings'

export const createValidateRequiredField = error => value => {
  if (value && !isEmpty(value)) return undefined
  return error
}

export default createValidateRequiredField
