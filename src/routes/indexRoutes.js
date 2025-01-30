const express = require('express');
const user = require('./userRoutes')
const message = require('./messageRoutes')
const files = require('./fileRouter')


const appRoutes = () => {
    
    const router = express.Router()
    router.use('/user', user)
    router.use('/msg', message)
    router.use('/file', files)

    return router
    
}

module.exports = { appRoutes }