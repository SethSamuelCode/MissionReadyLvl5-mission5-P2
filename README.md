# TradeMe-like Auction Platform

## Overview
This is a full-stack auction platform application that mimics TradeMe's functionality. The application is built using React for the frontend, Node.js/Express for the backend, and MongoDB for the database, all containerized using Docker.

## 🚀 Features

### Frontend Features
- **Modern User Interface**
  - Clean and responsive design
  - Intuitive navigation with header and footer components
  - TradeMe-inspired layout and styling

- **Home Page**
  - Featured auctions carousel
  - Quick access to popular categories
  - Latest listings showcase

- **Marketplace**
  - Advanced search functionality
    - Search by title
    - Search by description
    - Category filtering
    - Condition filtering
    - Location-based filtering
  - Real-time search results
  - Item cards display with essential information

- **Product Details**
  - Detailed item information
  - Image galleries
  - Auction status and timer
  - Reserve price indicators
  - Location information

- **Watchlist System**
  - Add/remove items from watchlist
  - Track favorite items
  - Quick access to watched items

- **Category Navigation**
  - Organized category filtering
  - Easy browse by category

### Backend Features
- **RESTful API**
  - Secure endpoints for all operations
  - JSON response format
  - Error handling and validation

- **Database Integration**
  - MongoDB integration
  - Efficient data querying
  - Data persistence
  - Collection management for items and users

- **Search Functionality**
  - Advanced query processing
  - Multiple search criteria support
  - Efficient search algorithms

### Technical Features
- **Docker Integration**
  - Containerized application components
  - Easy deployment and scaling
  - Services include:
    - Frontend (Port 8080)
    - Backend (Port 4000)
    - MongoDB (Port 27017)
    - Mongo Express (Port 8081)

- **Environment Configuration**
  - Separate environment files for each service
  - Secure configuration management
  - Environment-specific settings

## 🛠 Technology Stack
- **Frontend:**
  - React
  - Vite
  - CSS Modules
  - Nginx (for production serving)

- **Backend:**
  - Node.js
  - Express
  - MongoDB Node Driver
  - CORS support
  - Morgan for logging

- **Database:**
  - MongoDB
  - Mongo Express (for database management)

- **DevOps:**
  - Docker
  - Docker Compose
  - Environment configuration

## 🚦 Getting Started

### Prerequisites
- Docker and Docker Compose installed
- Node.js (for local development)

### Installation and Setup
1. Clone the repository
2. Set up environment files:
   ```
   ./backend/.env
   ./MongoDB/.env
   ```
3. Start the application:
   ```bash
   docker-compose up
   ```

### Accessing the Application
- Frontend: http://localhost:8080
- Backend API: http://localhost:4000
- Database Admin: http://localhost:8081

## 📁 Project Structure
```
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   └── assets/        # Static assets
│   └── Dockerfile         # Frontend container configuration
├── backend/               # Node.js backend application
│   ├── controllers/      # Request handlers
│   ├── models/          # Database models
│   ├── routes/         # API routes
│   └── Dockerfile      # Backend container configuration
├── mongoDB/            # Database configuration and seeding
└── docker-compose.yaml # Container orchestration
```

## 🔐 Security Features
- CORS configuration for API security
- Environment variable management
- Request size limitations
- Origin validation

## 💡 Additional Information
- The application uses a modular architecture for easy maintenance and scaling
- Components are designed to be reusable and maintainable
- Built with best practices for both frontend and backend development
- Includes data seeding capabilities for development and testing

## 🤝 Contributions
* [cess](https://github.com/Cess-stack)
* [kerry](https://github.com/LuCinemax)
* [seth](https://github.com/SethSamuelCode)
* [valentine](https://github.com/valentine-ncube)