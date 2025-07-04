# TradeMe-like Auction Platform

## Overview
This is a full-stack auction platform application that mimics TradeMe's functionality. The application is built using React for the frontend, Node.js/Express for the backend, and MongoDB for the database, with MinIO for object storage, all containerized using Docker.

## Features

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

- **Compare Feature**
  - Side-by-side item comparison
  - Multiple item selection
  - Key features comparison

### Backend Features
- **RESTful API**
  - Secure endpoints for all operations
  - JSON response format
  - Error handling and validation
  - Advanced endpoints for item comparison
  - Random item selection by field
  - User profile management
  - Health check endpoints

- **Database Integration**
  - MongoDB integration with health checks
  - Efficient data querying
  - Data persistence
  - Collection management for items and users
  - Automated data seeding for development
  - User and item collections management

- **Search Functionality**
  - Advanced query processing
  - Multiple search criteria support
  - Efficient search algorithms
  - Field-specific random item selection
  - Category-based filtering

### Technical Features
- **Docker Integration**
  - Containerized application components
  - Easy deployment and scaling
  - Health check implementation
  - Service dependency management
  - Services include:
    - Frontend (Port 8080)
    - Backend (Port 4000)
    - MongoDB (Port 27017)
    - Mongo Express (Port 8081)
    - MinIO (Ports 9000, 9001)
    - Auto Database Seeder
    - MinIO Bucket Initializer

- **File Storage**
  - MinIO integration for object storage
  - Automated image upload system
  - Public bucket configuration
  - Efficient image serving
  - Web console access (Port 9001)
  - Automated bucket initialization

- **Environment Configuration**
  - Separate environment files for each service
  - Secure configuration management
  - Environment-specific settings
  - Required environment validation

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

- **Storage:**
  - MinIO Object Storage
  - MinIO Client (mc)

- **DevOps:**
  - Docker
  - Docker Compose
  - Environment configuration
  - Health monitoring

## Getting Started

### Prerequisites
- Docker Desktop (with Docker Engine and Docker Compose)
- Node.js v18+ (for local development)
- Git

### Installation and Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/SethSamuelCode/MissionReadyLvl5-mission5-P2
   cd MissionReadyLvl5-mission5-P2
   ```

2. Set up environment files:
   ```bash
   # Backend environment configuration
   cp ./backend/.env.example ./backend/.env
   
   # MongoDB environment configuration
   cp ./mongoDB/.env.example ./mongoDB/.env
   
   # MinIO environment configuration
   cp ./minio/.env.example ./minio/.env
   ```

3. Configure environment variables:
   - Update `./backend/.env` with your backend configuration
   - Update `./mongoDB/.env` with your MongoDB credentials
   - Update `./minio/.env` with your MinIO settings

4. Build and start the application:
   ```bash
   # Build all containers and start the stack
   docker compose up --build

   # Or run in detached mode
   docker compose up --build -d
   ```

5. First-time setup will:
   - Build all Docker images
   - Initialize MongoDB with sample data
   - Create MinIO buckets and upload sample images
   - Start all services with health checks

### Managing the Application
```bash
# Stop the application
docker compose down

# View logs
docker compose logs -f

# View specific service logs
docker compose logs -f backend
docker compose logs -f frontend

# Rebuild specific service
docker compose up --build backend

# Remove all containers and volumes
docker compose down -v
```

### Accessing the Application
- Frontend Application: http://localhost:8080
- Backend API: http://localhost:4000
- Database Admin Interface: http://localhost:8081
- MinIO Console: http://localhost:9001
- MinIO API: http://localhost:9000

### Troubleshooting
1. If services fail to start:
   ```bash
   # Stop all services and remove volumes
   docker compose down -v
   
   # Rebuild and start
   docker compose up --build
   ```

2. If database seeding fails:
   ```bash
   # Restart the seeder service
   docker compose restart seed_db
   ```

3. If MinIO buckets aren't created:
   ```bash
   # Restart the createbuckets service
   docker compose restart createbuckets
   ```

## Project Structure
```
├── frontend/                        # React frontend application
│   ├── src/                        # Source code directory
│   │   ├── components/             # Reusable UI components
│   │   ├── pages/                  # Page components
│   │   └── assets/                 # Static assets
│   └── Dockerfile                  # Frontend container configuration
├── backend/                        # Node.js backend application
│   ├── controllers/                # Request handlers
│   ├── models/                     # Database models
│   ├── routes/                     # API routes
│   └── Dockerfile                  # Backend container configuration
├── mongoDB/                        # Database configuration and seeding
│   ├── SampleAuctionData.json     # Sample auction items data
│   └── mockUserData.json          # Sample user data
├── minio/                          # MinIO object storage configuration
│   ├── entrypoint.sh              # MinIO initialization script
│   ├── setBucketOpen.sh           # Bucket policy configuration
│   └── Dockerfile                  # MinIO container configuration
├── autoDbSeeder/                   # Automated database seeding
│   ├── autoSeed.js                # Seeding script
│   └── Dockerfile                  # Seeder container configuration
├── images/                         # Sample images for seeding
└── docker-compose.yaml             # Container orchestration
```

## Security Features
- CORS configuration for API security
- Environment variable management
- Request size limitations
- Origin validation
- Health check implementation
- Service dependency management
- Required environment validation

## Additional Information
- The application uses a modular architecture for easy maintenance and scaling
- Components are designed to be reusable and maintainable
- Built with best practices for both frontend and backend development
- Includes data seeding capabilities for development and testing
- Automated initialization of storage buckets and database
- Health monitoring for critical services

## Contributions
* [Cess](https://github.com/Cess-stack) 
  - Compare page 
* [Kerry](https://github.com/LuCinemax)
  - Home page 
  - Marketplace page
* [Seth](https://github.com/SethSamuelCode) 
  - Item page
  - DevOps 
* [Valentine](https://github.com/valentine-ncube) 
  - Watchlist page