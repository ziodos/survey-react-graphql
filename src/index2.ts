import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

//import { ResolverClass } from "./resolvers/BookResolver";

async function main() {
  await createConnection();
  /*const schema = await buildSchema({ resolvers: [ResolverClass] });
  const server = new ApolloServer({ schema });
  await server.listen(4000);
  console.log("Server has started!");*/
}

main();