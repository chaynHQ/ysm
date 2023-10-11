# Your Story Matters (YSM)

![GitHub Actions CI workflow badge](https://github.com/chaynHQ/ysm/workflows/YSM%20CI%20pipeline/badge.svg)

Your Story Matters (YSM) is a digital companion for survivors of sexual assault launched in 2019. Formerly called YANA (You Are Not Alone) and funded by Nesta and the UK Department of Digital, Culture, Media and Sport through the Tech to Connect Challenge, YSM has curated content including recovery, moving through trauma, accessing justice through the law, stories of resilience, and allows survivors the option to create an account and save their journey.

**Currently in active development.**

## Get Involved

If you would like to help Chayn and receive special access to our organization and volunteer opportunities, please [visit our Getting Involved guide](https://chayn.notion.site/Get-involved-423c067536f3426a88005de68f0cab19). We'll get back to you to schedule an onboarding call. Other ways to get involved and support us are [donating](https://www.paypal.me/chaynhq), starring this repo and making an open-source contribution here on GitHub, and supporting us on social media! 

Our social medias:

Website - [Chayn](https://www.chayn.co/)

Twitter - [@ChaynHQ](https://twitter.com/ChaynHQ)

Instagram - [@chaynhq](https://www.instagram.com/chaynhq/)

Youtube - [Chayn Team](https://www.youtube.com/channel/UC5_1Ci2SWVjmbeH8_USm-Bg)

LinkedIn - [@chayn](https://www.linkedin.com/company/chayn)

# YSM Frontend

A [NextJs](https://nextjs.org/) VueJS app with PWA mode enabled and [Jest](https://jestjs.io/) unit testing.

## Development

### Prerequisites

- NodeJS v14+
- Yarn v1.21+

### Install dependencies

```bash
yarn
```

### Create .env.local file

Include the following environment variables in a .env.local file

- NEXT_PUBLIC_FIREBASE_PROJECT_ID
- NEXT_PUBLIC_FIREBASE_APP_ID
- NEXT_PUBLIC_FIREBASE_KEY
- NEXT_PUBLIC_FIREBASE_DOMAIN
- NEXT_PUBLIC_ROLLBAR_SERVER_TOKEN
- NEXT_PUBLIC_ROLLBAR_CLIENT_TOKEN
- NEXT_PUBLIC_ROLLBAR_ENV
- NEXT_PUBLIC_MAILCHIMP_API_KEY
- NEXT_PUBLIC_MAILCHIMP_SERVER_PREFIX
- NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID
- NEXT_PUBLIC_ENV

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
