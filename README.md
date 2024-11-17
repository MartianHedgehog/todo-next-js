
# Next.js pet TODO app

## Introduction
This is a simple TODO app built with Next.js and Typescript.
The list of technologies used in this project are:
- React 
- Next.js
- Typescript
- Tailwind CSS
- ESLint
- Prettier
- Husky
- Inquirer

Some of my implementations and decisions are based on the desire to try new things and just do some experiments for fun.
So you may find some things that are not the best practices or that are **not necessary** for this project.
For example, there is a script that runs on the pre-commit hook that asks the user if they want to commit the changes. 
Does it really so necessary? No, but it was fun to implement it.


## Getting Started

First, run the development server:

```bash
  npm run dev
# or
  yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

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
