This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


# **💾 How to install the project**

1. `git clone`
2. cd into the directory on your computer
3. run `npm i` to install node modules
4. To run the development server run:

```bash
npm run dev
# or
yarn dev
```

5. Open http://localhost:3000 with your browser to see the result.
6. You can do `npm run test` to run tests in cypress
7. To access postgres database.
- Copy the .env.example file in the root directory to .env(which will be ignored by Git):

`cp .env.example .env`
- DATABASE_URL should point to your local database and be in the form `postgres://<user>:<password>@localhost:<PORT>/<database_name>`
- Change the permissions of the automated two Bash scripts (scripts/db:setup and scripts/db:build) to make them executable: `chmod +x ./scripts/your-filename`.
- Run these via npm scripts: `npm run db:setup` and `npm run db:build`
8. Configure your local environment
Add details for one or more providers (e.g. Google, Twitter, GitHub, Email, etc)or an [Auth0 account](https://next-auth.js.org/providers/auth0) [SIGN UP](https://auth0.com/signup) and add secrets to .env file.
Set up an Auth0 account
If you haven't already signed up for an Auth0 account, do so (it's free). You can either use username and password or log in with a social provider (such as Facebook, Google, or Apple).


```javascript=
DATABASE_URL='postgres://exampleuser:123@localhost:5432/example'

AUTH0_CLIENT_ID =
AUTH0_CLIENT_SECRET =
AUTH0_DOMAIN =

AUTH0_BASE_URL = http://localhost:3000/
NEXTAUTH_URL = http://localhost:3000/


DATABASE_USER =
DATABASE_PASSWORD =
DATABASE_NAME =
```

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
