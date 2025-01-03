import React from 'react';
import { Aboutdetails } from '../assets/data/Aboutdetails';

const Card = ({ item }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md hover:drop-shadow-2xl">
      <h1 className="text-md md:text-lg font-bold drop-shadow-lg hover:drop-shadow-2xl">
        {item.title}
      </h1>
      <p className="text-sm md:text-base">{item.description}</p>
    </div>
  );
};

const Opportunity = () => {
  return (
    <div className="grid gap-6 m-6 sm:grid-cols-1 md:grid-cols-2  ">
      {Aboutdetails.map((item, index) => (
        <Card key={index} item={item} />
      ))}
      
    </div>
  );
};

export default Opportunity;
