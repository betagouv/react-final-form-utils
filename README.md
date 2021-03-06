# react-final-form-utils

Decorators, validators and string helpers for classic email, password, loading fields in a react final form

[![CircleCI](https://circleci.com/gh/betagouv/react-final-form-utils/tree/master.svg?style=svg)](https://circleci.com/gh/betagouv/react-final-form-utils/tree/master)
[![npm version](https://img.shields.io/npm/v/react-final-form-utils.svg?style=flat-square)](https://npmjs.org/package/react-final-form-utils)


## Basic Usage

For a typical TextField input:

```javascript

/* eslint
  react/jsx-one-expression-per-line: 0 */
import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'
import {
  composeValidators,
  config,
  createParseNumberValue,
  createValidateRequiredField
} from 'react-final-form-utils'

import { FieldError } from '../layout'

const validateRequiredField = createValidateRequiredField(config.DEFAULT_REQUIRED_ERROR)

export const TextField = ({
  autoComplete,
  className,
  disabled,
  id,
  label,
  name,
  placeholder,
  readOnly,
  renderInner,
  renderValue,
  required,
  type,
  validate,
}) => {

  const requiredValidate =
    required && typeof required === 'function'
      ? required
      : (required && validateRequiredField) || undefined

  return (
    <Field
      name={name}
      validate={composeValidators(validate, requiredValidate)}
      parse={createParseNumberValue(type)}
      render={({ input, meta }) => (
        <div
          className={classnames("field text-field",
            className, { readonly: readOnly })}
          id={id}
        >
          <label htmlFor={name} className={classnames("field-label", { empty: !label })}>
            {label && (
              <span>
                <span>{label}</span>
                {required && !readOnly && <span className="field-asterisk">*</span>}
              </span>
            )}
          </label>
          <div className="field-control">
            <div className="field-value flex-columns items-center">
              <div className="field-inner flex-columns items-center">
                <input
                  {...input}
                  autoComplete={autoComplete ? 'on' : 'off'}
                  className={`field-input field-${type}`}
                  disabled={disabled || readOnly}
                  placeholder={readOnly ? '' : placeholder}
                  readOnly={readOnly}
                  required={!!required} // cast to boolean
                  type={type}
                />
                {renderInner()}
              </div>
              {renderValue()}
            </div>
            <FieldError meta={meta} />
          </div>
        </div>
      )}
    />
  )
}

TextField.defaultProps = {
  autoComplete: false,
  className: '',
  disabled: false,
  id: null,
  label: '',
  placeholder: 'Please enter a value',
  readOnly: false,
  renderInner: () => null,
  renderValue: () => null,
  required: false,
  type: 'text',
  validate: null,
}

TextField.propTypes = {
  autoComplete: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  renderInner: PropTypes.func,
  renderValue: PropTypes.func,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  type: PropTypes.string,
  validate: PropTypes.func,
}

export default TextField
```
