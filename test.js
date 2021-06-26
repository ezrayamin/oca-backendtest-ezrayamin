const from = '2021-6-26 11:19:00'
const now = new Date
const msFrom = Date.parse(from)
const msNow = Date.parse(now)

const difference = msNow - msFrom

const miliToSecond = 1000
const secondsInDay = 86400
const secondsInHour = 3600
const hoursADay = 24
const days = Math.floor(difference / secondsInDay / miliToSecond)
const hours = Math.floor(difference / secondsInHour / miliToSecond) % hoursADay
console.log(days)
console.log(hours)
console.log(now.getSeconds())