import React from 'react';
import Pill from '../components/Pill';
import './pillpage.css';

export default function PillPage() {
  return (
    <div className='pillPage'>
      <div className='medNameBox'>
        <h3>[Medication Name]</h3>
      </div>
      <div className='pillBox'>
        <Pill />
      </div>
      <div>
        <p>Hello</p>
      </div>
    </div>
  );
}