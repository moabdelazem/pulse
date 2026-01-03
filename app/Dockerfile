# Build Stage
FROM node:24-bookworm-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

# Install production dependencies only
RUN npm ci --omit=dev && npm cache clean --force

# Production Stage
FROM gcr.io/distroless/nodejs24-debian12 AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

# Include drizzle SQL migrations folder for programmatic migrations
COPY drizzle ./drizzle

USER nonroot

EXPOSE 8585

CMD ["dist/server.js"]
