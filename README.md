# Real-Time-Data-Processing-System-for-Weather-Monitoring-with-Rollups-and-Aggregates

This project consists of a **Client** built with React.js and a **Server** built using Express.js and MongoDB. The client communicates with the server using `axios`, and the server manages data with `mongoose`.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Server Setup](#server-setup)
  - [Client Setup](#client-setup)
- [Available Scripts](#available-scripts)
  - [Server Scripts](#server-scripts)
  - [Client Scripts](#client-scripts)

## Technologies Used

### Server
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **Axios**: HTTP client for API requests.
- **Dotenv**: Environment variable management.
- **Mongoose**: MongoDB ODM for schema-based data handling.
- **Nodemon**: Automatically restarts the server in development mode.

### Client
- **React.js**: JavaScript library for building user interfaces.
- **React Chart.js 2**: For displaying charts.
- **Bootstrap**: CSS framework for styling.
- **Axios**: For API requests between client and server.

## Prerequisites

You will need to have the following installed on your machine:
- Node.js
- npm (Node Package Manager)
- MongoDB

## Getting Started

### Server Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install server dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the `server` directory with the necessary environment variables:
   ```
   MONGO_URI=your_mongo_connection_string
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Client Setup
1. Navigate to the client directory:
   ```bash
   cd ../client
   ```

2. Install client dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

4. The client will run at `http://localhost:3000` and will proxy API requests to the server running on `http://localhost:5000`.

## Available Scripts

### Server Scripts
- **`npm run dev`**: Starts the server in development mode with `nodemon`.

### Client Scripts
- **`npm start`**: Starts the React development server.
- **`npm run build`**: Builds the app for production.
- **`npm test`**: Runs the test suite.

---
