import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import jwt from "jwt-simple";
import mongoose from "mongoose";
import "dotenv/config";
import typesDefs from "./typeDefs";
import resolvers from "./Resolvers";
import { GraphQLError } from "graphql/error/GraphQLError";

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
  const server = new ApolloServer<any>({
    typeDefs: typesDefs,
    resolvers: resolvers,
  });

  const { url } = await startStandaloneServer<any>(server, {
    context: async ({ req, res }): Promise<any> => {
      // Get the user token from the headers.
      const token = req.headers.authorization;

      if (token) {
        const decodedToken = jwt.decode(token, "SOCIALUP");
        console.log(decodedToken);
        if (!decodedToken || typeof decodedToken !== "object") {
          throw new GraphQLError("Invalid token");
        }

        console.log("SEEEE");
      } else {
        console.log("Algo salio mal");
      }
    },
  });

  console.log(`🚀 Server listening at: ${url}`);
}
//in the end, run the server and pass in our Schema and Resolver.
startApolloServer();
