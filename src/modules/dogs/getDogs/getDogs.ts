import { dogs } from "../../../data/dogs.js";
import { Dog } from "../../../types/dog.js";
import { GetDogsArgs } from "./types.js";

export const getDogs = (args: GetDogsArgs): Dog[] => {
  return dogs.reduce((acc: Dog[], dog: Dog) => {
    // If no name or breed is provided, return all dogs
    const isMatchingName = args.name
      ? dog.name.toLowerCase().includes(args.name.toLowerCase())
      : true;
    const isMatchingBreed = args.breed
      ? dog.breed.toLowerCase().includes(args.breed.toLowerCase())
      : true;

    return isMatchingName && isMatchingBreed ? [...acc, dog] : acc;
  }, []);
};
