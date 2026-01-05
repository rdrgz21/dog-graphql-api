import { v4 as uuidv4 } from "uuid";

export const dogs = [
  {
    id: uuidv4(),
    name: "Buddy",
    dateOfBirth: "2020-01-15",
    breed: "Golden Retriever",
  },
  {
    id: uuidv4(),
    name: "Max",
    dateOfBirth: "2019-05-20",
    breed: "German Shepherd",
  },
];
