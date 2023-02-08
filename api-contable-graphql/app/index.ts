import { ApolloServer } from "apollo-server-express";
import Schema from "./Schema";
import Resolvers from "./Resolvers";
import express from "express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";

import mongoose from "mongoose";
import "dotenv/config";
import path from "path";

async function startApolloServer(schema: any, resolvers: any) {
  const app = express();
  const httpServer = http.createServer(app);

//  dotenv.config({
//    path: path.resolve(__dirname, process.env.NODE_ENV + ".env")
//  });

  // console.log(process.env.DB_TDB +"://" + process.env.DB_USER +":" + process.env.DB_PWD +"@" + process.env.DB_HOST +":" + process.env.DB_PORT +"/" + process.env.DB_NAME);
  mongoose.set('strictQuery', true);
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
  
  const server = new ApolloServer({
    typeDefs: Schema,
    resolvers,
    //tell Express to attach GraphQL functionality to the server
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  }) as any;
  
  await server.start(); //start the GraphQL server.
  server.applyMiddleware({ app });

  await new Promise<void>(
    (resolve) => httpServer.listen({ port: 4000 }, resolve) //run the server on port 4000
  );

  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
}
//in the end, run the server and pass in our Schema and Resolver.
startApolloServer(Schema, Resolvers);
