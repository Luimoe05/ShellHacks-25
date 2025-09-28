FROM node:20-alpine

WORKDIR /usr/src/app

# Copy dependency files first
COPY package*.json ./
RUN npm install --production

# Copy the rest of the app
COPY . .

# Expose backend internal port (3000 inside container)
EXPOSE 3000

CMD ["npm", "start"]
