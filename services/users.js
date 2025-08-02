/* ******************************************
 * Users Service
 * This service handles all database operations for users
 *******************************************/
// Import required modules
const { ObjectId } = require('mongodb')
// Import database connection
const { getDatabase } = require('../data/database')

const UsersService = {
	/**
	 * Get all users from the database
	 * @returns {Promise<Array>} Array of all user documents
	 */
	async getAllUsers() {
		try {
			// get the database connection
			const db = getDatabase()
			// Query MongoDB: find all documents in 'users' collection
			// .find() with no parameters = get everything
			// .toArray() converts MongoDB to JavaScript array
			return await db.collection('users').find({}).toArray()
		} catch (error) {
			console.error('❌ Error getting all users:', error)
			throw error
		}
	},

	/**
	 * Get a user by id from the database
	 * @param {string} userId - The id of the user to get
	 * @returns {Promise<Object>} The user document
	 */
	async getUserById(userId) {
		try {
			// get the database connection
			const db = getDatabase()
			return await db.collection('users').findOne({ _id: new ObjectId(userId) })
		} catch (error) {
			console.error('❌ Error getting user by ID:', error)
			throw error
		}
	},

	/**
	 * Create a new user in the database
	 * @param {Object} userData - The user data to insert
	 * @returns {Promise<Object>} The result with insertedId
	 */
	async createUser(userData) {
		try {
			// get the database connection
			const db = getDatabase()

			// Add creation timestamp
			const userToInsert = {
				...userData,
				dateJoined: new Date()
			}

			// Insert the user and return result
			return await db.collection('users').insertOne(userToInsert)
		} catch (error) {
			console.error('❌ Error creating user:', error)
			throw error
		}
	},

	/**
	 * Update a user by ID in the database
	 * @param {string} userId - The ID of the user to update
	 * @param {Object} userData - The updated user data
	 * @returns {Promise<Object>} The update result
	 */
	async updateUser(userId, userData) {
		try {
			// get the database connection
			const db = getDatabase()
			// Update the user and return result
			return await db.collection('users').updateOne({ _id: new ObjectId(userId) }, { $set: userData })
		} catch (error) {
			console.error('❌ Error updating user:', error)
			throw error
		}
	},

	/**
	 * Delete a user by ID from the database
	 * @param {string} userId - The ID of the user to delete
	 * @returns {Promise<Object>} The delete result
	 */
	async deleteUser(userId) {
		try {
			// get the database connection
			const db = getDatabase()
			// Delete the user and return result
			return await db.collection('users').deleteOne({ _id: new ObjectId(userId) })
		} catch (error) {
			console.error('❌ Error deleting user:', error)
			throw error
		}
	}
}

/* ******************************************
 * Export Functions
 *******************************************/
module.exports = UsersService
