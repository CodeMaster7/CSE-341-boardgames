/* ******************************************
 * Users Controller
 * This controller handles HTTP requests and responses for users
 *******************************************/
// Import users service
const UsersService = require('../services/users')

/* ******************************************
 * Get All Users Controller
 * Handles GET request to fetch all users
 *******************************************/
const getAllUsers = async (req, res) => {
	try {
		console.log('👥 Controller: Getting all users...')

		// Call service to get users from database
		const users = await UsersService.getAllUsers()

		// Send successful response with users data
		res.status(200).json({
			success: true,
			message: 'Users retrieved successfully',
			count: users.length,
			data: users
		})

		console.log(`✅ Controller: Sent ${users.length} users to client`)
	} catch (error) {
		console.error('❌ Controller error getting all users:', error)

		// Send error response
		res.status(500).json({
			success: false,
			message: 'Error retrieving users',
			error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
		})
	}
}

/* ******************************************
 * Get User by ID Controller
 * Handles GET request to fetch single user
 *******************************************/
const getUserById = async (req, res) => {
	try {
		console.log(`👥 Controller: Getting user with ID: ${req.params.id}`)

		// Get user ID from request parameters
		const userId = req.params.id

		// Call service to get user from database
		const user = await UsersService.getUserById(userId)

		// Check if user was found
		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
				data: null
			})
		}

		// Send successful response with user data
		res.status(200).json({
			success: true,
			message: 'User retrieved successfully',
			data: user
		})

		console.log(`✅ Controller: Sent user "${user.username}" to client`)
	} catch (error) {
		console.error('❌ Controller error getting user by ID:', error)

		// Send error response
		res.status(500).json({
			success: false,
			message: 'Error retrieving user',
			error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
		})
	}
}

/* ******************************************
 * Create User Controller
 * Handles POST request to create a new user
 *******************************************/
const createUser = async (req, res) => {
	try {
		console.log('👥 Controller: Creating new user...')

		// Extract user data from request body
		const userData = req.body

		// Basic validation - check required fields
		const requiredFields = [
			'username',
			'email',
			'firstName',
			'lastName',
			'favoriteGameCategories',
			'ownedGamesCount'
		]
		const missingFields = requiredFields.filter((field) => !userData[field])

		if (missingFields.length > 0) {
			return res.status(400).json({
				success: false,
				message: 'Missing required fields',
				missingFields: missingFields
			})
		}

		// Validate data types
		if (typeof userData.ownedGamesCount !== 'number' || userData.ownedGamesCount < 0) {
			return res.status(400).json({
				success: false,
				message: 'ownedGamesCount must be a number greater than or equal to 0'
			})
		}

		if (!Array.isArray(userData.favoriteGameCategories)) {
			return res.status(400).json({
				success: false,
				message: 'favoriteGameCategories must be an array'
			})
		}

		// Validate email format (basic)
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(userData.email)) {
			return res.status(400).json({
				success: false,
				message: 'Invalid email format'
			})
		}

		// Call service to create user
		const result = await UsersService.createUser(userData)

		// Send successful response
		res.status(201).json({
			success: true,
			message: 'User created successfully',
			data: { id: result.insertedId }
		})

		console.log(`✅ Controller: Created user "${userData.username}" with ID: ${result.insertedId}`)
	} catch (error) {
		console.error('❌ Controller error creating user:', error)

		// Send error response
		res.status(500).json({
			success: false,
			message: 'Error creating user',
			error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
		})
	}
}

/* ******************************************
 * Update User Controller
 * Handles PUT request to update an existing user
 *******************************************/
const updateUser = async (req, res) => {
	try {
		console.log(`👥 Controller: Updating user with ID: ${req.params.id}`)

		// Get user ID from request parameters
		const userId = req.params.id

		// Extract user data from request body
		const userData = req.body

		// Basic validation - check required fields
		const requiredFields = [
			'username',
			'email',
			'firstName',
			'lastName',
			'favoriteGameCategories',
			'ownedGamesCount'
		]
		const missingFields = requiredFields.filter((field) => !userData[field])

		if (missingFields.length > 0) {
			return res.status(400).json({
				success: false,
				message: 'Missing required fields',
				missingFields: missingFields
			})
		}

		// Validate data types
		if (typeof userData.ownedGamesCount !== 'number' || userData.ownedGamesCount < 0) {
			return res.status(400).json({
				success: false,
				message: 'ownedGamesCount must be a number greater than or equal to 0'
			})
		}

		if (!Array.isArray(userData.favoriteGameCategories)) {
			return res.status(400).json({
				success: false,
				message: 'favoriteGameCategories must be an array'
			})
		}

		// Validate email format (basic)
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(userData.email)) {
			return res.status(400).json({
				success: false,
				message: 'Invalid email format'
			})
		}

		// Call service to update user
		const result = await UsersService.updateUser(userId, userData)

		// Check if user was found and updated
		if (result.matchedCount === 0) {
			return res.status(404).json({
				success: false,
				message: 'User not found'
			})
		}

		// Send successful response
		res.status(200).json({
			success: true,
			message: 'User updated successfully',
			data: {
				id: userId,
				modifiedCount: result.modifiedCount
			}
		})

		console.log(`✅ Controller: Updated user with ID: ${userId}`)
	} catch (error) {
		console.error('❌ Controller error updating user:', error)

		// Send error response
		res.status(500).json({
			success: false,
			message: 'Error updating user',
			error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
		})
	}
}

/* ******************************************
 * Delete User Controller
 * Handles DELETE request to delete a user
 *******************************************/
const deleteUser = async (req, res) => {
	try {
		console.log(`👥 Controller: Deleting user with ID: ${req.params.id}`)

		// Get user ID from request parameters
		const userId = req.params.id

		// Call service to delete user
		const result = await UsersService.deleteUser(userId)

		// Check if user was found and deleted
		if (result.deletedCount === 0) {
			return res.status(404).json({
				success: false,
				message: 'User not found'
			})
		}

		// Send successful response
		res.status(200).json({
			success: true,
			message: 'User deleted successfully',
			data: {
				id: userId,
				deletedCount: result.deletedCount
			}
		})

		console.log(`✅ Controller: Deleted user with ID: ${userId}`)
	} catch (error) {
		console.error('❌ Controller error deleting user:', error)

		// Send error response
		res.status(500).json({
			success: false,
			message: 'Error deleting user',
			error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
		})
	}
}

/* ******************************************
 * Export Controller Functions
 *******************************************/
module.exports = {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser
}
