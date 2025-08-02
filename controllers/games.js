/* ******************************************
 * Games Controller
 * This controller handles HTTP requests and responses for games
 *******************************************/

// Import games service
const gamesService = require('../services/games')

/* ******************************************
 * Get All Games Controller
 * Handles GET request to fetch all games
 *******************************************/
const getAllGames = async (req, res) => {
	try {
		console.log('🎮 Controller: Getting all games...')

		// Call service to get games from database
		const games = await gamesService.getAllGames()

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
		const game = await gamesService.getGameById(gameId)

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
 * Export Controller Functions
 *******************************************/
module.exports = {
	getAllGames,
	getGameById
}
