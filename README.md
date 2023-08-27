# CodeLink

> 'CodeLink' is a social networking platform for developers to meet and share their skills.
Users can create a profile, update it, fetch their github repositories and add it to their portfolio, add  skills to  their profile, follow the news and engage on a discussion board by adding projects and interacting with them via likes and comments.
Although the team attempted authentication integration, it remained a work-in-progress by project end.

## Peek into the UI

[Be sure to watch this little intro video into CodeLink](https://www.youtube.com/watch?v=taDAv3vO6ZY)

![screenshot homepage](screenshots/homepage.png)

![screenshot profile](screenshots/profile.png)

![screenshot discussion-board](screenshots/discussion-board.png)

## Getting started

### Prerequisittes

Before running this project, ensure you have installed the following software on your machine:

- [nodejs](https://nodejs.org/en)
- [postgreSQL](https://www.postgresql.org)

Make sure your postgreSQL server is running.

For local development  we used a .env file to  hold local environment properties like the database connection.
Set the following in your `.env` file:

```sh
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
```

We used the following:

```sh
DATABASE_URL="postgresql://postgres:codeworks@localhost:5432/CodeLink?schema=public"
```

Furthermore, a **News API Key is needed.**
Register on the site [newsapi.org](https://newsapi.org) to get one.

### Install

Run the command to install node packages based on your local environment (e.g. 'npm install') in /client and /server.
Following commands assume you are in the root folder.

#### Root

```sh
npm install
```

#### Server

Start the server:

```sh
cd ./server
npm install
npm run dev

```

To interact with the postgreSQL db we used Prisma  studio and had a good experience with it.
You can use it by running:

```sh
cd ./server
npx prisma studio
```

#### Client

```sh
cd ./client
npm install
npm run dev
```

## Techstack

- Typescript
- Express
- SQL
- PostgreSQL
- Prisma.io
- Next.js
- CSS
- Cyprss
- Jest
- Superetest
- auth0

### Project Status

The work on this project has ended.

## Contributors

- Github: [@miriamCodes](https://github.com/miriamCodes)
- Github: [@adamlebreee](https://github.com/adamlebreee)
- Github: [@P-C-R-P](https://github.com/P-C-R-P/)
- Github: [@flores5545](https://github.com/flores5545/)
