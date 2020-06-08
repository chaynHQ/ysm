# YSM Backend

A [NestJS](https://nestjs.com/) API server with [Jest](https://jestjs.io/) testing.

## Development

### Prerequisites

- NodeJS v10+
- Yarn v1.21+

### Set up local env

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
