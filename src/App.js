import React, { useState }  from 'react';
import { getInternalDiameter, newton, getWetArea, getHydraulicRadius, getFroude, getMeterfromMilimeter } from "./utils"
import items from './data/specs';
import Results from './components/Results'
import { RadioButton } from './components/RadioButton'



function App() {
  // input
  const [shape, setShape] = useState('pipe')
  const [diameter, setDiameter] = useState(0)
  const [thickness, setThickness] = useState(0)
  const [flow, setFlow] = useState(0)
  const [slope, setSlope] = useState(0)
  const [manning, setManning] = useState(0)
  const [pipePressure, setPipePressure] = useState('PN6')

  // output
  const [internalDiameter, setInternalDiameter] = useState(0)
  const [normalHeight, setNormalHeight] = useState(0)
  const [hydraulicArea, setHydraulicArea] = useState(0)
  const [hydraulicRadius, setHydraulicRadius] = useState(0)
  const [averageSpeed, setAverageSpeed] = useState(0)
  const [froude, setFroude] = useState(0)
  const [specificEnergy, setSpecificEnergy] = useState(0)

  const DN = items[0].HDPE_PE100
  const allDiametersHDPE = ['all',...new Set(DN.map((item) => item.DNmm))];
  const allPN = Object.keys(DN[0]).splice(2, 7)



  const allPressuresHDPE = [new Set(DN.map((item) => item.PN6))];
  

  function calculate() {
    console.log(shape, diameter)
    if (flow === 0 || slope === 0 || manning === 0) {
      alert('Please enter a valid values')
      return
    }


    if (shape === 'pipe') {
      let internalDiameter =  getInternalDiameter(diameter, thickness)
      setInternalDiameter(internalDiameter)
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
    setThickness(0)
    setFlow(0)
    setSlope(0)
    setManning(0)
    setPipePressure()
    setInternalDiameter(0)
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

  function changePressure(e) {
    const PN = e.target.value 
    setPipePressure(PN)

    if (diameter !== 0) {
      const tmp = DN.filter((item) => item.DNmm === diameter * 1000)[0]

      const filtered = Object.keys(tmp)
        .filter(key => PN.includes(key))
        .reduce((obj, key) => {
          obj[key] = tmp[key];
          return obj;
        }, {});

      if (filtered[PN] === '-') {
        return setThickness(0)
      } else {
        setThickness(filtered[PN] / 1000)
      }
    }
  }

  function changeDiameter(e) {
    const de = e.target.value * 1000
    const allowed = pipePressure
    const tmp = DN.filter((item) => item.DNmm === de)[0]

    const filtered = Object.keys(tmp)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = tmp[key];
        return obj;
      }, {});

    setDiameter(e.target.value)   

    if (filtered[allowed] === '-') {
      return setThickness(0)
    } else {
      setThickness(filtered[allowed] / 1000)
    }
  }

  const [pipeMaterial, setPipeMaterial] = useState("HDPE");

  const radioChangeHandler = (e) => {
    setPipeMaterial(e.target.value);
  };

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
          <label className='column equals'>Shape</label>
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
          <label className='column equals'>Material</label>
          <div className='column equals'>
            <RadioButton
              changed={radioChangeHandler}
              id="1"
              isSelected={pipeMaterial === "custom"}
              label="CUSTOM"
              value="custom"
            />
            <RadioButton
              changed={radioChangeHandler}
              id="2"
              isSelected={pipeMaterial === "hdpe"}
              label="HDPE"
              value="hdpe"
            />
          </div>
        </div>
        {pipeMaterial === "hdpe" && (

          <div>
            <div className='form-control'>          
              <label className='column equals'>Pipe Pressure</label>
              <select 
                className='channel equals' 
                onChange={changePressure}
              >
                {allPN.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                    
                  </option>
                ))}
              </select>
            </div>

            <div className='form-control'>          
              <label className='column equals'>Diameter</label>
              <select 
                className='channel equals' 
                onChange={changeDiameter}
              >
                {DN.map((option, index) => (
                  <option key={index} value={getMeterfromMilimeter(option.DNmm)}>
                    {option.DNmm} mm ({option.DNpulg}")
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        
        {/* CAMBIAR CLASE PARA QUE QUEDE BLOQUEADO DIAMETRO Y ESPESOR */}
        <div className='form-control'>
          <label className='column equals'>External Diameter</label>
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
          <label className='column equals'>Thickness</label>
          <input 
            type='number' 
            className='channel column middle-value'
            value={thickness}
            min={0}
            step={0.0001}
            onChange={(e) =>  setThickness(e.target.value)}
            />
          <div className='units middle-unit'>m</div>
        </div>

        {/* DESDE ESTE CAMPO ES COMUN  */}
        <div className='form-control'>
          <label className='column equals'>Flow</label>
            <input 
              type='number' 
              className='channel column middle-value'
              value={flow}
              min={0}
              onChange={(e) =>  setFlow(e.target.value)}
              />
            <div className='units middle-unit'>m3/h</div>
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
      <Results 
        internalDiameter={internalDiameter} 
        normalHeight={normalHeight} 
        hydraulicArea={hydraulicArea} 
        hydraulicRadius={hydraulicRadius} 
        averageSpeed={averageSpeed} 
        froude={froude} 
        specificEnergy={specificEnergy}
      />
      

      {/* <section className="pipe-selector">
        <h3>Pipe</h3>
        <div className="row">
          <label className='column'>Material</label>
        </div>
        <div className="row">
          <button className="column equals pipe-btn">HDPE</button>
          <button className="column equals pipe-btn">STEEL</button>
        </div>
        <div className="row">
          <label className='column'>Material</label>
        </div>
      </section> */}
    </section>
  </main>
  )
}

export default App
