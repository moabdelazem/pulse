# Build Stage
FROM node:24-bookworm-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

# Production Stage
FROM node:24-bookworm-slim AS production

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 pulse

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist

# Include drizzle SQL migrations folder for programmatic migrations
COPY drizzle ./drizzle

USER pulse

EXPOSE 8585

CMD ["node", "dist/server.js"]
