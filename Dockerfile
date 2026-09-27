# Stage 1: Build the React/Vite application
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first for better Docker layer caching
COPY package*.json ./
RUN npm ci

# Copy application source
COPY . .

# Build production files
RUN npm run build


# Stage 2: Serve the production application
FROM nginx:1.27-alpine

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy Vite production build
COPY --from=builder /app/dist /usr/share/nginx/html

# Application runs on port 80
EXPOSE 80

# Keep Nginx running in the foreground
CMD ["nginx", "-g", "daemon off;"]
