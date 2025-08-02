/* ******************************************
 * Users Routes
 * This file defines all API endpoints for users
 *******************************************/

// Import Express router
const express = require('express')
const router = express.Router()

// Import users controller
const usersController = require('../controllers/users')

/* ******************************************
 * Users API Routes
 *******************************************/

// GET /users - Get all users
router.get('/', usersController.getAllUsers)

// GET /users/:id - Get single user by ID
router.get('/:id', usersController.getUserById)

// POST /users - Create new user
router.post('/', usersController.createUser)

// PUT /users/:id - Update user by ID
router.put('/:id', usersController.updateUser)

// DELETE /users/:id - Delete user by ID
router.delete('/:id', usersController.deleteUser)

/* ******************************************
 * Export Router
 *******************************************/
module.exports = router
