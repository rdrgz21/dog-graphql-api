import { dogs } from "../../../data/dogs.js";
import { Dog } from "../../../types/dog.js";
import { UpdateDogNameArgs } from "./types.js";

export const updateDogName = (args: UpdateDogNameArgs): Dog | null => {
  const dog = dogs.find((d) => d.id === args.id);

  if (!dog) return null; // return null if no dog found

  dog.name = args.name;

  return dog;
};
