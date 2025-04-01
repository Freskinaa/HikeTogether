import React from 'react';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import './modal.scss';

const Modal = ({ onClose, children}) => {
  return (
    <div className='template-modal'>
        <span className="template-wrapper-modal" onClick={onClose} />
        <div className='template-content-modal'>
            <div className='template-btn__container close'>
                <Button
                    type="button"
                    className="basic-btn green"
                    onClick={onClose}
                >
                    <FontAwesomeIcon icon={faX}/>
                </Button>
            </div>
            <div className='other-data'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Modal