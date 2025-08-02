const router = require('express').Router()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

// Dynamic swagger middleware - detects localhost vs production
router.use('/api-docs', swaggerUi.serve)
router.get(
	'/api-docs',
	function (req, res, next) {
		// Clone the swagger document to avoid modifying the original
		const dynamicSwagger = JSON.parse(JSON.stringify(swaggerDocument))

		// Auto-detect host and scheme based on request
		const isLocalhost = req.hostname === 'localhost' || req.hostname === '127.0.0.1'

		if (isLocalhost) {
			// Development: use HTTP + localhost:3000
			dynamicSwagger.host = `localhost:${process.env.PORT || 3000}`
			dynamicSwagger.schemes = ['http']
		} else {
			// Production: use HTTPS + actual hostname
			dynamicSwagger.host = req.get('host')
			dynamicSwagger.schemes = ['https']
		}

		// Set the modified swagger document for this request
		req.swaggerDoc = dynamicSwagger
		next()
	},
	swaggerUi.setup()
)

module.exports = router
