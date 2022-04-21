import axios from "axios";
import { MouseEvent, useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { API_URL } from "../Config";

const RegistryInstructionsModal: React.FC<{
  show: boolean;
  onHide: any;
}> = (props) => {

  return (
    <>
      <Modal show={props.show}>
        <Modal.Header>
          <Modal.Title>New to our website?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            When you click "purchase and claim" on an item, the registry will <b>open a new tab</b> that will take you to the relevant purchase page. When you are done, <b>return to this tab</b>! A new prompt will open asking if you would like to claim the item (indicating your intent to purchase or act thereof.) This will help us understand what to expect from registry donors!
          </p>
          <p>Thank you so much for giving to us in this new season of life!</p>
          <Alert variant="secondary" className="p-2 m-2"><i className="fa-solid fa-info-circle fa-fw me-1" />This message will not appear again.</Alert>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-row justify-content-around">
          <Button
          onClick={props.onHide}>
            I understand!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegistryInstructionsModal;
