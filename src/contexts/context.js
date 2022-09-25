import React, { useState, useContext } from 'react'
import { newton, getWetArea, getHydraulicRadius, getFroude } from "../utils"

const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
  } 

  // input
  const [shape, setShape] = useState('pipe')
  const [diameter, setDiameter] = useState(0)
  const [flow, setFlow] = useState(0)
  const [slope, setSlope] = useState(0)
  const [manning, setManning] = useState(0)

  function clearAll() {
    console.log("clearAll started");
    setDiameter(0)
    setFlow(0)
    setSlope(0)
    setManning(0)
    console.log("clearAll ended");
  }

  // output
  const [normalHeight, setNormalHeight] = useState(0)
  const [hydraulicArea, setHydraulicArea] = useState(0)
  const [hydraulicRadius, setHydraulicRadius] = useState(0)
  const [averageSpeed, setAverageSpeed] = useState(0)
  const [froude, setFroude] = useState(0)
  const [specificEnergy, setSpecificEnergy] = useState(0)

  function clearValues () {
    setNormalHeight(0)
    setHydraulicArea(0)
    setHydraulicRadius(0)
    setAverageSpeed(0)
    setFroude(0)
    setSpecificEnergy(0)
  }

  function calculate() {
    console.log(shape, diameter)
    if (flow === 0) {
      alert('Please enter a valid flow')
      setIsModalOpen(false)
      return
    }
    if ( slope === 0) {
      alert('Please enter a valid slope')
      setIsModalOpen(false)
      return
    }
    if (manning === 0) {
      alert('Please enter a valid manning')
      setIsModalOpen(false)
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

  return <AppContext.Provider 
    value={{
      isModalOpen, 
      openModal, 
      closeModal,
      shape,
      setShape,
      setDiameter,
      setFlow,
      setSlope,
      setManning,
      normalHeight,
      setNormalHeight,
      calculate,
      hydraulicArea,
      hydraulicRadius,
      averageSpeed,
      froude,
      specificEnergy,
      clearValues,
      clearAll
    }}
>
    {children}
  </AppContext.Provider>
}
// custom hook
export const useGlobalContext = () => {
  return useContext(AppContext)
} 

export {AppContext, AppProvider}