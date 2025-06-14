# --- Stage 1: Build ---
FROM oven/bun:1.1 AS builder

WORKDIR /app

COPY bun.lockb package.json ./
RUN bun install

COPY . .
RUN bunx prisma generate
RUN bun run build


# --- Stage 2: Production Runner ---
FROM oven/bun:1.1 AS runner

WORKDIR /app

COPY --from=builder /app ./

RUN bunx prisma migrate deploy
EXPOSE 3000

CMD [ "sh", "-c", "PORT=3000 ./dist/server" ]