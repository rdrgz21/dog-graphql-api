import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";

const typeDefs = `#graphql
  # This "Dog" type defines the queryable fields for every dog in our data source.
  type Dog {
    id: String
    name: String
    dateOfBirth: String
    breed: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "dogs" query returns an array of zero or more Dogs (defined above).
  type Query {
    dogs: [Dog]
  }
`;

const dogs = [
  {
    id: "1",
    name: "Buddy",
    dateOfBirth: "2020-01-15",
    breed: "Golden Retriever",
  },
  {
    id: "2",
    name: "Max",
    dateOfBirth: "2019-05-20",
    breed: "German Shepherd",
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves dogs from the "dogs" array above.
const resolvers = {
  Query: {
    dogs: () => dogs,
  },
};

// Create Express app and HTTP server
const app = express();
const httpServer = http.createServer(app);

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Start Apollo Server
await server.start();

// Apply middleware
app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server)
);

// Start the Express server
await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);

console.log(`🚀  Server ready at: http://localhost:4000/graphql`);
