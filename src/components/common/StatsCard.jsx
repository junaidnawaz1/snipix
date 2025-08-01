import React from 'react'

const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow rounded p-4 flex items-center space-x-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <h4 className="text-gray-600">{title}</h4>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
