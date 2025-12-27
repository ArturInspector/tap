FROM node:20-alpine AS builder

# Install curl for potential build scripts
RUN apk add --no-cache curl

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install serve and curl
RUN npm install -g serve && \
    apk add --no-cache curl

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3001

# Install curl for health checks
RUN apk add --no-cache curl

# Health check
HEALTHCHECK --interval=10s --timeout=5s --retries=3 \
    CMD curl -f http://localhost:3001/ || exit 1

# Run the application
CMD ["serve", "-s", "dist", "-l", "3001"]

