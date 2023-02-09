import React, { useState } from 'react';
import ModalForm from './components/ModalForm';
import useModal from './hooks/useModal';

function Example() {

    const [show, handleShow, handleClose] = useModal();

    return (
        <>
            <button className='btn btn-warning' onClick={handleShow}>Launch demo modal</button>
            
            <ModalForm show={show} handleShow={handleShow} handleClose={handleClose} />
        </>
    );
}

export default Example;