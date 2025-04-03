FROM node:lts

ARG DATABASE_URL
ARG PORT=3000
ENV DATABASE_URL="file:./db.sqlite"

WORKDIR /app/src/app

COPY package.json ./
COPY package.json yarn.lock ./
COPY db/ ./db/
RUN yarn install --frozen-lockfile

RUN npm install -g pnpm && pnpm i
COPY . .
RUN yarn blitz build

EXPOSE 3000



# https://github.com/blitz-js/blitz/issues/4354
RUN cp -r ./node_modules/.pnpm/sodium-native@3.4.1/node_modules/sodium-native/prebuilds ".next/server/app/(auth)/login"
RUN cp -r ./node_modules/.pnpm/sodium-native@3.4.1/node_modules/sodium-native/prebuilds ".next/server/app/api/rpc/[[...blitz]]"
RUN cp -r ./node_modules/.pnpm/sodium-native@3.4.1/node_modules/sodium-native/prebuilds ".next/server/app/(auth)/reset-password"

CMD yarn start -p 3000
