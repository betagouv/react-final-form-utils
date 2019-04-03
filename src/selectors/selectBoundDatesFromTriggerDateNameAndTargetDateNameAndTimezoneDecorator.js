import createDecorator from 'final-form-calculate'
import moment from 'moment'
import 'moment-timezone'
import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(triggerDateName, targetDateName, timezone) {
  return `${triggerDateName || ''}${targetDateName || ''}${timezone || ''}`
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

        let targetMoment = moment(targetDate).utc()
        if (timezone) {
          targetMoment = targetMoment.tz(timezone)
        }

        const targetDateHoutMinutes = targetMoment.format('HH:mm')
        const [hour, minutes] = targetDateHoutMinutes.split(':')

        let triggerMoment = moment(triggerDate).utc()
        if (timezone) {
          triggerMoment = triggerMoment.tz(timezone)
        }

        const updatedTargetDate = triggerMoment
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
