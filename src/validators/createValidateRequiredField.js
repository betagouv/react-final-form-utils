import { isEmpty } from '../strings'

export const createValidateRequiredField = (error, type) => value => {
  if (type == "number" && value !== '') return undefined;
  if (value && !isEmpty(value)) return undefined
  return error
}

export default createValidateRequiredField
