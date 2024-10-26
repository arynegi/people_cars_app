const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Person {
    id: ID!
    firstName: String!
    lastName: String!
    cars: [Car]
  }

  type Car {
    id: ID!
    year: Int!
    make: String!
    model: String!
    price: Float!
    personId: String!
  }

  type Query {
    people: [Person]
    person(id: ID!): Person
    cars: [Car]
    car(id: ID!): Car
  }

  type Mutation {
    addPerson(firstName: String!, lastName: String!): Person
    updatePerson(id: ID!, firstName: String, lastName: String): Person
    deletePerson(id: ID!): Person
    addCar(year: Int!, make: String!, model: String!, price: Float!, personId: String!): Car
    updateCar(id: ID!, year: Int, make: String, model: String, price: Float, personId: String): Car
    deleteCar(id: ID!): Car
  }
`;

module.exports = typeDefs;
