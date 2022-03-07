# minecraftLegionWebClient

This project was part of [minecraftLegion](https://github.com/sefirosweb/minecraftLegion).

This is a frontend to manage the bot. This frontend needs to connect to the backend: [minecraftLegionWebServer](https://github.com/sefirosweb/minecraftLegionWebServer).

## Install with docker

1. You need to have installed [docker](https://docs.docker.com/desktop/windows/wsl/), you can go to official docker site and follow the installation guide for you OS
2. Create docker network if you have all services in same computer and if you not have already created

```
docker network create minecraftLegionNetwork
```

3. Clone the repository

```
git clone https://github.com/sefirosweb/minecraftLegionWebClient.git
cd minecraftLegionWebClient
```

4. Start docker with node

```
docker run --rm -it --name minecraftLegionWebClient -p 3000:3000 --network minecraftLegionNetwork  -v $PWD:/home/app -w /home/app -u node node:16.13-bullseye /bin/bash
```

5. Install dependencies

```
npm install
```

6. Start the front end

```
npm start
```

The frontend is ready to listen in port 3000
Open url http://localhost:3000/

Set "Web Socket Server Password" password of "server" \
Set "Web Socket Server URL" the "server" ip \
Set "Web Socket Server Port" the port of "server"

Set "Master" your name in minecraft, it is used for "follow" your orders in game

Set "Server Bots (Used for connect to Bots Viewers)" it is used for see the inventory / view what does the bot

Now you must have connected to the server
