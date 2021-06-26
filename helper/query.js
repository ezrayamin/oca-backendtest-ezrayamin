module.exports = {
    showDateTime: () => {
        const getDeafaultDate = new Date

        const year = getDeafaultDate.getFullYear()
        const month = getDeafaultDate.getMonth() + 1
        const day = getDeafaultDate.getDate()
        const date = `${year}-${month}-${day} `

        const hour = getDeafaultDate.getHours()
        const minute = getDeafaultDate.getMinutes()
        const second = getDeafaultDate.getSeconds()
        const time = `${hour}:${minute}`

        const result = date + time
        return result
    },
    setNumber: (number) => {
        const str = number.toString()
        const pad = "00"
        let res = pad.substring(str.length) + str

        return res
    }
}