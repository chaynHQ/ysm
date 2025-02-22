# Your Story Matters (YSM) Test

Your Story Matters (YSM) is a digital companion for survivors of sexual assault launched in 2019. Formerly called YANA (You Are Not Alone) and funded by Nesta and the UK Department of Digital, Culture, Media and Sport through the Tech to Connect Challenge, YSM has curated content including recovery, moving through trauma, accessing justice through the law, stories of resilience, and allows survivors the option to create an account and save their journey.

## Get Involved

If you would like to help Chayn and receive special access to our organization and volunteer opportunities, please [visit our Getting Involved guide](https://chayn.notion.site/Get-involved-423c067536f3426a88005de68f0cab19). We'll get back to you to schedule an onboarding call. Other ways to get involved and support us are [donating](https://www.paypal.me/chaynhq), starring this repo and making an open-source contribution here on GitHub, and supporting us on social media!

Our social medias:

Website - [Chayn](https://www.chayn.co/)

Twitter - [@ChaynHQ](https://twitter.com/ChaynHQ)

Instagram - [@chaynhq](https://www.instagram.com/chaynhq/)

Youtube - [Chayn Team](https://www.youtube.com/channel/UC5_1Ci2SWVjmbeH8_USm-Bg)

LinkedIn - [@chayn](https://www.linkedin.com/company/chayn)

# YSM Frontend

![GitHub Actions CI workflow badge](https://github.com/chaynHQ/ysm/workflows/YSM%20CI%20pipeline/badge.svg)

A NextJs VueJS app with PWA mode enabled and [Jest](https://jestjs.io/) unit testing.

This repo serves just the YSM frontend, find YSM's backend code here: https://github.com/chaynHQ/ysm-backend

**Currently in active development.**

## How to Contribute:

Before making a contribution, please follow our Contributing Guidelines in [CONTRIBUTING.md](/CONTRIBUTING.md).

Happy coding! ⭐

## Development

### Technologies Used:

- [Next.js](https://nextjs.org/) - framework for React.js, a JavaScript library for building component-based user interfaces
- [Vue.js](https://vuejs.org/) - model–view–viewmodel frontend JavaScript library for building user interfaces and single-page applications
- [Firebase](https://firebase.google.com/) - user authentication and analytics
- [Rollbar](https://rollbar.com/) - error reporting
- [Mailchimp](https://mailchimp.com/) - marketing and email automation
- [Heroku](https://www.heroku.com/) - build, deploy and operate staging and production apps
- [GitHub Actions](https://docs.github.com/en/actions) - CI pipeline

### Prerequisites

- NodeJS v16+
- Yarn v1.21+

### Run local backend:

See [ysm-backend](https://github.com/chaynHQ/ysm-backend) for instructions. You will need to run this in the background for the frontend to be functional.

### Install dependencies

```bash
yarn
```

### Create .env.local file

Include the following environment variables in a `.env.local` file.

You will need to gather the following tokens from [Firebase](https://firebase.google.com/).

If you're an official Chayn volunteer loading up the frontend, please get in touch with the team for access to the environment variables.

```
NEXT_PUBLIC_ENV=local

NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_KEY=
NEXT_PUBLIC_FIREBASE_DOMAIN=

# VARIABLES BELOW ARE OPTIONAL
NEXT_PUBLIC_ROLLBAR_SERVER_TOKEN= # rollbar for error reporting
NEXT_PUBLIC_ROLLBAR_CLIENT_TOKEN=
NEXT_PUBLIC_ROLLBAR_ENV=
NEXT_PUBLIC_MAILCHIMP_API_KEY= # mailchimp for email automation
NEXT_PUBLIC_MAILCHIMP_SERVER_PREFIX=
NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID=
```

**If creating new environment variables:**

- Check if the new environment variable must be added the [ci.yml](.github/workflows/ci.yml) file.
- Note that new environment variables must be added to Heroku before release to production. Please tag staff in your issue if creating new environment variables.

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

## License

This project uses the [MIT License](/LICENCE.md).

YSM and all of Chayn's projects are open-source.

While the core tech stack included here is open-source, some external integrations used in this project may require subscriptions.
