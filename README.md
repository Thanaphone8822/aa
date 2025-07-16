# vue-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## AI Assistant Integration

This project is configured for optimal AI assistant integration in VS Code. See [AI_ASSISTANT_SETUP.md](./AI_ASSISTANT_SETUP.md) for detailed setup instructions.

### Quick Start for AI Assistants
1. Install GitHub Copilot extension
2. Sign in to GitHub Copilot
3. Start coding - you'll get AI-powered suggestions automatically!

### Common Issues
- **TypeScript errors**: The project builds fine but may show TypeScript errors during development. This doesn't affect AI assistant functionality.
- **AI not working**: Make sure you're signed in to your AI service and check the extension status.

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```
