/* ******************************************
 * Games Service
 * This service handles all database operations for games
 *******************************************/
// Import required modules
const { ObjectId } = require('mongodb')
// Import database connection
const { getDatabase } = require('../data/database')

const GamesService = {
	/**
	 * Get all games from the database
	 * @returns {Promise<Array>} Array of all game documents
	 */
	async getAllGames() {
		try {
			// get the database connection
			const db = getDatabase()
			// Query MongoDB: find all documents in 'games' collection
			// .find() with no parameters = get everything
			// .toArray() converts MongoDB to JavaScript array
			return await db.collection('games').find({}).toArray()
		} catch (error) {
			console.error('❌ Error getting all games:', error)
			throw error
		}
	},

	/**
	 * Get a game by id from the database
	 * @param {string} gameId - The id of the game to get
	 * @returns {Promise<Object>} The game document
	 */
	async getGameById(gameId) {
		try {
			// get the database connection
			const db = getDatabase()
			return await db.collection('games').findOne({ _id: new ObjectId(gameId) })
		} catch (error) {
			console.error('❌ Error getting game by ID:', error)
			throw error
		}
	},

	/**
	 * Create a new game in the database
	 * @param {Object} gameData - The game data to insert
	 * @returns {Promise<Object>} The result with insertedId
	 */
	async createGame(gameData) {
		try {
			// get the database connection
			const db = getDatabase()
			// Insert the game and return result
			return await db.collection('games').insertOne(gameData)
		} catch (error) {
			console.error('❌ Error creating game:', error)
			throw error
		}
	},

	/**
	 * Update a game by ID in the database
	 * @param {string} gameId - The ID of the game to update
	 * @param {Object} gameData - The updated game data
	 * @returns {Promise<Object>} The update result
	 */
	async updateGame(gameId, gameData) {
		try {
			// get the database connection
			const db = getDatabase()
			// Update the game and return result
			return await db.collection('games').updateOne({ _id: new ObjectId(gameId) }, { $set: gameData })
		} catch (error) {
			console.error('❌ Error updating game:', error)
			throw error
		}
	},

	/**
	 * Delete a game by ID from the database
	 * @param {string} gameId - The ID of the game to delete
	 * @returns {Promise<Object>} The delete result
	 */
	async deleteGame(gameId) {
		try {
			// get the database connection
			const db = getDatabase()
			// Delete the game and return result
			return await db.collection('games').deleteOne({ _id: new ObjectId(gameId) })
		} catch (error) {
			console.error('❌ Error deleting game:', error)
			throw error
		}
	}
}

/* ******************************************
 * Export Functions
 *******************************************/
module.exports = GamesService
