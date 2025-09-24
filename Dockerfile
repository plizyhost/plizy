# Stage 1: The Builder
# This stage installs all dependencies, including devDependencies, to build the app.
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Run the build command
RUN npm run build

# Stage 2: The Runner
# This stage creates the final, lightweight production image.
FROM node:20-alpine AS runner

WORKDIR /app

# Set the environment to production
ENV NODE_ENV=production

# Copy only the necessary files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port the app will run on
EXPOSE 3000

# The command to start the app
CMD ["npm", "run", "start"]









# # Build & run a Next.js app on CapRover
# FROM node:20-alpine

# # 1) Alpine fix for Next/SWC native binaries
# RUN apk add --no-cache libc6-compat

# WORKDIR /app

# # 2) Install deps
# COPY package*.json ./
# # If you use packages like sharp/prisma, avoid --ignore-scripts
# RUN npm ci

# # 3) Copy source
# COPY . .

# # 4) Give Node more heap during build on small VPS
# ENV NEXT_TELEMETRY_DISABLED=1
# ENV NODE_OPTIONS=--max-old-space-size=2048

# # Optional: silence telemetry if present
# RUN npx next telemetry disable || true

# # 5) Build
# RUN npm run build

# # 6) Runtime
# ENV NODE_ENV=production
# ENV PORT=3000
# EXPOSE 3000
# CMD ["npm","run","start"]

# ---


# # # Build & run a Next.js app on CapRover
# # FROM node:20-alpine

# # WORKDIR /app

# # # Install deps
# # COPY package*.json ./
# # RUN npm ci --ignore-scripts

# # # Copy source and build
# # COPY . .
# # ENV NEXT_TELEMETRY_DISABLED=1
# # RUN npm run build

# # # Runtime
# # ENV NODE_ENV=production
# # ENV PORT=3000
# # EXPOSE 3000
# # CMD ["npm","run","start"]
