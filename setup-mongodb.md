# MongoDB Setup Instructions

## Option 1: Local MongoDB Installation (Recommended for Development)

### For Windows:

1. **Download MongoDB Community Server:**
   - Go to https://www.mongodb.com/try/download/community
   - Download the Windows MSI installer
   - Run the installer and follow the setup wizard

2. **Start MongoDB:**
   ```powershell
   # Start MongoDB service
   net start MongoDB
   
   # OR if you installed without service, run:
   mongod --dbpath "C:\data\db"
   ```

3. **Verify installation:**
   ```powershell
   # Open MongoDB shell
   mongosh
   ```

## Option 2: MongoDB Atlas (Cloud Database)

1. **Create MongoDB Atlas Account:**
   - Go to https://cloud.mongodb.com/
   - Sign up for a free account
   - Create a new cluster (free tier available)

2. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

3. **Update .env file:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/arvyax?retryWrites=true&w=majority
   ```

## Option 3: Docker MongoDB (Alternative)

If you have Docker installed:

```bash
# Run MongoDB in Docker
docker run -d --name mongodb -p 27017:27017 mongo:latest

# The connection string will be:
# MONGODB_URI=mongodb://localhost:27017/arvyax
```

## Testing the Connection

Once MongoDB is running, test your backend:

```powershell
cd "backend"
npm start
```

You should see: "✅ Connected to MongoDB"

## Frontend Environment Variables

Create a `.env` file in the project root (not in backend folder):

```
VITE_API_BASE_URL=http://localhost:5000/api
```

This will enable the frontend to connect to your backend API.
