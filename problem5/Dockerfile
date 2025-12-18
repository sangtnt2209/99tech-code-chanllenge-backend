# --- Stage 1: Build ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy yarn files first for better layer caching
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source and build TypeScript
COPY . .
RUN yarn build

# --- Stage 2: Production ---
FROM node:20-alpine

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy only what is needed from builder
COPY --from=builder /app/package.json /app/yarn.lock ./
# Install only production dependencies
RUN yarn install --frozen-lockfile --production

# Copy the compiled JS from stage 1
COPY --from=builder /app/dist ./dist

# Security: Run as non-root user
USER node

EXPOSE 3000

CMD ["node", "dist/server.js"]