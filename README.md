This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

create .env file:
```
TELEGRAM_BOT_TOKEN=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_TELEGRAM_BOT_NAME=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```
run the development server:

```bash
npm install
#then run
npm run dev
```

run ```ngrok http 3000```
Open Bot father in telegram set domain of your bot to the ngrok url