# Next.js pet TODO app

## Introduction

This is a simple TODO app built with Next.js and Typescript.
The list of technologies used in this project are:

### Core technologies:
- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
### Additional technologies:
- [React Redux](https://react-redux.js.org/)
- [Redux toolkit](https://redux-toolkit.js.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [DnD-kit](https://dndkit.com/)
### Development tools:
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/)
- [Inquirer](https://github.com/SBoudrias/Inquirer.js)


Some of my implementations and decisions are based on the desire to try new things and just do some experiments for fun.
So you may find some things that are not the best practices or that are **not necessary** for this project.
For example, there is a script that runs on the pre-commit hook that asks the user if they want to commit the changes.
Does it really so necessary? No, but it was ***fun to implement it***.

## Getting Started

### Installation

1. First we need to install the dependencies, but there is a **small catch for npm users**.
We use shadcn/ui as a dependency, and it is not adapted to the new version of React 19.
So every time you install the dependencies, you need to run the following command:

```bash
  npm install --legacy-peer-deps
```
or
```bash
  npm install --force
```
You can read more about this issue [here](https://ui.shadcn.com/docs/react-19).

If you are using bun, pnpm or yarn, you can just run the following command:

```bash
  pnpm install
```
```bash
  yarn install
```
```bash
  bun install
```

### Development server
Then, run one of the following commands to start the development server:

```bash
  npm run dev
```
```bash
  yarn dev
```
```bash
  pnpm dev
````
```bash
  bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Husky Hooks

This project uses [Husky](https://typicode.github.io/husky) to automatically run linting and formatting checks
on every commit. This ensures that all code pushed to the repository follows the same style guidelines.
For now it works only for unix based systems. If you are using Windows, you can install WSL2 and use it from there.
Or wait for the support for Windows to be added in the future and disable the hooks for now.

To disable the hooks, you can run the following command:

```bash
  export HUSKY=0
```

To enable the hooks, you can run the following command:

```bash
  export HUSKY=1
```

### Pre-commit hook

The pre-commit hook runs the script that check if there are any errors or warnings in the code.
If there are any, asks if you want to run the script that will fix them or fix them manually.

### Commit-msg hook

The commit-msg hook runs the script that checks if the commit message follows the conventional commit format.

Enjoy the app! 🚀
