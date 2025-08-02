/* ******************************************
 * Main Routes Index
 * This file connects all route files to the main application
 *******************************************/

// Import Express router
const express = require('express')
const router = express.Router()

// Import individual route files
const gamesRoutes = require('./games')

/* ******************************************
 * Route Connections
 * Connect each route file to its base path
 *******************************************/
// Games routes - all routes under /games
router.use('/games', gamesRoutes)

/* ******************************************
 * Export Main Router
 *******************************************/
module.exports = router
