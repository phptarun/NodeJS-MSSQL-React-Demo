# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR c:\Users\user\OneDrive\Documents\GitHub\NodeJS-MSSQL-React-Demo\ReactJS

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "npm start"]
