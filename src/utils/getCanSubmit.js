export const getCanSubmit = config => {
  if (!config) {
    throw new Error('getCanSubmit: Missing arguments')
  }
  const { isLoading, ...reactFinalFormProps } = config
  // https://github.com/final-form/final-form#formstate
  const {
    dirtySinceLastSubmit,
    hasSubmitErrors,
    hasValidationErrors,
    pristine,
  } = reactFinalFormProps

  const canSubmit =
    !isLoading &&
    ((!pristine && !hasSubmitErrors && !hasValidationErrors) ||
      (!hasValidationErrors && hasSubmitErrors && dirtySinceLastSubmit))

  return canSubmit
}

export default getCanSubmit
