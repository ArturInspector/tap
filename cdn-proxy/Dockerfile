FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache curl

COPY package.json package-lock.json* ./

RUN npm install --omit=dev

COPY server.js .

EXPOSE 3002

ENV PORT=3002

HEALTHCHECK --interval=10s --timeout=5s --retries=3 \
    CMD curl -f http://localhost:3002/test-proxy || exit 1

CMD ["node", "server.js"]

