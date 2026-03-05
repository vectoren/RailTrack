FROM node:22-alpine

WORKDIR /app

# Install Angular CLI globally for the 'ng' command
RUN npm install -g @angular/cli@21

COPY package*.json ./
RUN npm install

# Copy the rest of the files
COPY . .

# Expose port 4200 for Angular
EXPOSE 4200

# Start in dev mode and allow connections from outside the container
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]