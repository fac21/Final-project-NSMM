import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    // Providers.GitHub({
    //   clientID: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // Providers.Email({
    //   server: {
    //     host: "",
    //     port: "",
    //     auth: {
    //       user: "",
    //       pass: "",
    //     },
    //   },
    //   from: "",
    // }),
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    }),
    // Providers.Email({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
  ],

  //database: process.env.DATABASE_URL;

  // database: {
  //   type: "postgresdb",
  //   host: process.env.DATABASE_URL,
  //   port: 5432,
  //   username: process.env.DATABASE_USER,
  //   password: process.env.DATABASE_PASSWORD,
  //   database: process.env.DATABASE_NAME,
  //    ssl: {
  //      rejectUnauthorized: false,
  //      ca: fs.readFileSync("/path/to/server-certificates/root.crt").toString(),
  //    },
  //},

  //database: process.env.DATABASE_URL,

  database: {
    type: "postgresdb",
    database: process.env.DATABASE_URL,
    synchronize: true,
  },
};

export default (req, res) => NextAuth(req, res, options);
