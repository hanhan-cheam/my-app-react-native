import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export const minutesToDayHourMinutes = (minutes: number) => {
  const durationInMin = dayjs.duration(minutes, 'minutes')

  return {
    days: Math.floor(durationInMin.asDays()),
    hours: durationInMin.hours(),
    minutes: durationInMin.minutes(),
  }
}

export const formatDayHourMinutes = ({
  days,
  hours,
  minutes,
}: {
  days: number
  hours: number
  minutes: number
}) => {
  if (!days && !hours && !minutes) {
    return 'a few seconds'
  }

  return `${days ? `${days} day ` : ''}${hours ? `${hours} hr ` : ''}${
    minutes ? `${minutes} min` : ''
  }`
}

export const formatMinutesToDayHourMinutes = (minutes: number) => {
  return formatDayHourMinutes(minutesToDayHourMinutes(minutes))
}
