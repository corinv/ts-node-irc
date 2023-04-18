# ts-node-irc

A dependency free Node/Typescript implementation of an IRC server.

## Description

An implementation of an IRC server as defined by [RFC 1459](https://www.rfc-editor.org/rfc/rfc1459).

## Try me

There's a running instance of the server on [irc.corinv.dev](irc.corinv.dev) on ports 6697 or 6667, connect using your favourite client. Note that SSL is not implemented yet so keep in mind:

- You may need to edit the connection options to indicate SSL is not on
- Your messages are very much not secure in transport!

## Disclaimer

**This is a work in progress**, so functionality is currently missing.

It is also worth noting, that since the inital RFC [1459](https://www.rfc-editor.org/rfc/rfc1459) there have been several more RFCs (see [2810](https://www.rfc-editor.org/rfc/rfc2810), [2811](https://www.rfc-editor.org/rfc/rfc2811), [2812](https://www.rfc-editor.org/rfc/rfc2812), [2813](https://www.rfc-editor.org/rfc/rfc2813)) and that all modern clients will favour this.

The current implementation has been tested against [Hexchat](https://github.com/hexchat/hexchat) and very briefly against [irssi](https://github.com/irssi/irssi). If you're experiencing an issue using a certain client, feel free to open an issue.

## TODO

- SSL
- Tests
- Logging
- User/Channel modes
- Finish implementing rest of commands

## Getting Started

### For local development:

Clone this project and then simply install the development dependencies and then run the `dev` script for a reloadable local server:

```
> npm i
> npm run dev
```

### For deployment:

There's an included Dockerfile to build an image of the server for easy deployment:

```
docker build -t ts-node-irc .
```

The default configuration should work fine out of the box, but you can edit the server configuration by passing in environment variables as such:

```
docker run -e "SERVER_NAME='New server'" ts-node-irc
```

The valid environment variables will be specified in `src/Config/Config.ts`.

As the server relies on raw TCP sockets, certain services that deploy containers may not be suitable, such as [Heroku](heroku.com) who do not support such connections.
