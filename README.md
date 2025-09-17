# GeekGamer Application

This is the backend and frontend of the **GeekGamer** application. The backend is powered by Node.js and MongoDB, while the frontend is built with your chosen framework (e.g., React).

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (Local or Atlas)
- **npm** (Node Package Manager)

## Configuration

Make sure to configure the following environment variables in your `.env` file or in your environment:

```env
PORT=5000
MONGO_URL=mongodb://127.0.0.1:27017/geekgamer
JWT_SECRET=abhishek
GOOGLE_CLIENT_ID=YOUR CLIENT_ID
GOOGLE_CLIENT_SECRET= YOUR_GOOGLE_SECRET
SESSION_SECRET=your-session-secret
```

## Frontend
```
cd frontend
npm install
npm run dev
```

## Backend

```
cd backend
npm install
nodemon index.js
```




