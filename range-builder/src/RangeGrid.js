import React, { useEffect, useState } from 'react';
import Cell from './Cell';

const generateHandNames = () => {
  const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
  const hands = [];

  for (let i = 0; i < ranks.length; i++) {
    const row = [];
    for (let j = 0; j < ranks.length; j++) {
      if (i === j) {
        row.push(`${ranks[i]}${ranks[j]}`);
      } else if (i < j) {
        row.push(`${ranks[i]}${ranks[j]}s`);
      } else {
        row.push(`${ranks[j]}${ranks[i]}o`);
      }
    }
    hands.push(row);
  }
  return hands;
};

const RangeGrid = ({ selectedCellIndex, onCellSelect, inputValues, updateComboPercentages }) => {
  const handNames = generateHandNames();
  const [cellData, setCellData] = useState(
    handNames.flat().map(() => ({ betRaise: 0, checkCall: 0, fold: 100 }))
  );
  const [isDragging, setIsDragging] = useState(false);

  const updateCell = (index) => {
    setCellData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...inputValues };
      updateComboPercentages(newData); // コンボ%を更新
      return newData;
    });
  };

  const handleMouseDown = (index) => {
    setIsDragging(true);
    onCellSelect(index);
    updateCell(index);
  };

  const handleMouseEnter = (index) => {
    if (isDragging) {
      onCellSelect(index);
      updateCell(index);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: 'repeat(13, 50px)', gap: '0' }}
      onMouseLeave={handleMouseUp}
    >
      {handNames.flat().map((hand, index) => (
        <Cell
          key={index}
          hand={hand}
          percentages={cellData[index]}
          isSelected={index === selectedCellIndex}
          onMouseDown={() => handleMouseDown(index)}
          onMouseEnter={() => handleMouseEnter(index)}
        />
      ))}
    </div>
  );
};

export default RangeGrid;