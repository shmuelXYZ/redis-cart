# Online Store Application

## Overview

This project is a full-stack online store application that allows users to browse products, add items to a cart, and manage their cart. The application is split into a client-side React frontend and a server-side Express backend, with Redis for persistent cart storage. The entire application is containerized using Docker for easy deployment and development.

The client fetches product data from the [Fake Store API](https://fakestoreapi.com/) via the server, which manages cart operations using Redis. The application is designed to be scalable, maintainable, and easy to set up with Docker Compose.

## Features

- **Product Browsing**: View a list of products fetched from the Fake Store API.
- **Cart Management**: Add products to the cart, update quantities, and remove items.
- **Persistent Cart**: Cart data is stored in Redis, with a one-month expiration for inactive carts.
- **Responsive UI**: Built with React and Tailwind CSS for a modern, user-friendly interface.
- **Containerized Deployment**: Uses Docker and Docker Compose for consistent environments.

## Technologies

The project leverages the following technologies:

- **Frontend**:
  - **React**: JavaScript library for building the user interface.
  - **TypeScript**: Adds static types to JavaScript for improved code quality.
  - **React Router**: Handles client-side routing for navigation between pages.
  - **Axios**: Makes HTTP requests to the backend API.
  - **Tailwind CSS**: Utility-first CSS framework for styling.
  - **Vite**: Fast build tool and development server for the frontend.
  - **React Redux (Optional)**: State management for the cart (if implemented).

- **Backend**:
  - **Node.js**: JavaScript runtime for the server.
  - **Express**: Web framework for building the RESTful API.
  - **TypeScript**: Ensures type safety in the backend code.
  - **Redis**: In-memory data store for managing cart data.
  - **Axios**: Fetches product data from the Fake Store API.
  - **Helmet**: Secures HTTP headers.
  - **CORS**: Enables cross-origin requests from the frontend.

- **Infrastructure**:
  - **Docker**: Containerizes the client, server, and Redis for consistent deployment.
  - **Docker Compose**: Orchestrates multi-container setup.
  - **Nginx**: Serves the React app and proxies API requests to the backend.
  - **Redis (Local or Cloud)**: Stores cart data, configurable for local or cloud-hosted instances.

## Project Structure

```
project-root/
├── client/                 # React frontend
│   ├── src/                # React components, pages, and logic
│   ├── Dockerfile          # Docker configuration for the client
│   ├── nginx.conf          # Nginx configuration for serving the app
│   └── package.json        # Frontend dependencies
├── server/                 # Express backend
│   ├── src/                # Server routes, controllers, and services
│   ├── Dockerfile          # Docker configuration for the server
│   ├── .dockerignore       # Excludes unnecessary files from Docker build
│   └── package.json        # Backend dependencies
├── docker-compose.yaml     # Orchestrates client, server, and Redis containers
├── .env                    # Environment variables (not included in Git)
└── README.md               # Project documentation
```

## Setup Instructions

### Prerequisites

- **Docker**: Install [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/).
- **Node.js** (optional, for local development): Version 18 or higher.
- **Git**: To clone the repository.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Create a `.env` File** (optional, for local development or cloud Redis):
   Create a `.env` file at the root of the project with the following (adjust as needed):
   ```plaintext
   REDIS_PASSWORD=yourpassword  # Required if using a password-protected Redis
   ```

   For local Redis, the `docker-compose.yaml` sets `REDIS_URI=redis://redis:6379` by default. For cloud Redis, update `REDIS_URI` in `docker-compose.yaml`.

3. **Build and Run with Docker**:
   ```bash
   docker-compose up --build
   ```

   This command:
   - Builds the `client` (React app) and `server` (Express API) containers.
   - Starts the `redis` container (or uses a cloud Redis instance if configured).
   - Maps ports:
     - Client: `http://localhost:3005`
     - Server: `http://localhost:8080`
     - Redis: `6379` (internal to Docker network, or exposed if needed).

4. **Access the Application**:
   - Open `http://localhost:3005` in your browser to view the React frontend.
   - Test the API at `http://localhost:8080/api/basket` or `http://localhost:8080/health`.

### Local Development (Without Docker)

1. **Install Dependencies**:
   ```bash
   cd server
   npm install
   cd ../client
   npm install
   ```

2. **Start Redis Locally**:
   Install and run Redis on your machine, or use a cloud-hosted instance. Update the `.env` file with the correct `REDIS_URI` and `REDIS_PASSWORD`.

3. **Run the Server**:
   ```bash
   cd server
   npm run start
   ```

4. **Run the Client**:
   ```bash
   cd client
   npm run dev
   ```

   The client will run on `http://localhost:3000` (or the port specified by Vite).

## API Endpoints

The backend provides the following RESTful API endpoints:

- **GET /api/basket**: Retrieve the current cart (returns an array of `{ id: number, quantity: number }`).
- **POST /api/basket**: Add a product to the cart (body: `{ id: number }`).
- **PUT /api/basket/:id**: Update the quantity of a product in the cart (body: `{ id: number, quantity: number }`).
- **DELETE /api/basket/:id**: Remove a product from the cart.
- **GET /api/basket/all-products**: Fetch all products from the Fake Store API.
- **GET /health**: Check server and Redis connectivity (returns `{ message: "OK", redis: "Connected" }`).

## Cart Storage in Redis

- **Data Structure**: The cart is stored as a JSON string under the Redis key `"basket"`, with a one-month expiration (`SETEX`).
- **Format**: An array of objects, e.g., `[{ id: 1, quantity: 2 }, { id: 2, quantity: 1 }]`.
- **Why Redis?**: Redis provides fast, in-memory storage for the cart, ensuring low-latency operations. The one-month expiration automatically clears inactive carts.

For better performance, consider using a Redis hash (`HINCRBY`) to store product IDs and quantities directly, avoiding JSON serialization.

## Troubleshooting

- **Redis Connection Error (`ECONNREFUSED`)**:
  - Ensure the `redis` container is running (`docker ps`).
  - Verify `REDIS_URI` in `docker-compose.yaml` is `redis://redis:6379` (or your cloud Redis URL).
  - Check server logs: `docker logs node-ts-server-1`.

- **Client API Requests Fail**:
  - Ensure the Nginx proxy in `client/nginx.conf` forwards `/api/` requests to `http://server:8080/`.
  - Verify CORS settings in `server/src/app.ts` allow the client’s origin (e.g., `http://localhost:3005`).

- **Docker Build Errors**:
  - Check `.dockerignore` excludes `node_modules`, `dist`, and `.env`.
  - Clear the build cache: `docker-compose build --no-cache`.

## Future Improvements

- **User Authentication**: Add user sessions to associate carts with specific users.
- **Redis Hash**: Switch to Redis hashes for cart storage to improve performance.
- **Error Handling**: Enhance client-side error messages for failed API requests.
- **Testing**: Add unit and integration tests for the backend and frontend.
- **CI/CD**: Set up a CI/CD pipeline for automated builds and deployments.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.