import { dogs } from "./data/dogs";

export const resolvers = {
  Query: {
    dogs: () => {
      return dogs;
    },
  },
};
