FROM node:4.1

# Create source directory
RUN mkdir /src

# Copy package manifest
ADD package.json /src/package.json

# Change to application directory
WORKDIR /src

# Install dependencies
RUN npm install

# Copy application files
ADD . /src

# Expose RPC and Web API
EXPOSE 5555 12302

# Use npm start script
CMD ["npm", "start"]
