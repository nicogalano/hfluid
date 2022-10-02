import React from 'react'
import { numberFormatter } from "../utils"

const Results = ({ internalDiameter, normalHeight, hydraulicArea, hydraulicRadius, averageSpeed, froude, specificEnergy }) => {
  return (
    <div className='results'>
      <h2>Results</h2>
      <div className='row'>
        <div className='column equals'>Internal Diameter</div>
        <div className='result column middle-value'>{numberFormatter.format(internalDiameter)}</div>
        <div className='column middle-unit'>m</div>
      </div>
      <div className='row'>
        <div className='column equals'>Normal Height</div>
        <div className='result column middle-value'>{numberFormatter.format(normalHeight)}</div>
        <div className='column middle-unit'>m</div>
      </div>
      <div className='row'>
        <div className='column equals'>Hydraulic Area</div>
        <div className='result column middle-value'>{numberFormatter.format(hydraulicArea)}</div>
        <div className='column middle-unit'>m2</div>
      </div>
      <div className='row'>
        <div className='column equals'>Hydraulic Radius</div>
        <div className='result column middle-value'>{numberFormatter.format(hydraulicRadius)}</div>
        <div className='column middle-unit'>m</div>
      </div>
      <div className='row'>
        <div className='column equals'>Average Speed</div>
        <div className='result column middle-value'>{numberFormatter.format(averageSpeed)}</div>
        <div className='column middle-unit'>m/s</div>
      </div>
      <div className='row'>
        <div className='column equals'>Froude</div>
        <div className='result column middle-value'>{numberFormatter.format(froude)} </div>
        <div className='column middle-unit'>  </div>
      </div>  
      <div className='row'>
        <div className='column equals'>Specific Energy</div>
        <div className='result column middle-value'>{numberFormatter.format(specificEnergy)}</div>
        <div className='column middle-unit'>m</div>
      </div>  
    </div>  
  );
};

export default Results;