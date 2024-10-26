import React from 'react';
import { Form, Input, Button } from 'antd';
import { useMutation } from '@apollo/client';
import { ADD_PERSON } from '../graphql/mutations';
import { GET_PEOPLE } from '../graphql/queries';

const PersonForm = () => {
  const [addPerson] = useMutation(ADD_PERSON, {
    refetchQueries: [{ query: GET_PEOPLE }],
    onCompleted: (data) => {
      alert(`Person added successfully!`);
    },
  });

  const onFinish = ({ firstName, lastName }) => {
    addPerson({ variables: { firstName, lastName } });
  };

  return (
    <Form layout="inline" onFinish={onFinish}>
      <Form.Item name="firstName" rules={[{ required: true, message: 'First name is required' }]}>
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item name="lastName" rules={[{ required: true, message: 'Last name is required' }]}>
        <Input placeholder="Last Name" />
      </Form.Item>
      <Button type="primary" htmlType="submit">Add Person</Button>
    </Form>
  );
};

export default PersonForm;
