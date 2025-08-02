/* ******************************************
 * Games Routes
 * This file defines all API endpoints for games
 *******************************************/

// Import Express router
const express = require('express')
const router = express.Router()

// Import games controller
const gamesController = require('../controllers/games')

/* ******************************************
 * Games API Routes
 *******************************************/

// GET /games - Get all games
router.get('/', gamesController.getAllGames)

// GET /games/:id - Get single game by ID
router.get('/:id', gamesController.getGameById)

// POST /games - Create new game
router.post('/', gamesController.createGame)

// PUT /games/:id - Update game by ID
router.put('/:id', gamesController.updateGame)

// DELETE /games/:id - Delete game by ID
router.delete('/:id', gamesController.deleteGame)

/* ******************************************
 * Export Router
 *******************************************/
module.exports = router
