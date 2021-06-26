const router = require('express').Router()

const {parkCar} = require ('../controllers')

router.post('/register', parkCar.resgisterCar)
router.post('/checkout', parkCar.checkoutCar)
router.get('/totalPerType', parkCar.totalPerType)
router.get('/platesPerColor', parkCar.platesPerColor)

module.exports = router