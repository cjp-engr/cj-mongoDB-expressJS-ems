const mongoose = require('mongoose')

const attendanceSchema = mongoose.Schema({
    //_id to Employees 
    uniqueId: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    employeeId: {
        type: String,
    },
    clockin: {
        type: Number,
    },
    clockout: {
        type: Number,   
    },
    workDate: {
        type: Number,
    },
    // Will have initial (not working), 
    //work (working), break (on break), end (Clocked Out),
    status: {
        type: Number,
    },
    hourlyRate: {
        type: Number,
    },
    workedHours: {
        type: Number,
    },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Attendance', attendanceSchema)