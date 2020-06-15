# YSM Backend

A [NestJS](https://nestjs.com/) API server with [Jest](https://jestjs.io/) testing.

## Development

Note: if you just want to run the backend service locally and not do any development work on it, you can instead skip to the section on how to run it in a Docker container.

### Prerequisites

- NodeJS v10+
- Yarn v1.21+

### Set up local env config

Certain config values are required to run the server.

For local development, create a new **`.env.development`** at the root of the backend folder, and add in the following:

```shell
STORYBLOK_TOKEN={add here the API token from Storyblok / another dev}
```

Note that tests will use a separate `.env.test` which should already be present. When adding new config make sure to add a dummy 'noop' value in this test env file and commit to the repo.

### Install dependencies

```bash
yarn
```

### Run locally

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

### Run tests

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

### Formatting and linting

```bash
yarn lint
```

To lint and fix:

```bash
yarn lint:fix
```

Formatting and linting is provided by ESLint and Prettier (see the relevant configs for details).

Workspace settings for VSCode are included in this folder.

### Build the app for production

```bash
yarn build
```

### Generating new modules, controllers, services, etc

NestJS provides the [`nest generate`](https://docs.nestjs.com/cli/usages#nest-generate) command to help generate relevant files.

## Running as a Docker container locally

You may want to run the backend service in a Docker container if:

1. You don't intend to do any development work on it and just need a running service for the frontend to access.
1. You want to test that the Docker image works as expected, e.g. if you've made any changes to the `Dockerfile`.

First, ensure you have the Docker service installed and running on your machine. More info on how to do this: <https://docs.docker.com/get-docker/>.

Then, follow the section on setting up your local env config, above. Note that you don't need to follow any other instructions from the previous sections (like having the prerequisites, installing dependencies, etc.) as the Docker build process will do all this for you.

Then, build the image:

```sh
docker build -t ysm-backend .
```

Then, run the backend service in a container:

```sh
docker run --rm -it -p 3000:3000 --env-file=.env.development -e PORT=3000 --init ysm-backend
```

You can now test that the service is running, either using `curl`:

```sh
curl -v http://localhost:3000/api/resources
```

… or opening the URL <http://localhost:3000/api/resources> in your browser. It should show the JSON output of the `/resources` API.
