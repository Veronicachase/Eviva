import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  note: Yup.string().required('La nota es requerida'),
});

export function NoteModal({ show, handleClose, handleSave }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar una Nota</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ note: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          handleSave(values.note);
          actions.resetForm();
          handleClose();
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group controlId="formNote">
                <Form.Label>Escribe tu nota</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. Me siento feliz"
                  name="note"
                  value={values.note}
                  onChange={handleChange}
                  isInvalid={!!errors.note}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.note}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="primary" type="submit">
                Guardar Nota
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
