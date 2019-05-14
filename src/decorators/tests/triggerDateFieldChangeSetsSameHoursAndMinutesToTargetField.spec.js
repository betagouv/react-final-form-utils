/* eslint-disable no-use-before-define */
import { mount } from 'enzyme'
import 'moment-timezone'
import React from 'react'
import { Field, Form } from 'react-final-form'

import { triggerDateFieldChangeSetsSameHoursAndMinutesToTargetDateField } from '../triggerDateFieldChangeSetsSameHoursAndMinutesToTargetDateField'

describe('src | selectors | triggerDateFieldChangeSetsSameHoursAndMinutesToTargetDateField', () => {
  it('should update the target date to the trigger one with keeping hours and minute of previous target date, when both dates are already initialized', done => {
    // given
    const initialValues = {
      beginningDateTime: "2019-04-27T19:00:00Z",
      endDateTime: "2019-04-27T20:00:00Z"
    }
    const wrapper = mount(
      <Form
        decorators={[
          triggerDateFieldChangeSetsSameHoursAndMinutesToTargetDateField({
            targetDateName: 'endDateTime',
            triggerDateName: 'beginningDateTime'
          })
        ]}
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form>
            <Field
              name="beginningDateTime"
              render={({ input }) => (
                <input {...input} />
              )}
            />
            <Field
              name="endDateTime"
              render={({ input }) => (
                <input {...input} />
              )}
            />
            <button onClick={handleSubmit} type="submit">
              Submit
            </button>
          </form>
        )}
      />
    )

    // when
    wrapper.find(Field)
           .find({ name: "beginningDateTime" })
           .find("input")
           .simulate("change", { target: { value: "2019-04-28T19:00:00.000Z" } })
    wrapper.find('button[type="submit"]').simulate('click')

    // then
    function onSubmit(formValues) {
      expect(formValues.beginningDateTime).toEqual("2019-04-28T19:00:00.000Z")
      expect(formValues.endDateTime).toEqual("2019-04-28T20:00:00.000Z")
      done()
    }
  })

  it('previous test with a timezone', done => {
    // given
    const initialValues = {
      beginningDateTime: "2019-04-27T19:00:00Z",
      endDateTime: "2019-04-27T20:00:00Z"
    }
    const wrapper = mount(
      <Form
        decorators={[
          triggerDateFieldChangeSetsSameHoursAndMinutesToTargetDateField({
            targetDateName: 'endDateTime',
            timezone: 'America/Cayenne',
            triggerDateName: 'beginningDateTime',
          })
        ]}
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form>
            <Field
              name="beginningDateTime"
              render={({ input }) => (
                <input {...input} />
              )}
            />
            <Field
              name="endDateTime"
              render={({ input }) => (
                <input {...input} />
              )}
            />
            <button onClick={handleSubmit} type="submit">
              Submit
            </button>
          </form>
        )}
      />
    )

    // when
    wrapper.find(Field)
           .find({ name: "beginningDateTime" })
           .find("input")
           .simulate("change", { target: { value: "2019-04-28T19:00:00.000Z" } })
    wrapper.find('button[type="submit"]').simulate('click')

    // then
    function onSubmit(formValues) {
      expect(formValues.beginningDateTime).toEqual("2019-04-28T19:00:00.000Z")
      expect(formValues.endDateTime).toEqual("2019-04-28T20:00:00.000Z")
      done()
    }
  })

  it('should not update the target date to the trigger one when target date is not already defined', done => {
    // given
    const initialValues = {
      beginningDateTime: "2019-04-27T19:00:00Z",
    }
    const wrapper = mount(
      <Form
        decorators={[
          triggerDateFieldChangeSetsSameHoursAndMinutesToTargetDateField({
            targetDateName: 'endDateTime',
            triggerDateName: 'beginningDateTime',
          })
        ]}
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form>
            <Field
              name="beginningDateTime"
              render={({ input }) => (
                <input {...input} />
              )}
            />
            <Field
              name="endDateTime"
              render={({ input }) => (
                <input {...input} />
              )}
            />
            <button onClick={handleSubmit} type="submit">
              Submit
            </button>
          </form>
        )}
      />
    )

    // when
    wrapper.find(Field)
           .find({ name: "beginningDateTime" })
           .find("input")
           .simulate("change", { target: { value: "2019-04-28T19:00:00.000Z" } })
    wrapper.find('button[type="submit"]').simulate('click')

    // then
    function onSubmit(formValues) {
      expect(formValues.beginningDateTime).toEqual("2019-04-28T19:00:00.000Z")
      expect(formValues.endDateTime).toEqual(undefined)
      done()
    }
  })

})
