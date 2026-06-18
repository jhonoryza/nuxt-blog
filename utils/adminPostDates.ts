const pad = (value: number) => String(value).padStart(2, '0')

const monthMap: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
}

const createLocalDate = (
  year: number,
  month: number,
  day: number,
  hours = 0,
  minutes = 0,
  seconds = 0,
) => {
  const date = new Date(year, month, day, hours, minutes, seconds)
  return Number.isNaN(date.getTime()) ? null : date
}

export const parseAdminPostDate = (value: string | Date | null | undefined) => {
  if (!value) return null

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value
  }

  const sqlStyleMatch = value.match(
    /^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?$/,
  )
  if (sqlStyleMatch) {
    const [, year, month, day, hours = '00', minutes = '00', seconds = '00'] = sqlStyleMatch
    return createLocalDate(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hours),
      Number(minutes),
      Number(seconds),
    )
  }

  const utcLabelMatch = value.match(
    /^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{2}|\d{4})\s+(\d{2}):(\d{2})(?::(\d{2}))?\s+UTC$/,
  )
  if (utcLabelMatch) {
    const [, day, monthLabel, yearValue, hours, minutes, seconds = '00'] = utcLabelMatch
    const month = monthMap[monthLabel.toLowerCase()]
    if (month !== undefined) {
      const fullYear = yearValue.length === 2 ? 2000 + Number(yearValue) : Number(yearValue)
      return createLocalDate(
        fullYear,
        month,
        Number(day),
        Number(hours),
        Number(minutes),
        Number(seconds),
      )
    }
  }

  const directDate = new Date(value)
  return Number.isNaN(directDate.getTime()) ? null : directDate
}

export const formatAdminPostDate = (value: string | Date | null | undefined) => {
  const date = parseAdminPostDate(value)
  if (!date) return null

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}
