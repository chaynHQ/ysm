# Your Story Matters (YSM)

![GitHub Actions CI workflow badge](https://github.com/chaynHQ/ysm/workflows/YSM%20CI%20pipeline/badge.svg)

A companion app for survivors of sexual assault.

**Currently in active development**

## Support Us

YSM is created by Chayn a global volunteer network with over 400 volunteers from 15 countries. If you like what you see and you want to join our team of volunteers get in touch. Or you can [donate](https://www.paypal.me/chaynhq); all proceeds go to improving YSM and building more tools and resources at ChaynHQ.

# YSM Frontend

A [NextJs](https://nextjs.org/) VueJS app with PWA mode enabled and [Jest](https://jestjs.io/) unit testing.

## Development

### Prerequisites

- NodeJS v12+
- Yarn v1.21+

### Install dependencies

```bash
yarn
```

### Create .env.local file

Include the following environment variables in a .env.local file

- NEXT_PUBLIC_FIREBASE_KEY
- NEXT_PUBLIC_FIREBASE_DOMAIN
- NEXT_PUBLIC_ROLLBAR_SERVER_TOKEN
- NEXT_PUBLIC_ROLLBAR_CLIENT_TOKEN

### Run locally

Start the app in development mode (with hot-code reloading, error reporting, etc.):

```bash
yarn dev:url
```

### Run unit tests

```bash
yarn test:unit
```

To have your unit tests running in the background as you change code:

```bash
yarn test:unit:watch
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
