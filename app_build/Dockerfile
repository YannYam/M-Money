# Step 1: Build the Vite React application
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependency definitions and install
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code and build the app
COPY . .
RUN npm run build

# Step 2: Serve the application with Nginx
FROM nginx:alpine
# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy build artifacts from builder phase
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
