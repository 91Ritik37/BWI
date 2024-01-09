const express = require("express");
const catchAsync = require("../util/catchAsync");
const role = require("../model/role");
const AppError = require("../util/AppError")

const create_role = catchAsync(async (req, res, next) => {
    const roleName = req.body.name;
    const user_id = req.body.user_id;
    if (roleName === 'Admin' || roleName === 'User') {
        const newRole = await role.create({ name: roleName, user_id: user_id });
        res.status(200).json({
            status: true,
            content: {
                data: { newRole, user_id }
            },
        });
    } else {
        next(new AppError('Invalid Role name', 401));
    }

})

module.exports = { create_role };