import React from 'react';

const ActionSelector = ({ percentages, onChange }) => {
  const handleInputChange = (action, e) => {
    const value = parseInt(e.target.value, 10);
    onChange(action, isNaN(value) ? 0 : value);
  };

  return (
    <div>
      {['check', 'raise', 'call', 'fold'].map(action => (
        <div key={action}>
          <label>{action.toUpperCase()}</label>
          <input
            type="number"
            value={percentages[action]}
            onChange={(e) => handleInputChange(action, e)}
            min="0"
            max="100"
          />%
        </div>
      ))}
    </div>
  );
};

export default ActionSelector;