import moment from 'moment'
import createDecorator from 'final-form-calculate'
import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(timeName, dateName, tz) {
  return `${timeName || ''}${dateName || ''}${tz || ''}`
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
          if (!time) {
            return {}
          }

          const [hour, minutes] = time.split(':')
          const date = allValues[dateName]

          if (!date) {
            return {}
          }

          const previousDate = moment(date).utc()
          let updatedDate = previousDate

          if (timezone) {
            updatedDate = updatedDate.tz(timezone)
          }

          const previousTime = updatedDate.format("HH:mm")

          updatedDate = updatedDate
            .hours(hour)
            .minutes(minutes)
            .toISOString()

          if (previousTime === time) {
            return {}
          }

          return {
            [dateName]: updatedDate,
          }
        },
      },
      {
        field: dateName,
        updates: (date, doublonDateName, allValues) => {

          let momentDate = moment(date).utc()
          if (timezone) {
            momentDate = momentDate.tz(timezone)
          }

          const updatedTime = momentDate.format('HH:mm')

          const time = allValues[timeName]
          if (time) {
            if (updatedTime === time) {
              return {}
            }
            const [hour, minutes] = time.split(':')
            const updatedDate = momentDate
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
