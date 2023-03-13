import { format, formatDistanceToNow, getUnixTime as getUnixTimeFns, parse } from 'date-fns'

export const getHumanReadableDateFormat = (date: Date, addSuffix = true) => {
  return formatDistanceToNow(date, { addSuffix })
}

export const TIME_FORMAT = 'hh:mm aaa'

export const parseTime = (dateString: string) => {
  return parse(dateString, TIME_FORMAT, new Date())
}

export const formatTime = (date: Date) => {
  return format(date, TIME_FORMAT)
}

export const getUnixTime: typeof getUnixTimeFns = (date) => getUnixTimeFns(date)

export enum WeekDays {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}

export enum WeekShifts {
  Morning,
  Afternoon,
  Evening
}
