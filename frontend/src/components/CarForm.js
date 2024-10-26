import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CAR } from '../graphql/mutations';
import { GET_PEOPLE } from '../graphql/queries';

const CarForm = () => {
  const { data } = useQuery(GET_PEOPLE);
  const [addCar] = useMutation(ADD_CAR, {
    refetchQueries: [{ query: GET_PEOPLE }],
    onCompleted: (data) => {
      alert(`Car added successfully!`);
    },
  });

  const onFinish = ({ year, make, model, price, personId }) => {
    addCar({
      variables: { year: parseInt(year), make, model, price: parseFloat(price), personId },
    });
  };

  return (
    <Form layout="inline" onFinish={onFinish}>
      <Form.Item name="year" rules={[{ required: true, message: 'Year is required' }]}>
        <Input placeholder="Year" type="number" />
      </Form.Item>
      <Form.Item name="make" rules={[{ required: true, message: 'Make is required' }]}>
        <Input placeholder="Make" />
      </Form.Item>
      <Form.Item name="model" rules={[{ required: true, message: 'Model is required' }]}>
        <Input placeholder="Model" />
      </Form.Item>
      <Form.Item name="price" rules={[{ required: true, message: 'Price is required' }]}>
        <Input placeholder="Price" type="number" />
      </Form.Item>
      <Form.Item name="personId" rules={[{ required: true, message: 'Person is required' }]}>
        <Select placeholder="Select a person">
          {data?.people.map(person => (
            <Select.Option key={person.id} value={person.id}>
              {person.firstName} {person.lastName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Button type="primary" htmlType="submit">Add Car</Button>
    </Form>
  );
};

export default CarForm;
