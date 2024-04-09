<img src="https://i.imgur.com/gLIqPHL.png">

# Back-End for _Nebula_ project built in Blast network

## Description

This application serves as a backend for nebula website where users can complete different social tasks (mostly related to twitter) and make themselves eligible for a mint.

### Technology stack

- NodeJS/Bun
- Typescript
- NestJS
- Prisma
- JWT (via Passport)
- Postgresql
- Docker

## Running the app locally

Firstly, clone the repository via

```bash
git clone git@github.com:arsu4ka/nebula-nest.git
```

Then, create `.env` file and insert necessary enviromental variables.

`.env.example`

```env
NODE_ENV=
PORT=
DATABASE_URL=
TWITTER_CLIENT_ID=
TWITTER_CLIENT_SECRET=
TWEETSCOUT_API_KEY=
JWT_SECRET=
JWT_EXPIRE=
TARGET_USERNAMES=
TARGET_TWEETS=
```

### Using Bun

Install dependecies via

```bash
bun install
```

Generate _Prisma_ client via

```bash
bunx prisma generate
```

Run app in development mode via

```bash
bun run start:dev
```

_Note that_ <b>Bun</b> _doesn't work that well with nestjs when running without_ `--watch` _flag, so I suggest you use_ `start:dev` _script_

### Using Docker and Docker-Compose

```bash
docker-compose up -d
```

### Build and run Docker image on your own

Firstly, you need to build the image via

```bash
docker build -t nebula-image .
```

Then, you can start the container manually using something like this

```bash
source .env
docker run -d --env-file .env -p $PORT:$PORT --name nebula-container nebula-image
```
