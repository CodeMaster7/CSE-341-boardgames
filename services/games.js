/* ******************************************
 * Games Service
 * This service handles all database operations for games
 *******************************************/
// Import required modules
const { ObjectId } = require('mongodb')
// Import database connection
const { getDatabase } = require('../data/database')

/* ******************************************
 * Get All Games
 * Returns all games from the games collection
 *******************************************/
/**
 * Get all games from the database
 * @returns {Promise<Array>} An array of game documents
 */
const getAllGames = async () => {
	try {
		// Get database instance
		const db = getDatabase()

		// Get games collection
		const gamesCollection = db.collection('games')

		// Find all games and convert to array
		const games = await gamesCollection.find({}).toArray()

		console.log(`📋 Found ${games.length} games`)
		return games
	} catch (error) {
		console.error('❌ Error getting all games:', error)
		throw error
	}
}

/* ******************************************
 * Get Game by ID
 * Returns a single game by its ID
 *******************************************/
/**
 * Get a game by id from the database
 * @param {string} gameId - The id of the game to get
 * @returns {Promise<Object>} The game document
 */
const getGameById = async (gameId) => {
	try {
		// Get database instance
		const db = getDatabase()

		// Find game by ID
		return await db.collection('games').findOne({ _id: new ObjectId(gameId) })

		if (!game) {
			console.log(`🔍 Game not found with ID: ${gameId}`)
			return null
		}

		console.log(`🎲 Found game: ${game.title}`)
		return game
	} catch (error) {
		console.error('❌ Error getting game by ID:', error)
		throw error
	}
}

/* ******************************************
 * Export Functions
 *******************************************/
module.exports = {
	getAllGames,
	getGameById
}
