import React from 'react';

const Cell = ({ hand, percentages, onClick, onMouseDown, onMouseEnter, isSelected }) => {
  const { checkCall, betRaise, fold } = percentages;
  const total = checkCall + betRaise + fold;

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      style={{
        position: 'relative',
        border: '1px solid #ccc',
        width: '50px',
        height: '50px',
        cursor: 'pointer',
        backgroundColor: isSelected ? '#e0e0e0' : '#fff',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          backgroundColor: 'yellow',
          width: `${(betRaise / total) * 100 || 0}%`,
          height: '100%',
          position: 'absolute',
          left: 0,
          zIndex: 0,
        }}
      />
      <div
        style={{
          backgroundColor: 'lightgreen',
          width: `${(checkCall / total) * 100 || 0}%`,
          height: '100%',
          position: 'absolute',
          left: `${(betRaise / total) * 100 || 0}%`,
          zIndex: 0,
        }}
      />
      <div
        style={{
          backgroundColor: 'lightgray',
          width: `${(fold / total) * 100 || 0}%`,
          height: '100%',
          position: 'absolute',
          left: `${((betRaise + checkCall) / total) * 100 || 0}%`,
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', fontSize: '10px', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
        {hand}
      </div>
    </div>
  );
};

export default Cell;