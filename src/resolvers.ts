import { getDogs } from "./modules/dogs/getDogs/getDogs.js";
import { GetDogsArgs } from "./modules/dogs/getDogs/types.js";

export const resolvers = {
  Query: {
    dogs: (_parent: any, args: GetDogsArgs) => {
      return getDogs(args);
    },
  },
};
