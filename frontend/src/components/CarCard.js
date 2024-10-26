import React, { useState } from 'react';
import { Card, Button, Input, Typography } from 'antd';
import { useMutation } from '@apollo/client';
import { DELETE_CAR, UPDATE_CAR } from '../graphql/mutations';
import { GET_PEOPLE } from '../graphql/queries';

const { Text } = Typography;

const CarCard = ({ car }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [year, setYear] = useState(car.year);
  const [make, setMake] = useState(car.make);
  const [model, setModel] = useState(car.model);
  const [price, setPrice] = useState(car.price);

  const [deleteCar] = useMutation(DELETE_CAR, {
    refetchQueries: [{ query: GET_PEOPLE }],
  });

  const [updateCar] = useMutation(UPDATE_CAR, {
    refetchQueries: [{ query: GET_PEOPLE }],
  });

  const handleDelete = () => {
    deleteCar({ variables: { id: car.id } });
  };

  const handleEdit = () => {
    updateCar({
      variables: {
        id: car.id,
        year: parseInt(year),
        make,
        model,
        price: parseFloat(price),
      },
    });
    setIsEditing(false);
  };

  return (
    <Card className="car-card">
      {isEditing ? (
        <div>
          <Input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year"
            type="number"
            style={{ marginBottom: 8 }}
          />
          <Input
            value={make}
            onChange={(e) => setMake(e.target.value)}
            placeholder="Make"
            style={{ marginBottom: 8 }}
          />
          <Input
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Model"
            style={{ marginBottom: 8 }}
          />
          <Input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            type="number"
          />
          <Button type="primary" onClick={handleEdit} style={{ marginTop: 8 }}>Save</Button>
        </div>
      ) : (
        <div className="car-info">
          <Text>
            {year} {make} {model} - ${price.toLocaleString()}
          </Text>
          <div className="actions">
            <Button type="link" onClick={() => setIsEditing(true)}>Edit</Button>
            <Button type="link" onClick={handleDelete} danger>Delete</Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default CarCard;
