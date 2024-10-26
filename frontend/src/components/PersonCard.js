import React, { useState } from 'react';
import { Card, Button, Input, Space } from 'antd';
import { useMutation } from '@apollo/client';
import { DELETE_PERSON, UPDATE_PERSON } from '../graphql/mutations';
import { GET_PEOPLE } from '../graphql/queries';
import CarCard from './CarCard';

const PersonCard = ({ person }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(person.firstName);
  const [lastName, setLastName] = useState(person.lastName);

  const [deletePerson] = useMutation(DELETE_PERSON, {
    refetchQueries: [{ query: GET_PEOPLE }],
  });

  const [updatePerson] = useMutation(UPDATE_PERSON, {
    refetchQueries: [{ query: GET_PEOPLE }],
  });

  const handleDelete = () => {
    deletePerson({ variables: { id: person.id } });
  };

  const handleSave = () => {
    updatePerson({
      variables: {
        id: person.id,
        firstName: firstName || person.firstName, 
        lastName: lastName || person.lastName,    
      },
    })
      .then(() => setIsEditing(false))
      .catch((error) => console.error("Error updating person:", error));
  };

  return (
    <Card
      className="person-card"
      title={isEditing ? (
        <Space direction="vertical">
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
          <Space>
            <Button type="primary" onClick={handleSave}>Save</Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </Space>
        </Space>
      ) : (
        <div>
          {person.firstName} {person.lastName}
          <Button type="link" onClick={() => setIsEditing(true)}>Edit</Button>
          <Button type="link" onClick={handleDelete} danger>Delete</Button>
        </div>
      )}
    >
      {person.cars.map(car => <CarCard key={car.id} car={car} />)}
    </Card>
  );
};

export default PersonCard;
