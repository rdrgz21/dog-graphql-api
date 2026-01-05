import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { ApolloServer } from "@apollo/server";

import { typeDefs } from "../../src/schema.js";
import { resolvers } from "../../src/resolvers.js";
import { getSingleResult } from "../helpers/getSingleResult.js";

type DogFields = {
  id: string;
  name: string;
  breed: string;
};

let server: ApolloServer;

beforeAll(async () => {
  server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
});

afterAll(async () => {
  await server.stop();
});

describe("Dogs GraphQL API Integration", () => {
  describe("dogs query", () => {
    it("should call the dogs query with a valid payload", async () => {
      const query = `
        query GetDogs {
          dogs {
            id
            name
            breed
          }
        }
      `;

      const result = await server.executeOperation({ query });
      const { data, errors } = getSingleResult<{ dogs: DogFields[] }>(result);

      expect(errors).toBeUndefined();
      expect(data.dogs.length).toBeGreaterThan(0);
      expect(data.dogs).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: "Buddy", breed: "Golden Retriever" }),
          expect.objectContaining({ name: "Max", breed: "German Shepherd" }),
        ])
      );
    });

    it("should handle the dogs query with an invalid payload", async () => {
      const query = `
        query GetDogs($name: String) {
          dogs(name: $name) {
            id
            name
            breed
          }
        }
      `;

      const result = await server.executeOperation({
        query,
        variables: { name: 123 }, // invalid: not a string
      });

      const { data, errors } = getSingleResult<{ dogs: DogFields[] }>(result);

      expect(data).toBeUndefined();
      expect(errors?.[0]?.message).toMatch(
        /String cannot represent a non string value/
      );
    });
  });

  describe("updateDogName mutation", () => {
    it("should call the updateDogName mutation with a valid payload", async () => {
      // Step 1: fetch an existing dog ID
      const getDogsQuery = `
        query {
          dogs {
            id
            name
            breed
          }
        }
      `;

      const dogsResult = await server.executeOperation({ query: getDogsQuery });
      const { data: dogsData } = getSingleResult<{ dogs: DogFields[] }>(
        dogsResult
      );
      const dogId = dogsData.dogs[0].id;

      // Step 2: update the dog's name
      const mutation = `
        mutation UpdateDog($id: ID!, $name: String!) {
          updateDogName(id: $id, name: $name) {
            id
            name
            breed
          }
        }
      `;

      const mutationResult = await server.executeOperation({
        query: mutation,
        variables: { id: dogId, name: "Charlie" },
      });

      const { data: mutationData, errors } = getSingleResult<{
        updateDogName: DogFields;
      }>(mutationResult);

      expect(errors).toBeUndefined();
      expect(mutationData.updateDogName).toEqual(
        expect.objectContaining({ name: "Charlie" })
      );

      // Step 3: confirm mutation persisted
      const afterResult = await server.executeOperation({
        query: getDogsQuery,
      });
      const { data: afterData } = getSingleResult<{ dogs: DogFields[] }>(
        afterResult
      );

      expect(afterData.dogs).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: "Charlie" }),
          expect.objectContaining({ name: "Max", breed: "German Shepherd" }),
        ])
      );
    });

    it("should handle the updateDogName mutation with an invalid payload", async () => {
      const mutation = `
        mutation UpdateDog($id: ID!, $name: String!) {
            updateDogName(id: $id, name: $name) {
                id
                name
            }
        }
      `;

      const result = await server.executeOperation({
        query: mutation,
        variables: { id: 123, name: "Foo" }, // invalid: id must be string
      });

      const { data, errors } = getSingleResult<{ updateDogName: DogFields }>(
        result
      );

      // GraphQL will return `null` for the field if type is wrong
      expect(errors).toBeUndefined();
      expect(data.updateDogName).toBeNull();
    });

    it("should handle the updateDogName mutation with a missing payload", async () => {
      const mutation = `
        mutation UpdateDog($id: ID!, $name: String!) {
          updateDogName(id: $id, name: $name) {
            id
            name
          }
        }
      `;

      const result = await server.executeOperation({
        query: mutation,
        variables: {}, // missing both id and name
      });

      const { data, errors } = getSingleResult<{ updateDogName: DogFields }>(
        result
      );

      expect(data).toBeUndefined();
      expect(errors?.[0]?.message).toMatch(
        /Variable "\$id" of required type "ID!" was not provided\./
      );
    });
  });
});
