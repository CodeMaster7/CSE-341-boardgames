/* ******************************************
 * Games Controller
 * This controller handles HTTP requests and responses for games
 *******************************************/
// Import games service
const GamesService = require('../services/games')

/* ******************************************
 * Get All Games Controller
 * Handles GET request to fetch all games
 *******************************************/
const getAllGames = async (req, res) => {
	try {
		console.log('🎮 Controller: Getting all games...')

		// Call service to get games from database
		const games = await GamesService.getAllGames()

		// Send successful response with games data
		res.status(200).json({
			success: true,
			message: 'Games retrieved successfully',
			count: games.length,
			data: games
		})

		console.log(`✅ Controller: Sent ${games.length} games to client`)
	} catch (error) {
		console.error('❌ Controller error getting all games:', error)

		// Send error response
		res.status(500).json({
			success: false,
			message: 'Error retrieving games',
			error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
		})
	}
}

/* ******************************************
 * Get Game by ID Controller
 * Handles GET request to fetch single game
 *******************************************/
const getGameById = async (req, res) => {
	try {
		console.log(`🎮 Controller: Getting game with ID: ${req.params.id}`)

		// Get game ID from request parameters
		const gameId = req.params.id

		// Call service to get game from database
		const game = await GamesService.getGameById(gameId)

		// Check if game was found
		if (!game) {
			return res.status(404).json({
				success: false,
				message: 'Game not found',
				data: null
			})
		}

		// Send successful response with game data
		res.status(200).json({
			success: true,
			message: 'Game retrieved successfully',
			data: game
		})

		console.log(`✅ Controller: Sent game "${game.title}" to client`)
	} catch (error) {
		console.error('❌ Controller error getting game by ID:', error)

		// Send error response
		res.status(500).json({
			success: false,
			message: 'Error retrieving game',
			error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
		})
	}
}

/* ******************************************
 * Create Game Controller
 * Handles POST request to create a new game
 *******************************************/
const createGame = async (req, res) => {
	try {
		console.log('🎮 Controller: Creating new game...')

		// Extract game data from request body
		const gameData = req.body

		// Basic validation - check required fields
		const requiredFields = [
			'title',
			'description',
			'minPlayers',
			'maxPlayers',
			'playTime',
			'ageRange',
			'difficulty',
			'publisher',
			'yearPublished',
			'category',
			'price'
		]
		const missingFields = requiredFields.filter((field) => !gameData[field])

		if (missingFields.length > 0) {
			return res.status(400).json({
				success: false,
				message: 'Missing required fields',
				missingFields: missingFields
			})
		}

		// Validate data types
		if (typeof gameData.minPlayers !== 'number' || gameData.minPlayers < 1) {
			return res.status(400).json({
				success: false,
				message: 'minPlayers must be a number greater than 0'
			})
		}

		if (typeof gameData.maxPlayers !== 'number' || gameData.maxPlayers < gameData.minPlayers) {
			return res.status(400).json({
				success: false,
				message: 'maxPlayers must be a number greater than or equal to minPlayers'
			})
		}

		if (typeof gameData.price !== 'number' || gameData.price < 0) {
			return res.status(400).json({
				success: false,
				message: 'price must be a number greater than or equal to 0'
			})
		}

		// Call service to create game
		const result = await GamesService.createGame(gameData)

		// Send successful response
		res.status(201).json({
			success: true,
			message: 'Game created successfully',
			data: { id: result.insertedId }
		})

		console.log(`✅ Controller: Created game "${gameData.title}" with ID: ${result.insertedId}`)
	} catch (error) {
		console.error('❌ Controller error creating game:', error)

		// Send error response
		res.status(500).json({
			success: false,
			message: 'Error creating game',
			error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
		})
	}
}

/* ******************************************
 * Update Game Controller
 * Handles PUT request to update an existing game
 *******************************************/
const updateGame = async (req, res) => {
	try {
		console.log(`🎮 Controller: Updating game with ID: ${req.params.id}`)

		// Get game ID from request parameters
		const gameId = req.params.id

		// Extract game data from request body
		const gameData = req.body

		// Basic validation - check required fields
		const requiredFields = [
			'title',
			'description',
			'minPlayers',
			'maxPlayers',
			'playTime',
			'ageRange',
			'difficulty',
			'publisher',
			'yearPublished',
			'category',
			'price'
		]
		const missingFields = requiredFields.filter((field) => !gameData[field])

		if (missingFields.length > 0) {
			return res.status(400).json({
				success: false,
				message: 'Missing required fields',
				missingFields: missingFields
			})
		}

		// Validate data types
		if (typeof gameData.minPlayers !== 'number' || gameData.minPlayers < 1) {
			return res.status(400).json({
				success: false,
				message: 'minPlayers must be a number greater than 0'
			})
		}

		if (typeof gameData.maxPlayers !== 'number' || gameData.maxPlayers < gameData.minPlayers) {
			return res.status(400).json({
				success: false,
				message: 'maxPlayers must be a number greater than or equal to minPlayers'
			})
		}

		if (typeof gameData.price !== 'number' || gameData.price < 0) {
			return res.status(400).json({
				success: false,
				message: 'price must be a number greater than or equal to 0'
			})
		}

		// Call service to update game
		const result = await GamesService.updateGame(gameId, gameData)

		// Check if game was found and updated
		if (result.matchedCount === 0) {
			return res.status(404).json({
				success: false,
				message: 'Game not found'
			})
		}

		// Send successful response
		res.status(200).json({
			success: true,
			message: 'Game updated successfully',
			data: {
				id: gameId,
				modifiedCount: result.modifiedCount
			}
		})

		console.log(`✅ Controller: Updated game with ID: ${gameId}`)
	} catch (error) {
		console.error('❌ Controller error updating game:', error)

		// Send error response
		res.status(500).json({
			success: false,
			message: 'Error updating game',
			error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
		})
	}
}

/* ******************************************
 * Delete Game Controller
 * Handles DELETE request to delete a game
 *******************************************/
const deleteGame = async (req, res) => {
	try {
		console.log(`🎮 Controller: Deleting game with ID: ${req.params.id}`)

		// Get game ID from request parameters
		const gameId = req.params.id

		// Call service to delete game
		const result = await GamesService.deleteGame(gameId)

		// Check if game was found and deleted
		if (result.deletedCount === 0) {
			return res.status(404).json({
				success: false,
				message: 'Game not found'
			})
		}

		// Send successful response
		res.status(200).json({
			success: true,
			message: 'Game deleted successfully',
			data: {
				id: gameId,
				deletedCount: result.deletedCount
			}
		})

		console.log(`✅ Controller: Deleted game with ID: ${gameId}`)
	} catch (error) {
		console.error('❌ Controller error deleting game:', error)

		// Send error response
		res.status(500).json({
			success: false,
			message: 'Error deleting game',
			error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
		})
	}
}

/* ******************************************
 * Export Controller Functions
 *******************************************/
module.exports = {
	getAllGames,
	getGameById,
	createGame,
	updateGame,
	deleteGame
}
