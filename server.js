/* ******************************************
 * This server.js file is the primary file of the
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
// Require packages
const express = require('express')
const cors = require('cors')
const env = require('dotenv').config()
// Require files from routes, controllers, and utilities
const { initDatabase } = require('./data/database')

// Initialize Express
const app = express()

/* ***********************
 * Middleware
 *************************/
// Enable CORS for all routes
app.use(cors())
// Parse JSON request bodies
app.use(express.json())
// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }))

/* ***********************
 * Routes
 *************************/
// Index route
app.get('/', (req, res) => {
	res.send('Hello World')
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT

/* ***********************
 * Initialize Database and Start Server
 *************************/
// Start the server with database connection
const startServer = async () => {
	try {
		// Initialize MongoDB connection first
		await initDatabase()

		// Start the Express server after database connects
		app.listen(port, () => {
			console.log(`🚀 Server running on port ${port}`)
			console.log(`📍 Local: http://localhost:${port}`)
			console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`)
		})
	} catch (error) {
		console.error('❌ Failed to start server:', error)
		process.exit(1) // Exit if database connection fails
	}
}

// Start the application
startServer()
