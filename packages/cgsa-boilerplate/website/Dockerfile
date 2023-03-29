FROM node:lts

# Install your app
WORKDIR /gluestack/website
COPY package*.json ./
RUN ["npm", "config", "set", "legacy-peer-deps", "true"]
RUN ["npm", "install"]
COPY . .
EXPOSE 9000

# Install npm dependencies
RUN ["npm", "install"]

# Run the app
CMD ["sh", "-c", "npm run dev -- -p 9000"]
