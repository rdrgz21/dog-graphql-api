# Dogs GraphQL API

A GraphQL API for managing a collection of dogs, allowing clients to **query** dog data and **update dog names**. This project includes a thorough **integration test suite** using **Vitest** and **Apollo Server** to ensure the API behaves correctly, including handling invalid and missing payloads.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [GraphQL Schema](#graphql-schema)
- [Queries](#queries)
- [Mutations](#mutations)
- [Testing](#testing)

---

## Installation

```
git clone git@github.com:rdrgz21/dog-graphql-api.git
cd dogs-graphql-api
npm install
```

## Usage

Start the Apollo Server:

```
npm run dev
```

The server will run at http://localhost:4000/graphql where you can access the GraphQL playground.

## GraphQL Schema

```
type Dog {
  id: ID!
  name: String!
  breed: String!
}

type Query {
  dogs(name: String, breed: String): [Dog!]!
}

type Mutation {
  updateDogName(id: ID!, name: String!): Dog
}
```

## Queries

`dogs`

Example: Fetch all dogs

```
query {
  dogs {
    id
    name
    breed
  }
}
```

Example: Filter dogs by name

```
query GetDogs($name: String) {
  dogs(name: $name) {
    id
    name
    breed
  }
}
```

Example: Filter dogs by breed

```
query GetDogs($breed: String) {
  dogs(breed: $breed) {
    id
    name
    breed
  }
}
```

Example: Filter dogs by name AND breed

```
query GetDogs($breed: String) {
  dogs(name: $name, breed: $breed) {
    id
    name
    breed
  }
}
```

## Mutations

`updateDogName`
Update the name of an existing dog by ID.

```
mutation UpdateDog($id: ID!, $name: String!) {
  updateDogName(id: $id, name: $name) {
    id
    name
    breed
  }
}
```

Returns null if the dog does not exist.

Requires both id and name to be provided.

## Testing

The project uses Vitest for testing and includes integration tests for all queries and mutations.

Run tests:

```
npm run test
```
