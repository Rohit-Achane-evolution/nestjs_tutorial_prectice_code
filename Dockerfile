# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Install build tools and Python
RUN apk add --no-cache make gcc g++ python3

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .



# Build the NestJS project (compile TypeScript to JavaScript)
RUN npm run build

# Expose the port that your app will run on
EXPOSE 3000

# Define the command to start your app in production mode
CMD ["npm", "run", "start:prod"]
