import React from 'react'
import { useState } from 'react';
import Calendar from 'react-calendar';


const RequestTravelOrder = () => {
    const [value, onChange] = useState(new Date());
  
    return (
      <div>
        <Calendar  />
      </div>
    );
  }

export default RequestTravelOrder