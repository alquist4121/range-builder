import React, { useEffect, useState } from 'react';
import RangeGrid from './RangeGrid';

const App = () => {
  const [selectedCellIndex, setSelectedCellIndex] = useState(null);
  const [inputValues, setInputValues] = useState({ betRaise: 0, checkCall: 0, fold: 100 });
  const [comboPercentages, setComboPercentages] = useState({ betRaise: 0, checkCall: 0, fold: 0 });

  const handleCellSelect = (index) => {
    setSelectedCellIndex(index);
  };

  const handlePercentageChange = (action, value) => {
    const formattedValue = value.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0));
    const numericValue = formattedValue === '' ? '' : Math.max(0, Math.min(100, parseInt(formattedValue, 10)));

    setInputValues((prev) => ({ ...prev, [action]: numericValue }));

    if (selectedCellIndex !== null && numericValue !== '') {
      setSelectedCellIndex(selectedCellIndex);
    }
  };

  const handleBlur = (action) => {
    setInputValues((prev) => ({ ...prev, [action]: prev[action] === '' ? 0 : prev[action] }));
  };

  // コンボ数の計算関数
  const calculateCombos = (data) => {
    const totalCombos = 52 * 51; // 全体の組み合わせ数
    let betRaiseCombos = 0;
    let checkCallCombos = 0;
    let foldCombos = 0;

    data.forEach(({ betRaise, checkCall, fold }, index) => {
      let comboCount = 6; // デフォルトでペア
      if (index % 13 < index / 13) comboCount = 12; // オフスート
      if (index % 13 > index / 13) comboCount = 4;  // スーテッド

      betRaiseCombos += (betRaise / 100) * comboCount;
      checkCallCombos += (checkCall / 100) * comboCount;
      foldCombos += (fold / 100) * comboCount;
    });

    setComboPercentages({
      betRaise: ((betRaiseCombos / totalCombos) * 100).toFixed(2),
      checkCall: ((checkCallCombos / totalCombos) * 100).toFixed(2),
      fold: ((foldCombos / totalCombos) * 100).toFixed(2),
    });
  };

  useEffect(() => {
    // 初期のデータを渡して計算
    calculateCombos(Array(169).fill({ betRaise: 0, checkCall: 0, fold: 100 }));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <h1>Range Builder</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        {['betRaise', 'checkCall', 'fold'].map((action) => (
          <div key={action} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <label>{action.toUpperCase().replace('BETRAISE', 'BET/RAISE').replace('CHECKCALL', 'CHECK/CALL')}</label>
            <span>{comboPercentages[action]}%</span> {/* コンボ%表示 */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                value={inputValues[action]}
                onChange={(e) => handlePercentageChange(action, e.target.value)}
                onBlur={() => handleBlur(action)}
                style={{ width: '40px' }}
              />
              <span style={{ marginLeft: '4px' }}>%</span>
            </div>
          </div>
        ))}
      </div>
      <RangeGrid
        selectedCellIndex={selectedCellIndex}
        onCellSelect={handleCellSelect}
        inputValues={inputValues}
        updateComboPercentages={calculateCombos} // コンボ%更新のための関数を渡す
      />
    </div>
  );
};

export default App;