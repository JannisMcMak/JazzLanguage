# Build stage
FROM node:24-slim AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:24-slim AS runner

WORKDIR /app

# Copy built app and production dependencies
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Start the application
CMD ["node", "build"]
