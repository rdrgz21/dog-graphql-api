import { getDogs } from "./modules/dogs/getDogs/getDogs.js";
import { GetDogsArgs } from "./modules/dogs/getDogs/types.js";
import { updateDogName } from "./modules/dogs/updateDogName/updateDogName.js";
import { UpdateDogNameArgs } from "./modules/dogs/updateDogName/types.js";

export const resolvers = {
  Query: {
    dogs: (_parent: any, args: GetDogsArgs) => {
      return getDogs(args);
    },
  },
  Mutation: {
    updateDogName: (_parent: any, args: UpdateDogNameArgs) => {
      return updateDogName(args);
    },
  },
};
