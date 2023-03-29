FROM node:lts

# Install your app
WORKDIR /gluestack/storybook
COPY . ./
RUN ["sh", "-c", "npm config set legacy-peer-deps true"]
RUN ["npm", "install"]

# Expose the port your app runs in
EXPOSE 9000

CMD ["sh", "-c", "npm run storybook -- --port 9000"]
