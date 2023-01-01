const express = require('express')
const router = express.Router()

const { getEmployees, 
    getEmployee,
    addEmployee,
    getEmployeeByPin,
    updateEmployee,
    deleteEmployee,
} = require('../controllers/employeeController')

router.route('/')
    .get(getEmployees)
    .post(addEmployee)

// router.route('/latest')
//     .get(getLatestAddedEmployee)

router.route('/pin')
    .get(getEmployeeByPin)


router.route('/:id')
    .delete(deleteEmployee)
    .get(getEmployee)
    .put(updateEmployee)
    

module.exports = router