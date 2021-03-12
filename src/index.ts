import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "../src/resolvers/User/UserResolver";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
import { refreshToken } from "../src/utils/auth";
import cors from "cors";
import { MeResolver } from "./resolvers/User/Me";
import QuestionResolver from "./resolvers/Question/QuestionResolver"


(async () => {
    const app = express();

    app.use(cors({
        credentials: true,
        origin: "http://localhost:3000"
    }));
    app.use(cookieParser());

    await createConnection();

    app.route("/refreshtoken").post(refreshToken);

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, MeResolver, QuestionResolver]
        }),
        context: ({ req, res }) => ({ req, res })
    });

    apolloServer.applyMiddleware({ app: app, cors: false });

    app.listen(4000, () => console.log("http://localhost:4000/graphql"));
})();