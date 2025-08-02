/* ******************************************
 * Main Routes Index
 * This file connects all route files to the main application
 *******************************************/

// Import Express router
const express = require('express')
const router = express.Router()

// Import individual route files
const gamesRoutes = require('./games')
const usersRoutes = require('./users')
const swaggerRoutes = require('./swagger')

/* ******************************************
 * Route Connections
 * Connect each route file to its base path
 *******************************************/
// Games routes - all routes under /games
router.use('/games', gamesRoutes)

// Users routes - all routes under /users
router.use('/users', usersRoutes)

// Swagger documentation routes
router.use('/', swaggerRoutes)

/* ******************************************
 * Export Main Router
 *******************************************/
module.exports = router
