const asyncHandler = require('express-async-handler')

const Attendance = require('../models/attendanceModel')

//reading the time worked
const getAttendance = asyncHandler(async (req, res) => {
    const attendance = await Attendance.find(req.query).sort({ clockin: 1 })

    if (!attendance) {
        res.status(400)
        throw new Error('No attendance found.')
    }

    res.status(200).json({ attendance: attendance })
})

//manually adding the time worked

const addAttendance = asyncHandler(async (req, res) => {

    const attendance = await Attendance.create({
        uniqueId: req.body.uniqueId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        employeeId: req.body.employeeId,
        clockin: req.body.clockin,
        clockout: req.body.clockout,
        workDate: req.body.workDate,
        overtime: req.body.overtime,
        workedHours: req.body.workedHours,
        status: req.body.status,
        hourlyRate: req.body.hourlyRate,
    })
    res.status(201).json({ attendance: attendance })

})

//manually updating the time worked
const updateAttendance = asyncHandler(async (req, res) => {
    const attendance = await Attendance.findById(req.params.id)

    if (!attendance) {
        res.status(400)
        throw new Error('Attendance not found')
    }

    const updatedAttendance = await Attendance
        .findByIdAndUpdate(req.params.id, req.body, { new: true },)
    res.status(200).json({ attendance: updatedAttendance })
})

//updating the clock out for today's clock in
const updateTodayAttendance = asyncHandler(async (req, res) => {
    const attendance = await Attendance.findOne(req.query)

    if (!attendance) {
        res.status(400)
        throw new Error('Attendance not found')
    }

    const updatedAttendance = await Attendance
        .findOneAndUpdate(Attendance.findOne(req.query), req.body, { new: true },)
    res.status(200).json({ attendance: updatedAttendance })

})

const deleteAttendance = asyncHandler(async (req, res) => {
    const attendance = await Attendance.findById(req.params.id)

    if (!attendance) {
        res.status(400)
        throw new Error('Attendance not found')
    }

    await attendance.remove()
    res.status(200).json({ message: 'Attendance deleted' })
})

const getPayroll = asyncHandler(async (req, res) => {
     const q =   Attendance.find(req.query).getQuery()
    const query = await Attendance.find(
        {
            uniqueId: q.uniqueId,
            workDate:
            {
                $gte: q.gteDate,
                $lte: q.lteDate,
            }
        }).sort(
            {
                clockin: 1
            }
        )

    if (!query) {
        res.status(400)
        throw new Error('No attendance found.')
    }

    res.status(200).json({ payroll: query })
})


module.exports = {
    getAttendance,
    addAttendance,
    updateAttendance,
    updateTodayAttendance,
    deleteAttendance,
    getPayroll,
}