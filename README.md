# CSE 341 Web Services

A fullstack web application with frontend and backend using pnpm workspaces.

## Project Structure

```
CSE 341 Web Services/
├── frontend/           # Client-side application
│   ├── index.html
│   ├── script.js
│   └── style.css
├── backend/            # Server-side application
│   ├── server.js       # Main server file
│   ├── package.json    # Backend dependencies
│   └── routes/         # API routes
│       └── index.js
├── package.json        # Root workspace configuration
└── README.md           # This file
```

## Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   pnpm (install with `npm install -g pnpm`)

### Installation

1. Install dependencies for all workspaces:

```bash
pnpm install
```

2. Install backend dependencies:

```bash
cd backend
pnpm install
```

### Running the Application

#### Development Mode

```bash
# Run both frontend and backend
pnpm dev

# Run only backend
pnpm dev:backend

# Run only frontend
pnpm dev:frontend
```

#### Production Mode

```bash
# Start the backend server
pnpm start
```

## API Endpoints

The backend runs on `http://localhost:3000` with the following endpoints:

-   `GET /` - Health check
-   `GET /api/test` - API test endpoint
-   `GET /api/users` - Get all users
-   `POST /api/users` - Create new user

### Example API Usage

```javascript
// Test the API
fetch('http://localhost:3000/api/test')
	.then((response) => response.json())
	.then((data) => console.log(data))

// Get users
fetch('http://localhost:3000/api/users')
	.then((response) => response.json())
	.then((data) => console.log(data))

// Create user
fetch('http://localhost:3000/api/users', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({ name: 'John Doe', email: 'john@example.com' })
})
	.then((response) => response.json())
	.then((data) => console.log(data))
```

## Technologies Used

-   **Backend**: Node.js, Express.js, CORS
-   **Frontend**: HTML5, CSS3, JavaScript
-   **Package Manager**: pnpm
-   **Development**: Native Node.js --watch flag for auto-restart
