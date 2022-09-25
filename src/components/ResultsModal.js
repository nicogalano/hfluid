import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useGlobalContext } from '../contexts/context'
import { numberFormatter } from '../utils'

const Modal = () => {
  const { 
    isModalOpen, 
    closeModal, 
    normalHeight,
    hydraulicArea,
    hydraulicRadius,
    averageSpeed,
    froude,
    specificEnergy,
    clearAll    
  } = useGlobalContext();

  const handleClick = e => {
    clearAll()
    closeModal()
  }


  return (
    <div className={`${
        isModalOpen ? 'modal-overlay show-modal' :
        'modal-overlay'
      }`}>
      <div className="modal-container">
        <h3>Results</h3>
        <button className='close-modal-btn' onClick={handleClick}>
          <FaTimes />
        </button>
        <div className='units'>
          <div>Altura Normal {numberFormatter.format(normalHeight)} m</div>
          <div>Área hidráulica {numberFormatter.format(hydraulicArea)} m2</div>
          <div>Radio hidráulico {numberFormatter.format(hydraulicRadius)} m</div>
          <div>Velocidad media {numberFormatter.format(averageSpeed)} m/s</div>
          <div>Froude {numberFormatter.format(froude)} </div>
          <div>Energía Específica {numberFormatter.format(specificEnergy)} m</div>
        </div>
      </div>      
    </div>
  )
}

export default Modal
