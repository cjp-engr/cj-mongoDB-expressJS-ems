const express = require('express')
const router = express.Router()

const { 
    getAttendance,
    addAttendance,
    updateAttendance,
    updateTodayAttendance,
    deleteAttendance,
    getPayroll,
} = require('../controllers/attendanceController')

router.route('/')
    .get(getAttendance)
    .post(addAttendance)
    .put(updateTodayAttendance)
    
    
router.route('/:id')
    .delete(deleteAttendance)
    .put(updateAttendance)

router.route('/payroll')
    .get(getPayroll)

module.exports = router
