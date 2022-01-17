# minecraftLegionWebClient

This project was part of [minecraftLegion](https://github.com/sefirosweb/minecraftLegion).

This is a frontend to manage the bot. This frontend needs to connect to the backend: [minecraftLegionWebServer](https://github.com/sefirosweb/minecraftLegionWebServer).

## Install:

- Install [Node.js](https://nodejs.dev/) version 14+
- go to the directory which you want to install into
- run `npm i minecraftLegionWebClient` on command prompt
- start the frontend with `npm start`
- Configure the connection directly from the website

## Usage:

Start frontend with `npm start`
Check if all configuration is loaded (use cookies)
Manage the bot and configure all you need :D

### `npm start`

Runs the app.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

# TODO

- Make a robuts documentation!
- Make a deployment app

# Adding new docker system

## For develop

Need to be create docker network:

```
docker network create minecraftLegionNetwork
```

Start docker container and start watch

```
npm run docker
npm start
```
