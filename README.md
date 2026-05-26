# EduReach Platform

EduReach is a college engagement and admissions platform built with **React + Vite** on the frontend and **Node.js + Express** on the backend. It includes:

- Student-facing landing pages for campus, mentors, events, and achievements
- Signup and login flow with JWT authentication
- AI chat support for admissions and course-related questions
- Counselor call initiation using VAPI
- Knowledge-base powered responses for college information

## Project Structure

- `client/` – React frontend
- `server/` – Express backend

## Prerequisites

- Node.js 18+
- npm
- MongoDB connection string
- Google API key for knowledge-base / AI features
- VAPI credentials for counselor call functionality

## Installation

```bash
cd client
npm install

cd ../server
npm install
```

## Environment Variables

Create a `.env` file in the `server/` folder with the following variables:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
GOOGLE_API_KEY=your_google_api_key
CLIENT_URL=http://localhost:5173
VAPI_API_KEY=your_vapi_api_key
VAPI_PHONE_NUMBER_ID=your_vapi_phone_number_id
VAPI_ASSISTANT_ID=your_vapi_assistant_id
```

## Running the Application

### Start the backend

```bash
cd server
npm run dev
```

### Start the frontend

```bash
cd client
npm run dev
```

The frontend will run at `http://localhost:5173` and the backend will run at `http://localhost:8000` by default.

## API Overview

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`

### Chat

- `POST /api/chat/message`

### VAPI

- `POST /api/vapi/call`

## Notes

- The frontend expects the backend at `http://localhost:8000/api` unless `VITE_API_URL` is configured.
- The server initializes the knowledge base on startup.
- The client uses protected routes for chat and call services.

## Build for Production

```bash
cd client
npm run build

cd ../server
npm run build
```

## License

This project is for educational and development use.

