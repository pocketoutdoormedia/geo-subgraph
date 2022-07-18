FROM node:16.13.1-alpine3.13 AS base

# Build:  docker build --tag <service_name>:latest .
# Run: docker run --publish 8000:8000 <service_name>
# Build an image to run the node server.  We configure the server to run under

# Make the `node` user a sudoer for quality of life when attaching to the server.
RUN apk add sudo
RUN apk add redis
RUN echo '%wheel ALL=(ALL) NOPASSWD:ALL' > /etc/sudoers.d/50-wheel
RUN addgroup node wheel

# Work from a less privileged user.
USER node

RUN npm config set '@outside-interactive:registry' https://node.bit.dev

# Drop the code into the user home directory.
RUN mkdir -p /home/node/geo-subgraph
WORKDIR /home/node/geo-subgraph

COPY --chown=node:node . .

RUN yarn
RUN yarn build

# Our server will listen on port 8000.
EXPOSE 8000

ENTRYPOINT ["/bin/sh"]
