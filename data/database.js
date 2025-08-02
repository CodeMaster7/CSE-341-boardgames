// Simple MongoDB connection
const { MongoClient } = require('mongodb')

let database = null

// Connect to MongoDB
const initDatabase = async () => {
	try {
		const client = new MongoClient(process.env.MONGODB_URI)
		await client.connect()
		database = client.db()
		console.log('✅ Connected to MongoDB')
		return database
	} catch (error) {
		console.error('❌ MongoDB connection failed:', error)
		throw error
	}
}

// Get database instance
const getDatabase = () => {
	if (!database) {
		throw new Error('Database not initialized. Call initDatabase() first.')
	}
	return database
}

module.exports = { initDatabase, getDatabase }
