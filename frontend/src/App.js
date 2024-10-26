import React from 'react';
import { useQuery } from '@apollo/client';
import { Typography, Divider } from 'antd';
import PersonForm from './components/PersonForm';
import CarForm from './components/CarForm';
import PersonCard from './components/PersonCard';
import { GET_PEOPLE } from './graphql/queries';
import './App.css';

const { Title } = Typography;

const App = () => {
  const { data, loading, error } = useQuery(GET_PEOPLE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  return (
    <div className="app-container">
      <Title className="section-title">PEOPLE AND THEIR CARS</Title>
      
      <div className="form-container">
        <div>
          <Title level={4}>Add Person</Title>
          <PersonForm />
        </div>
        <div>
          <Title level={4}>Add Car</Title>
          {data && data.people.length > 0 ? (
            <CarForm />
          ) : (
            <p>No people to add cars to</p>
          )}
        </div>
      </div>

      <Divider />

      <Title className="records-title">Records</Title>
      {data && data.people.map(person => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  );
};

export default App;
