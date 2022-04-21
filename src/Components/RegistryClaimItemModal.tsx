import axios from "axios";
import { MouseEvent, useEffect, useState } from "react";
import { Accordion, Alert, Button, Modal } from "react-bootstrap";
import { API_URL } from "../Config";

const RegistryClaimItemModal: React.FC<{
  show: boolean;
  onHide: any;
  item: { id: number; url: string; isMaxClaimed: boolean };
  handleClaim: any;
}> = (props) => {
  const [itemName, setItemName] = useState("this item");
  const [claimer, setClaimer] = useState("");
  const [claimBtnText, setClaimBtnText] = useState(
    <>
      <i className="fa-solid fa-tag fa-fw" /> Claim it!
    </>
  );

  useEffect(() => {
    axios
      .get(`${API_URL}/registry/item/${props.item.id}`)
      .then((response) => {
        if (response.data.length > 0) {
          setItemName(response.data[0].ItemName);
        }
      })
      .catch(() => {
        setItemName("this item");
      });
  }, [props.item]);

  useEffect(() => {
    setClaimBtnText(
      <>
        <i className="fa-solid fa-tag fa-fw" /> Claim it!
      </>
    );
  }, [props.show]);

  const handleClaimItem = (
    e: MouseEvent<HTMLButtonElement>,
    itemId: number,
    itemPurchaseURL: string
  ) => {
    let name = window.prompt(
      "Please enter your first and last name (don't worry, only we will see it!)"
    );
    if (name) {
      setClaimer(name);
    } else {
      setClaimer("");
      return;
    }

    setClaimBtnText(
      <>
        <i className="fa-solid fa-spin-pulse fa-spinner fa-fw" /> Claiming...
      </>
    );

    props.handleClaim(itemId, name).then(() => {
      
      setClaimBtnText(
        <>
          <i className="fa-solid fa-check fa-fw" /> Claimed!
        </>
      );

      setTimeout(() => {
        setClaimer("");
        props.onHide();
      }, 1000);
    });
  };

  return (
    <>
      <Modal show={props.show} size="lg" fullscreen="md-down">
        <Modal.Header>
          <Modal.Title>Do you want to claim "{itemName}"?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Adding your claim to this item will signal others of your intent to
            purchase. You can choose not to add a claim, but adding a claim may
            help you and others avoid buying things more than once... unless
            that's the whole point! 😂
          </p>
          {/* <p className="small text-muted">
            We ask that you please do not misuse the claiming system by claiming
            more than you intend or by claiming without providing correct data.
          </p> */}
          <Accordion className="mb-3">
            <Accordion.Item eventKey="instructions">
              <Accordion.Header>
                <h4 className="m-0">
                  Instructions{" "}
                  <span className="fs-6 fw-normal text-muted">
                    (for claiming and purchasing)
                  </span>
                </h4>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  To go to the purchase page of an item, click the green{" "}
                  <span className="text-success fw-bold">
                    "Open purchase page!"
                  </span>{" "}
                  button. This will open the page in a new tab. Either{" "}
                  <b>before or after</b> you open this new tab, you can click
                  the blue{" "}
                  <span className="text-primary fw-bold">"Claim it!"</span>{" "}
                  button to add your claim to the registry. It will ask for your
                  first and last name for confirmation (don't worry, only we'll
                  see it!)
                </p>
                <p className="mb-0">Thank you for your gift! ❤</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          {props.item.isMaxClaimed ? (
            <Alert variant="danger">
              <Alert.Heading><i className="fa-solid fa-hand fa-fw me-1" />Hold on a sec!</Alert.Heading>
              <p>The number of claims on this item matches how many we are asking for. Are you sure you still want to claim this item?</p>
              <p className="small mb-0">(You'll be giving us more than we asked for, which could be nice, but might not be what you intended!)</p>
            </Alert>
          ) : (
            ""
          )}
          <Alert variant="info">
            <i className="fa-solid fa-warning fa-fw me-1" />
            Make sure you return to this tab when you are done!
          </Alert>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-row justify-content-evenly justify-content-sm-around">
          <Button
            id="noClaimBtn"
            variant="secondary"
            disabled={claimer !== "" ? true : false}
            onClick={props.onHide}
          >
            <i className="fa-solid fa-cancel fa-fw" /> Don't claim it.
          </Button>
          <Button
            id="claimBtn"
            variant="success"
            disabled={claimer !== "" ? true : false}
            onClick={(e) => window.open(props.item.url, "_blank")}
          >
            <i className="fa-solid fa-shopping-cart fa-fw me-1" /> Open purchase
            page!
          </Button>
          <Button
            id="claimBtn"
            onClick={(e) => handleClaimItem(e, props.item.id, props.item.url)}
          >
            {claimBtnText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegistryClaimItemModal;
