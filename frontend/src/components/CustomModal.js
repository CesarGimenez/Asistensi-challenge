import { Modal } from "react-bootstrap";

import React from "react";

export const CustomModal = ({ show, onHide, title, content }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <h3>{title}</h3>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
    </Modal>
  );
};
