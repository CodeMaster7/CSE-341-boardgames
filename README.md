# Board Game Management System API

A RESTful API for managing board games built with Node.js, Express, and MongoDB. This project provides complete CRUD operations for board games with comprehensive API documentation.

## 🎯 Project Overview

This is a backend API service for managing a board game collection. It allows users to create, read, update, and delete board game records with detailed information including player count, difficulty, categories, and more.

## 🎲 Features

-   **Complete CRUD Operations** for board games
-   **MongoDB Integration** for data persistence
-   **Data Validation** with proper error handling
-   **Swagger Documentation** with interactive API explorer
-   **Dynamic Environment Detection** (localhost vs production)
-   **Professional API Response Format**
-   **RESTful API Design**

## 📁 Project Structure

```
board-game-management-system/
├── controllers/        # HTTP request handlers
│   └── games.js       # Games controller
├── data/              # Database configuration
│   └── database.js    # MongoDB connection
├── routes/            # API route definitions
│   ├── index.js       # Main router
│   ├── games.js       # Games routes
│   └── swagger.js     # Swagger documentation route
├── services/          # Business logic layer
│   └── games.js       # Games service
├── .env               # Environment variables (not in git)
├── .gitignore         # Git ignore rules
├── api-test.rest      # REST client test file
├── package.json       # Dependencies and scripts
├── server.js          # Main application entry point
├── swagger.json       # Generated API documentation
└── swagger-gen.js     # Swagger generation script
```

## 🚀 Getting Started

### Prerequisites

-   **Node.js** (v18.11.0 or higher) - for native `--watch` support
-   **pnpm** - Fast, disk space efficient package manager
-   **MongoDB Atlas** account - for cloud database

### Installation

1. **Clone the repository:**

```bash
git clone <your-repo-url>
cd board-game-management-system
```

2. **Install dependencies:**

```bash
pnpm install
```

3. **Set up environment variables:**

```bash
# Copy the example file
cp .env.example .env

# Edit .env with your MongoDB connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/board-game-management
PORT=3000
NODE_ENV=development
```

4. **Generate Swagger documentation:**

```bash
pnpm run swagger
```

### Running the Application

#### Development Mode (with auto-restart)

```bash
pnpm run dev
```

#### Production Mode

```bash
pnpm start
```

#### Generate/Regenerate API Documentation

```bash
pnpm run swagger
```

## 📚 API Documentation

### Interactive Swagger Documentation

Once the server is running, visit:

-   **Local:** http://localhost:3000/api-docs
-   **Production:** https://your-domain.com/api-docs

### API Endpoints

| Method   | Endpoint     | Description                     |
| -------- | ------------ | ------------------------------- |
| `GET`    | `/games`     | Get all board games             |
| `GET`    | `/games/:id` | Get a specific board game by ID |
| `POST`   | `/games`     | Create a new board game         |
| `PUT`    | `/games/:id` | Update an existing board game   |
| `DELETE` | `/games/:id` | Delete a board game             |

### Game Data Model

Each game contains the following fields:

```json
{
	"_id": "ObjectId",
	"title": "string (required)",
	"description": "string (required)",
	"minPlayers": "number (required)",
	"maxPlayers": "number (required)",
	"playTime": "string (required)",
	"ageRange": "string (required)",
	"difficulty": "string (required)",
	"publisher": "string (required)",
	"yearPublished": "number (required)",
	"category": "string (required)",
	"price": "number (required)",
	"createdAt": "Date (auto-generated)",
	"updatedAt": "Date (auto-generated)"
}
```

### Example API Requests

#### Get All Games

```bash
GET http://localhost:3000/games
```

#### Create a New Game

```bash
POST http://localhost:3000/games
Content-Type: application/json

{
  "title": "Settlers of Catan",
  "description": "A classic strategy game about building settlements and trading resources",
  "minPlayers": 3,
  "maxPlayers": 4,
  "playTime": "60-90 minutes",
  "ageRange": "10+",
  "difficulty": "Medium",
  "publisher": "Catan Studio",
  "yearPublished": 1995,
  "category": "Strategy",
  "price": 54.99
}
```

#### Update a Game

```bash
PUT http://localhost:3000/games/675a1b2c3d4e5f6789abcdef
Content-Type: application/json

{
  "title": "Updated Game Title",
  "price": 59.99
  // ... other fields
}
```

#### Delete a Game

```bash
DELETE http://localhost:3000/games/675a1b2c3d4e5f6789abcdef
```

## 🧪 Testing the API

### Using the REST Client

This project includes an `api-test.rest` file for testing with the VS Code REST Client extension:

1. Install the "REST Client" extension in VS Code
2. Open `api-test.rest`
3. Click "Send Request" above any endpoint to test it

### Using Swagger UI

Visit `/api-docs` to use the interactive Swagger interface where you can:

-   View all endpoints
-   Test requests directly in the browser
-   See request/response examples
-   Download API specifications

## 💾 Database

### MongoDB Collections

-   **games** - Stores board game information

### Environment Variables

Required environment variables:

```env
# Server Configuration
PORT=3000

# MongoDB Configuration (required)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/board-game-management

# Environment
NODE_ENV=development
```

## 🛠 Technologies Used

-   **Runtime:** Node.js (v18+)
-   **Framework:** Express.js
-   **Database:** MongoDB with native MongoDB driver
-   **Documentation:** Swagger/OpenAPI with swagger-autogen
-   **Package Manager:** pnpm
-   **Development:** Native Node.js `--watch` flag
-   **CORS:** Enabled for cross-origin requests
-   **Environment:** dotenv for configuration

## 📄 Available Scripts

| Script             | Command                  | Description                             |
| ------------------ | ------------------------ | --------------------------------------- |
| `pnpm start`       | `node server.js`         | Start the server in production mode     |
| `pnpm run dev`     | `node --watch server.js` | Start with auto-restart for development |
| `pnpm run swagger` | `node swagger-gen.js`    | Generate Swagger documentation          |

## 🔒 Security Features

-   **Input Validation** - All required fields validated
-   **Data Type Validation** - Numbers, strings, and ranges validated
-   **Error Handling** - Comprehensive error responses
-   **Environment Variables** - Sensitive data kept in .env
-   **CORS Configuration** - Controlled cross-origin access

## 🚀 Deployment

This project is configured for deployment on **Render** or similar platforms:

1. Connect your GitHub repository
2. Set environment variables in your hosting platform
3. The app will automatically use the production MongoDB connection

### Environment Variables for Production

```env
MONGODB_URI=your-production-mongodb-connection-string
NODE_ENV=production
PORT=3000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📋 Week 03 Requirements Checklist

-   ✅ Complete CRUD operations (GET, POST, PUT, DELETE)
-   ✅ MongoDB database integration
-   ✅ Data validation and error handling
-   ✅ Professional API documentation with Swagger
-   ✅ Published to Render (when deployed)
-   ✅ RESTful API design
-   ✅ Environment variable configuration
-   ✅ Git repository with proper .gitignore

## 📞 Support

If you encounter any issues:

1. Check the console logs for error messages
2. Verify your MongoDB connection string
3. Ensure all environment variables are set
4. Test endpoints using the Swagger documentation

---

**Built for CSE 341 Web Services - Board Game Management System**
