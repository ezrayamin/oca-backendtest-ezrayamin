const { setNumber, showDateTime } = require('../helper/query')

const {dbCars, dbSpaces, dbPrice} = require('../database')

module.exports = {
    resgisterCar: async (req, res) => {
        const { plat_nomor, warna, tipe } = req.body
        
        try {
            if (!plat_nomor || !warna || !tipe) {
                res.status(400).send({peringatan: 'harap input: plat nomor, warna, tipe dari mobil'})
            }

            const lowerCaseColor = warna.toLowerCase()
            const upperCaseType = tipe.toUpperCase()

            const cekCarType = dbPrice.find(name => name.carType === upperCaseType)
            if (!cekCarType) {
                res.status(404).send({peringatan: 'tipe mobil tidak valid'})
            }
            const getDeafaultDate = new Date

            // const hour = getDeafaultDate.getHours()
            // const minute = getDeafaultDate.getMinutes()

            // const timeShown = `${setNumber(hour)}:${setNumber(minute)}`

            const avaialbleSpace = dbSpaces.find(space => space.status == 'available')
            const parking_lot = avaialbleSpace.space

            const registeredData = {
                plat_nomor: plat_nomor,
                parking_lot: parking_lot,
                tanggal_masuk: showDateTime(),
                warna: lowerCaseColor,
                tipe: upperCaseType
            }

            dbCars.push(registeredData)

            const carsinSpecificSpace = dbCars.filter(car => car.parking_lot === parking_lot)

            const totalCarsInLot = carsinSpecificSpace.length
            const tempSpace = dbSpaces.find(parkingLots => parkingLots.space === parking_lot)

            if (tempSpace.capacity === totalCarsInLot) {
                tempSpace.status = 'full'

                const spaceIndex = dbSpaces.findIndex(parkingLot => parkingLot.space === parking_lot)
                dbSpaces[spaceIndex] = { ...tempSpace }
            }

            res.status(200).send({ plat_nomor, parking_lot, tanggal_masuk: registeredData.tanggal_masuk})

        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    checkoutCar: async (req, res) => {
        const { plat_nomor } = req.body
        
        try {

            if (!plat_nomor) {
                res.status(400).send({peringatan: 'harap input plat nomor'})
            }
            
            const upperCasePlate = plat_nomor.toUpperCase()
            const getCar = dbCars.find(car => car.plat_nomor === upperCasePlate)
            if (!getCar) {
                res.status(404).send({peringatan: 'mobil tidak terdaftar dalam registerasi'})
            }
            const timeRegistered = getCar.tanggal_masuk

            const timeCheckout = showDateTime()

            const milisecondRegistered = Date.parse(timeRegistered)
            const milisecondCheckout = Date.parse(timeCheckout)

            const durationMilisecond = milisecondCheckout - milisecondRegistered

            const miliToSecond = 1000
            const secondsInDay = 86400
            const secondsInHour = 3600
            const hoursADay = 24

            const totalDays = Math.floor(durationMilisecond / secondsInDay / miliToSecond)
            const totalHours = totalDays * hoursADay + Math.floor(durationMilisecond / secondsInHour / miliToSecond) % hoursADay

            const findPriceType = dbPrice.find(price => price.carType === getCar.tipe)
            const price = findPriceType.pricePerHour
            const carIndex = dbCars.findIndex(car => car.plat_nomor === upperCasePlate)
            dbCars.splice(carIndex, 1)

            const totalPrice = price * (totalHours - 1) / 5 + price

            res.status(200).send({plat_nomor: upperCasePlate, tanggal_masuk: timeRegistered, tanggal_keluar: timeCheckout, jumlah_bayar: totalPrice })
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    totalPerType: async (req, res) => {
        const { tipe } = req.body
        try {
            if (!tipe) {
                res.status(400).send({peringatan: 'harap input tipe mobil'})
            }
            
            const upperCaseType = tipe.toUpperCase()

            const validateType = dbPrice.find(car => car.carType === upperCaseType)
            if (!validateType) {
                res.status(404).send({peringatan: 'tipe mobil tidak valid'})
            }
            
            const getTypes = dbCars.filter(mobil => mobil.tipe === upperCaseType)
            const total = getTypes.length

            res.status(200).send({ jumlah_kendaraan: total })
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    platesPerColor: async (req, res) => {
        const { warna } = req.body
        try {
            if (!warna) {
                res.status(400).send({peringatan: 'harap input warna mobil'})
            }
            const lowerCaseColor = warna.toLowerCase()
            
            const getColor = dbCars.filter(mobil => mobil.warna === lowerCaseColor)
            let arrOfPlates = []

            getColor.map(mobil => {
                arrOfPlates.push(mobil.plat_nomor)
            })

            res.status(200).send({ plat_nomor: arrOfPlates })
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    }
}