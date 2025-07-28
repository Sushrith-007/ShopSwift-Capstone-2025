#!/bin/bash

echo "🚀 Starting ShopSwift E-commerce PWA Application"
echo "================================================"

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
    print_error "MongoDB is not installed. Please install MongoDB first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Create MongoDB data directory
print_status "Setting up MongoDB..."
sudo mkdir -p /var/lib/mongodb
sudo chown mongodb:mongodb /var/lib/mongodb 2>/dev/null || sudo chown $USER:$USER /var/lib/mongodb

# Start MongoDB without systemd
print_status "Starting MongoDB..."
mongod --dbpath /var/lib/mongodb --logpath /var/log/mongodb.log --bind_ip 127.0.0.1 --port 27017 &
MONGO_PID=$!

# Wait for MongoDB to start
sleep 5

# Check if MongoDB is running
if ! pgrep -f "mongod" > /dev/null; then
    print_error "Failed to start MongoDB"
    exit 1
fi

print_status "MongoDB started successfully (PID: $MONGO_PID)"

# Install server dependencies
print_status "Installing server dependencies..."
cd server
if [ ! -d "node_modules" ]; then
    npm install
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    print_status "Creating .env file from example..."
    cp .env.example .env
fi

# Start the server
print_status "Starting backend server on port 5050..."
node server.js &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Check if server is running
if curl -s http://localhost:5050/health > /dev/null; then
    print_status "Backend server started successfully"
else
    print_warning "Backend server may not be fully ready yet"
fi

# Install client dependencies and start
print_status "Installing client dependencies..."
cd ../client
if [ ! -d "node_modules" ]; then
    npm install
fi

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