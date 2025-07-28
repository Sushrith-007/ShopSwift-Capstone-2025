#!/bin/bash

echo "🚀 Starting ShopSwift E-commerce PWA Application (macOS)"
echo "======================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    print_error "MongoDB is not installed. Installing via Homebrew..."
    if command -v brew &> /dev/null; then
        brew tap mongodb/brew
        brew install mongodb-community
    else
        print_error "Homebrew not found. Please install MongoDB manually."
        exit 1
    fi
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Create MongoDB data directory (macOS specific)
print_status "Setting up MongoDB for macOS..."
mkdir -p ~/mongodb-data
chmod 755 ~/mongodb-data

# Start MongoDB (macOS specific - no sudo needed)
print_status "Starting MongoDB..."
mongod --dbpath ~/mongodb-data --logpath ~/mongodb.log --fork &
MONGO_PID=$!

# Wait for MongoDB to start
sleep 5

# Check if MongoDB is running
if ! pgrep -f "mongod" > /dev/null; then
    print_warning "MongoDB may not have started properly. Trying alternative method..."
    # Try without fork for debugging
    mongod --dbpath ~/mongodb-data --logpath ~/mongodb.log &
    MONGO_PID=$!
    sleep 3
fi

print_status "MongoDB setup completed"

# Navigate to server directory
print_status "Setting up backend server..."
cd server

# Install server dependencies
if [ ! -d "node_modules" ]; then
    print_status "Installing server dependencies..."
    npm install
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    print_status "Creating .env file from example..."
    cp .env.example .env
    print_warning "Please update the .env file with your actual configuration"
fi

# Start the server
print_status "Starting backend server on port 5050..."
node server.js &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Check if server is running
if curl -s http://localhost:5050/health > /dev/null 2>&1; then
    print_status "Backend server started successfully"
else
    print_warning "Backend server may not be fully ready yet. Check the logs above."
fi

# Navigate to client directory
print_status "Setting up frontend..."
cd ../client

# Install client dependencies
if [ ! -d "node_modules" ]; then
    print_status "Installing client dependencies..."
    npm install
fi

# Start the client
print_status "Starting React development server on port 3000..."
npm start &
CLIENT_PID=$!

echo ""
echo "🎉 ShopSwift Application Started!"
echo "=================================="
echo ""
echo "📱 Frontend (React PWA): http://localhost:3000"
echo "🔧 Backend API: http://localhost:5050"
echo "📊 API Health Check: http://localhost:5050/health"
echo "📚 API Documentation: http://localhost:5050/api-docs"
echo ""
echo "📁 MongoDB Data Directory: ~/mongodb-data"
echo "📋 MongoDB Log File: ~/mongodb.log"
echo ""
echo "Process IDs:"
echo "- MongoDB: $MONGO_PID"
echo "- Server: $SERVER_PID"
echo "- Client: $CLIENT_PID"
echo ""
echo "To stop all services, run:"
echo "kill $MONGO_PID $SERVER_PID $CLIENT_PID"
echo ""
echo "✨ PWA Features Enabled:"
echo "- Service Worker for offline support"
echo "- App installation prompt"
echo "- Responsive design"
echo "- Caching strategies"
echo ""

# Keep script running
wait