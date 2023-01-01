const asyncHandler = require('express-async-handler')

const Employee = require('../models/employeeModel')

// @desc GET Employees
// @route GET /employee
// @access Private
const getEmployees = asyncHandler(async (req, res) => {
    const query = await Employee.find(
        {
            firstName: {$regex: req.query.firstName, $options: 'i'},
            lastName: {$regex: req.query.lastName, $options: 'i'}
            
        }).sort(
            {
                firstName: 1, 
                lastName: 1,
            }
        )
        if (!query) {
        res.status(400)
        throw new Error('No employees found.')
    }
    
    res.status(200).json({ employees: query })
    
})

// @desc GET Employees
// @route GET /employee/pin
// @access Private
const getEmployeeByPin = asyncHandler(async (req, res) => {
    const employee = await Employee.find(req.query).sort({firstName: 1, lastName: 1})
    if (!employee) {
        res.status(400)
        throw new Error('No employees found.')
    }
    res.status(200).json({ employees: employee })
    
})

// @desc GET Employees
// @route GET /employees
// @access Private
const getEmployee = asyncHandler(async (req, res) => {
    const employee = await Employee.findById(req.params.id)

    if (!employee) {
        res.status(400)
        throw new Error('Employee not found')
    }
    
    res.status(200).json({ employees: employee })
})

//TODO: to be deleted if found out not needed
// const getLatestAddedEmployee = asyncHandler(async (req, res) => {
//     //const employee = await Employee.findById(req.params.id)
//     const employee = await Employee.findOne().sort({ createdAt: -1 })

//     if (!employee) {
//         res.status(400)
//         throw new Error('Employee not found')
//     }
    
//     res.status(200).json({ employees: employee })
// })



// @desc POST Employee
// @route POST /employee
// @access Private
const addEmployee = asyncHandler(async (req, res) => {

    const employee = await Employee.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        countryCode: req.body.countryCode,
        phoneNumber: req.body.phoneNumber,
        employeeId: req.body.employeeId,
        jobRole: req.body.jobRole,
        payType: req.body.payType,
        hourlyRate: req.body.hourlyRate,
        weeklyHours: req.body.weeklyHours,
        pin: req.body.pin,
        imageUrl : req.body.imageUrl
    }) 
        res.status(201).json({ employees: employee })

})

// @desc PUT Employee
// @route PUT /employee/:id
// @access Private
const updateEmployee = asyncHandler(async (req, res) => {
    const employee = await Employee.findById(req.params.id)

    if (!employee) {
        res.status(400)
        throw new Error('Employee not found')
    }

    const updatedEmployee = await Employee
        .findByIdAndUpdate(req.params.id, req.body, { new: true },)
    res.status(200).json({ employees: updatedEmployee })
})

// @desc DELETE Employee
// @route DELETE /employee/:id
// @access Private
const deleteEmployee = asyncHandler(async (req, res) => {
    const employee = await Employee.findById(req.params.id)

    if (!employee) {
        res.status(400)
        throw new Error('Employee not found')
    }

    await employee.remove()
    res.status(200).json({ message: 'Employee deleted' })
})


module.exports = {
    getEmployees,
    getEmployee,
    getEmployeeByPin,
    addEmployee,
    updateEmployee,
    deleteEmployee,
}