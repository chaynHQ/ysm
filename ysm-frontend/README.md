# YSM Frontend

A [Quasar](https://quasar.dev/) VueJS app with PWA mode enabled and [Jest](https://jestjs.io/) unit testing.

## Development

### Prerequisites

- NodeJS v10+
- Yarn v1.21+

### Install dependencies

```bash
yarn
```

### Run locally

Start the app in development mode (with hot-code reloading, error reporting, etc.):

```bash
yarn dev
```

To also run in PWA mode (only needed if developing/testing the service worker and other PWA capabilities):

```bash
yarn dev:pwa
```

### Run unit tests

```bash
yarn test:unit
```

To have your unit tests running in the background as you change code:

```bash
yarn test:unit:watch
```

You can also run the unit tests via the [Majestic app](https://github.com/Raathigesh/majestic):

```bash
yarn test:unit:ui
```

The unit tests use [Jest](https://jestjs.io/) and [vue-test-utils](https://vue-test-utils.vuejs.org/).

The config and extra utils live in [jest.config.js](jest.config.js) and the [test/jest](test/jest) folder.

The test harness will look for any `*.spec.js` files within the `src` folder – this allows test files to be next to the code.

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

### Run Lighthouse

**Make sure to only ever run lighthouse on a production build of the app (i.e. not the dev server)**

We have a [Lighthouse](https://github.com/GoogleChrome/lighthouse) config set up under [test/lighthouse](test/lighthouse). You can run Lighthouse by…

First building and serving the production app locally:

```bash
yarn build && yarn start 
```

... then in a separate console window (make sure to keep the server from the above command still running):

```bash
yarn audit:lighthouse
```