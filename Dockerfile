FROM node:10-alpine

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROME_BIN=/usr/bin/chromium-browser

RUN apk update && apk upgrade && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache chromium@edge nss@edge

RUN apk add --no-cache bash grep coreutils jq ca-certificates dumb-init libstdc++

WORKDIR /app

# Set language to UTF8
ENV LANG="C.UTF-8"

COPY package*.json ./
COPY .babelrc ./
COPY src ./src

RUN npm ci && npm run build

RUN rm .babelrc src -rf && npm prune --production

# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

# Run everything after as non-privileged user.
USER pptruser

ENV NODE_ENV production
EXPOSE 3005

ENTRYPOINT ["dumb-init", "--"]

CMD  ["node", "lib/start.js"]
