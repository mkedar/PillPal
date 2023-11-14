import React from 'react';
import pillData from './data/pillData.json';
import Pill from '../components/Pill'

const PillGen = () => {
  return (
    <Pill
      color1={pillData.color1}
      color2={pillData.color2}
      length={pillData.length}
      radius={pillData.radius}
    />
  );
};

export default PillGen;
