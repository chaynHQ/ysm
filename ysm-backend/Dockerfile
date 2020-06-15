# First stage: build server app
FROM node:12 as builder
ENV NODE_ENV=development
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile --non-interactive
RUN yarn build

# Second stage: leaner image to deploy and run the built app
FROM node:12-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/package.json /app/yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive && yarn cache clean
COPY --from=builder /app/dist ./dist
CMD ["yarn", "start:prod"]