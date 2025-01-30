const User = require('../models/userModel_2')


const userCreate = async (userData) => {
    const saveUser = await User.create(userData)
    return saveUser
}

const alreadyRegUpdate = async (userData) => {
    const updateData = await User.findOneAndUpdate({
        $or: [
            { user_mobile: userData.user_mobile },
            { user_email: userData.user_email }
        ]
    },
        { $set: userData },
        { new: true },
    )
    return updateData
}

const find_M_O_E = async (userData) => {
    const number = await User.findOne({
        $or: [
            { user_mobile: userData.user_mobile },
            { user_email: userData.user_email },
            { user_otp: userData.user_otp },
        ]
    })
    return number
}

const findMobileNumber = async (userData) => {
    const number = await User.findOne(

        { user_mobile: userData.user_mobile },


    )
    return number
}


const otp_updated = async (userData) => {
    const updateData = await User.findOneAndUpdate({
        $and: [
            { user_otp: userData.user_otp },
        ]
    },
        {
            $set: {
                user_otp: null, otp_verified_at: new Date(), temp_token: null,
                auth_token: userData.auth_token
            }
        },
        { new: true },
    )
    return updateData
}

module.exports = { userCreate, alreadyRegUpdate, find_M_O_E, otp_updated, findMobileNumber }