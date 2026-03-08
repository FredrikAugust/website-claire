# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio website for Claire Foody built with **Next.js 15** (App Router + Turbopack) and **Payload CMS 3**. Uses PostgreSQL 17 for the database and S3 (AWS or MinIO locally) for media storage.

## Commands

```bash
pnpm dev              # Start dev server with Turbopack
pnpm build            # Production build (needs env vars: DATABASE_URI, PAYLOAD_SECRET, S3_*)
pnpm start            # Start production server
pnpm test             # Run vitest integration tests (tests/int/**/*.int.spec.ts)
pnpm lint             # Lint with Biome
pnpm format           # Format with Biome (--write)
pnpm generate:types   # Regenerate src/payload-types.ts from Payload config
pnpm generate:importmap  # Regenerate Payload import map
pnpm payload          # Run Payload CLI commands (e.g., pnpm payload migrate:create)
```

## Architecture

### Route Groups (src/app/)
- `/(frontend)/` — Public-facing website (server components fetch data via `getPayload()`)
- `/(payload)/` — Payload CMS admin panel (`/admin`) and API routes (`/api/...`, `/api/graphql`)

### Payload CMS (src/)
- `collections/` — Users (auth), Media (S3 uploads), Installation (portfolio entries)
- `globals/Home.ts` — Homepage content: hero, carousel images, about, contact
- `migrations/` — PostgreSQL migrations managed by Payload
- `payload.config.ts` — Main config: postgres adapter, S3 storage plugin, lexical editor
- `payload-types.ts` — Auto-generated types (run `pnpm generate:types` after schema changes)

### UI
- shadcn/ui components in `src/components/ui/`
- Tailwind CSS v4 with OKLCH color variables in `globals.css`
- `cn()` utility in `src/lib/utils.ts`

## Code Style

- **Biome** handles linting and formatting: single quotes, no semicolons, trailing commas, 2-space indent, 100-char line width
- Path aliases: `@/*` maps to `src/*`, `@payload-config` maps to `src/payload.config.ts`
- `src/payload-types.ts` and `src/migrations/` are auto-generated — do not edit manually

## Local Development with Docker Compose

`docker-compose.yml` provides PostgreSQL (port 5432, user: `payload`, db: `clairedb`) and MinIO (ports 9000/9001) for S3-compatible local storage.
