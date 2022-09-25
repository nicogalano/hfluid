import React, { useContext, useState, useEffect } from 'react'
import { AppContext, useGlobalContext } from '../contexts/context'

const Home = () => {
  const {
    openModal,
    shape,
    setShape,
    diameter,
    setDiameter,
    flow,
    setFlow,
    slope,
    setSlope,
    manning,
    setManning,
    calculate,
    clearAll,
  } = useGlobalContext();

  function handleSubmit(e) {
      e.preventDefault()
      calculate()
  }

  console.log("render")
  console.log(diameter)
  console.log(slope)
  console.log(manning)
  console.log(shape)
  return (
  <main>
    <section className='section-center'>
      <form className='channel-form' onSubmit={handleSubmit}>
        <h3>h flow</h3>
        <div>
          <label className='units'>Select the shape of the pipeline</label>
          <div className='form-control'>          
              <select 
                className='channel' 
                value={shape} 
                onChange={(e) => setShape(e.target.value)
              }>
                <option value='pipe'>Pipe</option>
                <option value='rectangular'>Rectangular</option>
                <option value='trapezoid'>Trapezoid</option>
                <option value='ushaped'>U-Shaped</option>
              </select>
          </div>
        </div>
        <div>
          <label className='units'>Diameter</label>
          <div className='form-control'>
            <input 
              type='number' 
              className='channel'
              value={diameter}
              min={0}
              step={0.001}
              onChange={(e) =>  setDiameter(e.target.value)}
              />
            <div className='units'>m</div>
          </div>
        </div>
        <div>
          <label className='units'>Flow</label>
          <div className='form-control'>
            <input 
              type='number' 
              className='channel'
              value={flow}
              min={0}
              onChange={(e) =>  setFlow(e.target.value)}
              />
            <div className='units'>m3/hr</div>
          </div>
        </div>
        <div> 
          <label className='units'>Slope</label>
          <div className='form-control'>
            <input 
              type='number' 
              className='channel'
              value={slope}
              step={0.001}
              onChange={(e) =>  setSlope(e.target.value)}
              />
            <div className='units'>m/m</div>
          </div>
        </div>
        <div>
          <label className='units'>Manning's Roughness Coefficients</label>
          <div className='form-control'>
            <input 
              type='number' 
              className='channel'
              value={manning}
              min={0} 
              step={0.001}
              onChange={(e) =>  setManning(e.target.value)}
              />
            <div className='units'>n</div>
          </div>
        </div>
        <div className='form-control'>
          <button type='submit' className='submit-btn' onClick={openModal}>Calculate</button>
          
        </div>
      </form>
      <div className='form-control'>
        <button type='submit' className='clearall-btn' onClick={clearAll}>Clear All</button>
      </div>
    </section>
  </main>)
}

export default Home
