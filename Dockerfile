# Build & run a Next.js app on CapRover
FROM node:20-alpine

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci --ignore-scripts

# Copy source and build
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Runtime
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["npm","run","start"]
