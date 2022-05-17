# Apollo Federation Subgraph Template

This template intializes an Apollo Server subgraph service that depends on an AWS RDS managed PostgreSQL (pg) database.

Please follow the established coding conventions defined [here](https://www.notion.so/outsideinc/Impact-GQL-Coding-Conventions-7707e5ad9b3b415c95e7a44abd884ffe)

## After using this template replace the following to setup your new service

1. Replace `<service_name>` in `bin/build` with the name of your ECS service
2. Replace `<service_name>` in `bin/deploy` with the name of your ECS service
3. Replace `<subgraph_name>` in `.circleci` with the name of your subgraph
4. Replace `<service_name>` in `Dockerfile` with the name of your ECS service

You can develop this application locally by running a dockerized version of PostgreSQL, or publicly available DB's when they become available.

We use [Prisma](https://www.prisma.io/docs/concepts/database-connectors/postgresql) to interact with the database.

## Dependencies

Docker to run a local dockerized version of the pg database.

## Start Local PostgreSQL docker

Run `yarn`.

Run `cp .env.example .env` to initialize the environment variables.

Make sure Docker is running.

Run `docker-compose up -d`.

This will start the docker container in detached mode with a pgAdmin GUI. You can read the docker-compose.yml if you're interested in how the docker container is set up.

Go to `http://localhost:5050`.

Log into pgAdmin with username: `admin@admin.com` and password `root`.

In the **Quick Links** section of the Dashboard, click `Add New Server`.

On the General tab, enter a Name.

On the Connection tab, enter the following:

1. Host name/address: `pg_container`
2. Port: `5432`
3. Username: `root`

Click `Save`. You should then see the new db in the left pane under `Servers > <Name> > Databases`. The database is ready for you to create tables and interact with.

## Preparing the pg database for use

When it is created, the pg database is empty.

Run `yarn prisma migrate dev` to create the tables.

Run `yarn prisma generate` to create the Prisma assets, such as the Prisma Client.

Run `npx prisma db seed` to seed the local database with data.

After this, the database is ready to be used by the application.

### Start the dev server

Run `yarn start:dev`

Runs the node server.

The PORT is configurable as an env variable.
