import React, { useState }  from 'react';
import { Button, Stack } from "react-bootstrap";
import { newton, getWetArea, getHydraulicRadius, getFroude, numberFormatter } from "./utils"

function App() {
  // input
  const [shape, setShape] = useState('pipe')
  const [diameter, setDiameter] = useState(0)
  const [flow, setFlow] = useState(0)
  const [slope, setSlope] = useState(0)
  const [manning, setManning] = useState(0)
  // output
  const [normalHeight, setNormalHeight] = useState(0)
  const [hydraulicArea, setHydraulicArea] = useState(0)
  const [hydraulicRadius, setHydraulicRadius] = useState(0)
  const [averageSpeed, setAverageSpeed] = useState(0)
  const [froude, setFroude] = useState(0)
  const [specificEnergy, setSpecificEnergy] = useState(0)

  function calculate() {
    console.log(shape, diameter)
    if (flow === 0) {
      alert('Please enter a valid flow')

      return
    }
    if ( slope === 0) {
      alert('Please enter a valid slope')
      return
    }
    if (manning === 0) {
      alert('Please enter a valid manning')
      return
    }

    if (shape === 'pipe') {
      let normalHeight =  newton(shape,flow,diameter,slope,manning)
      setNormalHeight(normalHeight)
      let hydraulicArea = getWetArea(shape,normalHeight,diameter)
      setHydraulicArea(hydraulicArea)
      let hydraulicRadius = getHydraulicRadius(shape,normalHeight,diameter)
      setHydraulicRadius(hydraulicRadius)
      let averageSpeed = (flow / 3600) / hydraulicArea
      setAverageSpeed(averageSpeed)
      let specificEnergy = normalHeight + (averageSpeed ** 2) / 9.806
      setSpecificEnergy(specificEnergy)
      let froude = getFroude(shape,flow,normalHeight,diameter)
      setFroude(froude)
    }
  }

  function clearValues(e) {
    e.preventDefault()
    setShape("pipe")
    setDiameter(0)
    setFlow(0)
    setSlope(0)
    setManning(0)
    setNormalHeight(0)
    setHydraulicArea(0)
    setHydraulicRadius(0)
    setAverageSpeed(0)
    setFroude(0)
    setSpecificEnergy(0)
  }

  function handleSubmit(e) {
      e.preventDefault()
      calculate()
  }

  return (
  <main>
    <section className='section-center'>
      <h1>h flow</h1>
      <form className='channel-form' onSubmit={handleSubmit}>
        <div className="header">
          <div>
            <h2>Input</h2>
          </div>
          <div className="row">
            <button type='submit' className='submit-btn column equals'>Calculate</button>
            <button type='clear' className='submit-btn column equals' onClick={clearValues}>Clear All</button>
          </div>
        </div>
        <div className='form-control'>          
          <label className='column equals'>Select the shape</label>
          <select 
            className='channel equals' 
            value={shape} 
            onChange={(e) => setShape(e.target.value)
          }>
            <option value='pipe'>Pipe</option>
            <option value='rectangular'>Rectangular</option>
            <option value='trapezoid'>Trapezoid</option>
            <option value='ushaped'>U-Shaped</option>
          </select>
        </div>
        <div className='form-control'>
          <label className='column equals'>Diameter</label>
          <input 
            type='number' 
            className='channel column middle-value'
            value={diameter}
            min={0}
            step={0.001}
            onChange={(e) =>  setDiameter(e.target.value)}
            />
          <div className='units middle-unit'>m</div>
        </div>
        <div className='form-control'>
          <label className='column equals'>Flow</label>
            <input 
              type='number' 
              className='channel column middle-value'
              value={flow}
              min={0}
              onChange={(e) =>  setFlow(e.target.value)}
              />
            <div className='units middle-unit'>m3/hr</div>
        </div>
        <div className='form-control'>
          <label className='column equals'>Slope</label>
          <input 
            type='number' 
            className='channel column middle-value'
            value={slope}
            step={0.001}
            onChange={(e) =>  setSlope(e.target.value)}
            />
          <div className='units middle-unit'>m/m</div>
        </div>
        <div className='form-control'>
          <label className='column equals'>Manning's Roughness</label>
          <input 
            type='number' 
            className='channel column middle-value'
            value={manning}
            min={0} 
            step={0.001}
            onChange={(e) =>  setManning(e.target.value)}
            />
          <div className='units middle-unit'>n</div>
        </div>
      </form>
      <div className='results'>
        <h2>Results</h2>
        <div className='row'>
          <div className='column equals'>Altura Normal</div>
          <div className='result column middle-value'>{numberFormatter.format(normalHeight)}</div>
          <div className='column middle-unit'>m</div>
        </div>
        <div className='row'>
          <div className='column equals'>Área Hidráulica</div>
          <div className='result column middle-value'>{numberFormatter.format(hydraulicArea)}</div>
          <div className='column middle-unit'>m2</div>
        </div>
        <div className='row'>
          <div className='column equals'>Radio hidráulico</div>
          <div className='result column middle-value'>{numberFormatter.format(hydraulicRadius)}</div>
          <div className='column middle-unit'>m</div>
        </div>
        <div className='row'>
          <div className='column equals'>Velocidad media</div>
          <div className='result column middle-value'>{numberFormatter.format(averageSpeed)}</div>
          <div className='column middle-unit'>m/s</div>
        </div>
        <div className='row'>
          <div className='column equals'>Froude</div>
          <div className='result column middle-value'>{numberFormatter.format(froude)} </div>
          <div className='column middle-unit'>  </div>
        </div>  
        <div className='row'>
          <div className='column equals'>Energía Específica</div>
          <div className='result column middle-value'>{numberFormatter.format(specificEnergy)}</div>
          <div className='column middle-unit'>m</div>
        </div>  
      </div>  
      
      
    </section>
  </main>
  )
}

export default App
