# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:22-alpine

WORKDIR /app

# Install serve to serve the static files
RUN npm install -g serve

# Copy built app from builder
COPY --from=builder /app/dist ./dist

# Copy package.json for reference
COPY package.json .

EXPOSE 3000

# Start the app
CMD ["serve", "-s", "dist", "-l", "3000"]
