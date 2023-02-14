import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import AlertMsg from './AlertMsg';

const ModalForm = ({ show, handleShow, handleClose, children }) => {


  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Envío de Mails</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AlertMsg mensaje={"Para agregar más direcciones de correo separar por ; (punto y coma)"} tipo={"info"} />
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Destinatarios</Form.Label>
              <Form.Control as="textarea" placeholder="correo@ejemplo.com; correo1@ejemplo.com" autoFocus rows={3} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Destinatarios CC</Form.Label>
              <Form.Control as="textarea" placeholder="correo@ejemplo.com; correo1@ejemplo.com" autoFocus rows={2} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Destinatarios CCO</Form.Label>
              <Form.Control as="textarea" placeholder="correo@ejemplo.com; correo1@ejemplo.com" autoFocus rows={1} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default ModalForm;