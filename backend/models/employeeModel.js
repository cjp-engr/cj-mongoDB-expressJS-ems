const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        // required: [true, 'Please add a first name']
    },
    lastName: {
        type: String,
        // required: [true, 'Please add a last name']
    },
    email: {
        type: String,
        // required: [true, 'Please add a email'],
        //unique: true
    },
    countryCode: {
        type: String,
        // required: [true, 'Please add a country code']
    },
    phoneNumber: {
        type: String,
        // required: [true, 'Please add a phone number']
    },
    employeeId: {
        type: String,
        // required: [true, 'Please add a employee id'],
        //unique: true
    },
    jobRole: {
        type: String,
        // required: [true, 'Please add a job role']
    },
    payType: {
        type: String,
        // required: [true, 'Please add a pay type']
    },
    hourlyRate: {
        type: Number,
    },
    weeklyHours: {
        type: Number,
    },
    pin: {
        type: Number,
        // required: [true, 'Please add a pin'],
        unique: true,
    },
    imageUrl: {
        type: String, 
        required: false
    },

},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Employee', employeeSchema)