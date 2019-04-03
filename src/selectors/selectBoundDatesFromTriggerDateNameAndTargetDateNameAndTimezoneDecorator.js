import createDecorator from 'final-form-calculate'
import moment from 'moment'
import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(triggerDateName, targetDateName, tz) {
  return `${triggerDateName || ''}${targetDateName || ''}${tz || ''}`
}

export const selectBoundDatesFromTriggerDateNameAndTargetDateNameAndTimezoneDecorator = createCachedSelector(
  triggerDateName => triggerDateName,
  (triggerDateName, targetDateName) => targetDateName,
  (triggerDateName, targetDateName, timezone) => timezone,
  (triggerDateName, targetDateName, timezone) =>
    createDecorator({
      field: triggerDateName,
      updates: (triggerDate, doublonTriggerDateName, allValues) => {

        const targetDate = allValues[targetDateName]
        if (!targetDate) {
          return {}
        }

        let targetDateHoutMinutes = moment(targetDate).utc()

        if (timezone) {
          targetDateHoutMinutes = targetDateHoutMinutes.tz(timezone)
        }

        targetDateHoutMinutes = targetDateHoutMinutes.format('HH:mm')

        const [hour, minutes] = targetDateHoutMinutes.split(':')

        let updatedTargetDate = moment(triggerDate).utc()

        if (timezone) {
          updatedTargetDate = updatedTargetDate.tz(timezone)
        }

        updatedTargetDate = updatedTargetDate
          .hours(hour)
          .minutes(minutes)
          .toISOString()

        return {
          [targetDateName]: updatedTargetDate,
        }
      },
    })
)(mapArgsToCacheKey)

export default selectBoundDatesFromTriggerDateNameAndTargetDateNameAndTimezoneDecorator
