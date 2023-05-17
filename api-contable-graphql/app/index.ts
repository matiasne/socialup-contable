//import { ApolloServer } from "apollo-server-express";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import jwt from "jwt-simple";
//import { rule, shield, and, or, not } from "graphql-shield";

//import express from "express";
//import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
//import http from "http";

import mongoose from "mongoose";
import "dotenv/config";

import typesDefs from "./typeDefs";
import resolvers from "./Resolvers";

// console.log(process.env.DB_TDB +"://" + process.env.DB_USER +":" + process.env.DB_PWD +"@" + process.env.DB_HOST +":" + process.env.DB_PORT +"/" + process.env.DB_NAME);
mongoose.set("strictQuery", true);
mongoose.connect(
  process.env.DB_TDB +
    "://" +
    process.env.DB_USER +
    ":" +
    process.env.DB_PWD +
    "@" +
    process.env.DB_HOST +
    ":" +
    process.env.DB_PORT +
    "/" +
    process.env.DB_NAME,
  () => {
    console.log("La base de datos esta corriendo correctamente");
  }
);

async function startApolloServer() {
  //  const app = express();
  //  const httpServer = http.createServer(app);

  //  dotenv.config({
  //    path: path.resolve(__dirname, process.env.NODE_ENV + ".env")
  //  });

  const server = new ApolloServer<any>({
    typeDefs: typesDefs,
    resolvers: resolvers,
    csrfPrevention: false,
  });

  const { url } = await startStandaloneServer<any>(server, {
    context: ({ req, res }): any => {
      // Get the user token from the headers.
      const token = req.headers.authorization || "";
      //      if (!token) return { error: "Acceso denegado" };
      //      try {
      //        const verified = jwt.decode(token, process.env.SECRET || "");
      //        console.log(verified);
      //        return verified;
      //      } catch (error) {
      //        return error;
      //        console.log(error);
      //      }
    },
  });

  console.log(`🚀 Server listening at: ${url}`);
}
//in the end, run the server and pass in our Schema and Resolver.
startApolloServer();
