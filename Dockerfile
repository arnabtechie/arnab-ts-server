# Use node image as base
FROM node:20

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json (if exists) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --only=prod

# Copy the rest of the application code
COPY . .

# Build TypeScript files
RUN npm run build

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/index.js"]
