module.exports = {
    dbCars  :[
        {
            plat_nomor: "B 1234 ASD",
            parking_lot: 'A1',
            tanggal_masuk: "2021-6-26 11:19",
            tipe: "SUV",
            warna: "hitam"
        },
        {
            plat_nomor: "B 321 CVB",
            parking_lot: 'A1',
            tanggal_masuk: "2021-6-26 19:00",
            tipe: "SUV",
            warna: 'biru'
        },
        {
            plat_nomor: "B 1809 SHJ",
            parking_lot: 'A2',
            tanggal_masuk: "2021-6-25 12:00",
            tipe: "MPV",
            warna: "hitam"
        }
    ],
    dbSpaces  :[
        {
            space: 'A1',
            capacity: 2,
            status: 'full'
        },
        {
            space: 'A2',
            capacity: 10,
            status: 'available'
        },
        {
            space: 'B1',
            capacity: 6,
            status: 'available'
        },
        {
            space: 'B2',
            capacity: 6,
            status: 'available'
        },
        {
            space: 'B3',
            capacity: 6,
            status: 'available'
        },
    ],
    dbPrice  :[
        {
            carType: "SUV",
            pricePerHour: 25000
        },
        {
            carType: "MPV",
            pricePerHour: 35000
        }
    ]
}