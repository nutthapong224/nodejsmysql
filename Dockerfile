# Use Node.js 18 image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container (excluding files in .dockerignore)
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application (update "server.js" to your entry file)
CMD ["node", "app.js"]
