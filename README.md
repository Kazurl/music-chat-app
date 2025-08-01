# Budly (Music Messenger App)

A real-time chat and music sharing web application that integrates authentication, music streaming, and admin management features.

![Node.js](https://img.shields.io/badge/node-v16-green)
![License](https://img.shields.io/badge/license-MIT-blue)


## Table of Contents

* [Features](#features)
* [Installation](#installation)
  * [Backend](#backend)
  * [Frontend](#frontend)
* [Usage](#usage)
* [Configuration](#configuration)
* [API Endpoints](#api-endpoints)
* [Technologies](#technologies)
* [License](#license)


<a name="features"></a>
## Features

- User authentication with Clerk
- Real-time chat with Socket.io
- Music streaming and playlist features
- Admin panel for management
- File uploads with express-fileupload and cleanup via cron jobs


<a name="installation"></a>
## Installation

### <a name="backend"></a>Backend

1. Clone the repository:
```bash
git clone https://github.com/yourusername/music-chat-app.git
cd music-chat-app/backend
```
2. Install dependencies:

```bash
npm install
```
3. Configure environment variables:
Create a `.env` file with the necessary variables like `PORT`, `JWT_SECRET`, `ADMIN_EMAIL` etc.
4. Start the backend server:

```bash
npm run dev
```


### <a name="frontend"></a>Frontend

1. Navigate to the frontend folder:
```bash
cd ../frontend
```
2. Install dependencies:

```bash
npm install
```
3. Start the frontend development server:

```bash
npm run dev
```


## <a name="usage"></a>Usage

- Open your browser and go to `http://localhost:3000`
- Register or login using your account
- Start chatting and sharing music
- Admin users can manage songs and albums through `/api/admin`


## <a name="configuration"></a>Configuration

Create a `.env` file in `/backend` with the following variables:

```env
PORT=5001
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@example.com
CLERK_API_KEY=your_clerk_api_key
CLERK_API_SECRET=your_clerk_api_secret
```


## <a name="api-endpoints"></a>API Endpoints

- `GET /api/songs` - Get all songs (admin only)
- `POST /api/admin/songs` - Create new song (admin only)
- `GET /api/users/messages/:id` - Get messages for a user (authenticated)
...


## <a name="technologies"></a>Technologies

- Node.js (Express v5)
- React with Tailwind CSS
- Clerk for Authentication
- Socket.io for real-time communication
- MongoDB (via Mongoose)
- Cloudinary for media upload
- Node-cron for scheduled tasks


## <a name="license"></a>License




