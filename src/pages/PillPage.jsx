import React from 'react';
import Pill from '../components/Pill';
import PillGen from '../generation/PillGen'
import './pillpage.css';

export default function PillPage() {
  return (
    <div className='pillPage'>
      <div className='medNameBox'>
        <h3>[Medication Name]</h3>
      </div>
      <div className='pillBox'>
        <PillGen />
      </div>
      <div>
        <p>Hello</p>
      </div>
    </div>
  );
}