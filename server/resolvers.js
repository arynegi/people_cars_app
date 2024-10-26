const { people, cars } = require('./data');
const { v4: uuidv4 } = require('uuid');

const resolvers = {
  Query: {
    people: () => people,
    person: (_, { id }) => people.find(person => person.id === id),
    cars: () => cars,
    car: (_, { id }) => cars.find(car => car.id === id),
  },

  Person: {
    cars: (person) => cars.filter(car => car.personId === person.id),
  },

  Mutation: {
    addPerson: (_, { firstName, lastName }) => {
      const newPerson = { id: uuidv4(), firstName, lastName };
      people.push(newPerson);
      return newPerson;
    },
    updatePerson: (_, { id, firstName, lastName }) => {
      const person = people.find(person => person.id === id);
      if (!person) return null;
      if (firstName) person.firstName = firstName;
      if (lastName) person.lastName = lastName;
      return person;
    },
    deletePerson: (_, { id }) => {
      const index = people.findIndex(person => person.id === id);
      if (index === -1) return null;
      const [deletedPerson] = people.splice(index, 1);
      cars = cars.filter(car => car.personId !== id);
      return deletedPerson;
    },
    addCar: (_, { year, make, model, price, personId }) => {
      const newCar = { id: uuidv4(), year, make, model, price, personId };
      cars.push(newCar);
      return newCar;
    },
    updateCar: (_, { id, year, make, model, price, personId }) => {
      const car = cars.find(car => car.id === id);
      if (!car) return null;
      if (year !== undefined) car.year = year;
      if (make !== undefined) car.make = make;
      if (model !== undefined) car.model = model;
      if (price !== undefined) car.price = price;
      if (personId !== undefined) car.personId = personId;
      return car;
    },
    deleteCar: (_, { id }) => {
      const index = cars.findIndex(car => car.id === id);
      if (index === -1) return null;
      const [deletedCar] = cars.splice(index, 1);
      return deletedCar;
    },
  },
};

module.exports = resolvers;
