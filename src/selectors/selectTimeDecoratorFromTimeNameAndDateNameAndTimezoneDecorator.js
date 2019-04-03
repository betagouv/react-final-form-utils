import moment from 'moment'
import 'moment-timezone'
import createDecorator from 'final-form-calculate'
import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(timeName, dateName, timezone) {
  return `${timeName || ''}${dateName || ''}${timezone || ''}`
}

export const selectTimeDecoratorFromTimeNameAndDateNameAndTimezoneDecorator = createCachedSelector(
  timeName => timeName,
  (timeName, dateName) => dateName,
  (timeName, dateName, timezone) => timezone,
  (timeName, dateName, timezone) =>
    createDecorator(
      {
        field: timeName,
        updates: (time, doublonTimeName, allValues) => {

          const date = allValues[dateName]
          if (!date) {
            return {}
          }

          let previousDateMoment = moment(date).utc()
          if (timezone) {
            previousDateMoment = previousDateMoment.tz(timezone)
          }

          const previousTime = previousDateMoment.format("HH:mm")
          if (!time) {
            return {
              [timeName]: previousTime
            }
          }

          if (previousTime === time) {
            return {}
          }

          const [hour, minutes] = time.split(':')
          const updatedDate = previousDateMoment
            .hours(hour)
            .minutes(minutes)
            .toISOString()

          return {
            [dateName]: updatedDate,
          }
        },
      },
      {
        field: dateName,
        updates: (date, doublonDateName, allValues) => {

          let dateMoment = moment(date).utc()
          if (timezone) {
            dateMoment = dateMoment.tz(timezone)
          }

          const updatedTime = dateMoment.format('HH:mm')

          const time = allValues[timeName]
          if (time) {

            if (updatedTime === time) {
              return {}
            }

            const [hour, minutes] = time.split(':')
            const updatedDate = dateMoment
              .hours(hour)
              .minutes(minutes)
              .toISOString()

            return {
              [dateName]: updatedDate,
            }
          }

          return {
            [timeName]: updatedTime,
          }
        },
      }
    )
)(mapArgsToCacheKey)

export default selectTimeDecoratorFromTimeNameAndDateNameAndTimezoneDecorator
