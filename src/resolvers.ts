import { dogs } from "./data/dogs.js";

export const resolvers = {
  Query: {
    dogs: () => {
      return dogs;
    },
  },
};
