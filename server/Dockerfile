

ARG NODE_VERSION=20.12.2

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV development
#ENV NODE_ENV production



WORKDIR /usr/src/app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
COPY package*.json ./
RUN npm install 


# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
# Comando para ejecutar la aplicación en desarrollo usando nodemon
CMD ["npx", "nodemon", "app.js"]
