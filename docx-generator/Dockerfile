# Use the official Node.js image from the Docker Hub
FROM node:18.18.2-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port your app runs    on
EXPOSE 8080

# Define the command to run your application
CMD ["node", "dist/main.js"]
