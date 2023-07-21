# My T3 Twitter Lite
My T3 very lite Twitter-ish app.

## Purpose
- Try create-t3-app
- Understanding tRPC

## Stack
- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
## How to run app in your local?
### 1. Clone repo
1.  `git clone https://github.com/Lada496/my-t3-twitter-lite.git`
2.  `npm i`

### 3. Set up env variables
- DATABASE_URL: `postgresql://<username>:<password>@localhost:<port_number>/<database_name>` <br />
[How to setup Prisma with your local PostgreSQL](https://medium.com/@lada496/how-to-setup-prisma-with-your-local-postgresql-a82407ff823e)
- NEXTAUTH_URL: `http://localhost:3000`
- DISCORD_CLIENT_ID
- DISCORD_CLIENT_SECRET <br />
[About Discord Oauth](https://discord.com/developers/docs/topics/oauth2) <br />
[Get clien ID and secret](https://discord.com/developers/applications)
### 3. Run app
1. run `npx prisma migrate dev --name initial`
2. run `npm run dev`

## Articles
https://medium.com/@lada496/list/project-my-t3-app-twitter-lite-b28f7741e60b
