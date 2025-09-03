# Pokédex Pro

Complete Pokédex built with React + TypeScript using PokéAPI.

## Stack

- React 19 + TypeScript
- Vite
- TailwindCSS + Shadcn/ui
- TanStack Query + Router
- OpenAI SDK (bonus feature)

## Features

- **Searchable list** with debounced filter and pagination
- **URL state** (query + page persisted)
- **Detail page** with stats, types, abilities and sprites
- **Complete evolution tree**
- **Moves table** with side panel
- **Compare up to 3 Pokémon** (localStorage)
- **Full accessibility**
- **Bonus: AI comparison** using OpenAI

## How to run

```bash
# Install dependencies (pnpm recommended)
pnpm install

# Start development
pnpm dev

# Build for production
pnpm build
```

## AI Feature (Optional)

To use AI comparison, create a `.env` file:

```bash
VITE_OPENAI_API_KEY=your_key_here
```

**Note**: Exposing keys in browser is not best practice. In production, this would be server-side only.

## Technical decisions

- **TanStack Query** for caching and request deduplication
- **URL state** for navigation and sharing
- **localStorage** to persist comparisons
- **Defensive coding** for PokéAPI data
- **Bundle size** kept small (~200KB)

## Screenshots

