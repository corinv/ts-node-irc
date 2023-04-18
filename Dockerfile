# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /tmp/irc-build
COPY . .
RUN npm i
RUN npm run build
RUN mkdir /server
RUN mv ./build/src/* /server
# As node doesn't accept a CLI input for module type we need package.json
# to specify `type: "module"`, else node uses CommonJS and throws an err
RUN mv package.json /server
WORKDIR /server
RUN rm -rf /tmp/irc-build
CMD ["node", "main.js"]
EXPOSE 6667
