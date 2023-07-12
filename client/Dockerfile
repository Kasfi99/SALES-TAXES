
FROM node:16.13 as build-stage
# Set working directory
WORKDIR /usr/local/app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
# Build the application
RUN npm run build
# Use Nginx as the production server
FROM nginx:latest
# Copy the built application from the previous stage
COPY --from=build-stage /usr/local/app/dist /usr/share/nginx/html
# Expose the default Nginx port
EXPOSE 80
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]