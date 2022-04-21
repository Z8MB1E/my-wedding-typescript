import { useEffect, useState } from "react";
import {
  Button,
  Col,
  FloatingLabel,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { IRegistryCategory } from "../Interfaces/RegistryInterfaces";

/**
 * Defines a new wedding registry item.
 * @interface IRegistryNewItem
 */
export interface IRegistryNewItem {
  name: string;
  description: string;
  imageURL: string;
  purchaseURL: string;
  estimatedPrice: string;
  category?: number;
  priceOrMore?: boolean;
  amountDesired?: number;
  isExact?: boolean;
}

const RegistryNewItemModal: React.FC<{
  show: boolean;
  onHide: any;
  categories: IRegistryCategory[];
  saveNewItem: any;
}> = (props) => {
  const [show, setShow] = useState(props.show);
  const [buttonText, setButtonText] = useState(
    <>
      <i className="fa-solid fa-save fa-fw" /> Save Item
    </>
  );
  const [categories, setCategories] = useState(props.categories);
  const [formData, setFormData] = useState({
    name: undefined,
    description: undefined,
    imageURL: undefined,
    purchaseURL: undefined,
    estimatedPrice: undefined,
    category: 0,
    priceOrMore: false,
    amountDesired: 0,
    isExact: false,
  });
  const [formDataChanged, setFormDataChanged] = useState(false);

  useEffect(() => {
    if (props.show === true)
      setButtonText(
        <>
          <i className="fa-solid fa-save fa-fw" /> Save Item
        </>
      );
    setShow(props.show);
  }, [props.show]);

  useEffect(() => {
    setCategories(props.categories);
  }, [props.categories]);

  // This is messy, but I don't intend to change it right now. Minimum viable product is the goal!
  const handleSave = () => {
    var shouldContinue = true;
    Object.entries(formData).every(([field, val]) => {
      console.log(`${field} - ${val}`);
      if (
        typeof val === undefined ||
        val === undefined ||
        val.toString() === ""
      ) {
        console.log("found undefined");
        window.alert("One or more required fields is missing data!");
        shouldContinue = false;
        return false;
      }
      return true;
    });

    if (!shouldContinue) return;

    if (
      !window.confirm(
        "Please be aware that once you have added an item you will need to talk to Jason to edit it later. Are you sure you want to save this item?"
      )
    )
      return;

    setButtonText(
      <>
        <i className="fa-solid fa-spin-pulse fa-spinner fa-fw" /> Saving...
      </>
    );

    props.saveNewItem(formData).then(() => {
      setButtonText(
        <>
          <i className="fa-solid fa-check fa-fw" /> Saved!
        </>
      );

      setTimeout(() => {
        props.onHide();
      }, 1000);
    });

    // setTimeout(() => {
    //   console.table(formData);
    //   props.saveNewItem();
    //   setButtonText(
    //     <>
    //       <i className="fa-solid fa-check fa-fw" /> Saved!
    //     </>
    //   );

    //   setTimeout(() => {
    //     props.onHide();
    //   }, 1000);
    // }, 2500);
  };

  const handleChange = async (e: React.ChangeEvent<any>) => {
    setFormDataChanged(true);
    if (e.target.name === "priceOrMore" || e.target.name === "isExact")
      return setFormData({ ...formData, [e.target.name]: e.target.checked });
    // console.log(formData);
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      show={show}
      centered
      size="lg"
      keyboard
      fullscreen="md-down"
    >
      <Modal.Header>
        <Modal.Title>Add Item to Registry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col lg={8} className="mb-2">
              <Form.Group>
                <FloatingLabel label="Item name">
                  <Form.Control
                    id="name"
                    name="name"
                    type="input"
                    placeholder="ex. Brown Leather Couch"
                    maxLength={100}
                    onChange={handleChange}
                    required
                  ></Form.Control>
                  <Form.Text>
                    This does not have to be the exact item name, only what you
                    want it to say in the registry. For example:{" "}
                    <i>Brown Leather Couch</i>
                  </Form.Text>
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col className="mb-2">
              <InputGroup>
                <InputGroup.Text>
                  <i className="fa-solid fa-dollar-sign fa-fw" />
                </InputGroup.Text>
                <Form.Control
                  id="estimatedPrice"
                  name="estimatedPrice"
                  type="number"
                  placeholder="ex. 1,000"
                  onChange={handleChange}
                  required
                ></Form.Control>
                <Form.Switch
                  className="d-flex align-self-center ms-2 mb-1"
                  id="priceOrMore"
                  name="priceOrMore"
                  onChange={handleChange}
                />
                <Form.Text>
                  May be an exact or approximate (expected) price.{" "}
                  <small>
                    Flip the switch to ON if it could cost more than the
                    estimated price.
                  </small>
                </Form.Text>
              </InputGroup>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={4} className="mb-2">
              <Form.Group>
                <FloatingLabel label="Item description">
                  <Form.Control
                    id="description"
                    name="description"
                    type="input"
                    placeholder="ex. Brown Leather Couch"
                    maxLength={100}
                    onChange={handleChange}
                    required
                  ></Form.Control>
                  <Form.Text>
                    What you would like the item card to say underneath the item
                    name. 100 character maximum.
                  </Form.Text>
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col lg={2} className="mb-2">
              <Form.Group>
                <Form.Switch label="Is exact?" id="isExact" name="isExact" onChange={handleChange}></Form.Switch>
                <Form.Text>
                  Are you requesting exact specifications for this item?
                </Form.Text>
              </Form.Group>
            </Col>
            <Col lg={3} className="mb-2">
              <Form.Group>
                <FloatingLabel label="Item category">
                  <Form.Select
                    id="category"
                    name="category"
                    onChange={handleChange}
                    required
                  >
                    <option>Choose a category...</option>
                    {categories.map((category, _idx) => {
                      return (
                        <option key={_idx} value={category.CategoryId}>
                          {category.CategoryName}
                        </option>
                      );
                    })}
                    {/* <option value="other">Create new category...</option> */}
                  </Form.Select>
                  <Form.Text>
                    Which category to categorize this item within for quicker
                    access.
                  </Form.Text>
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col lg={3} className="mb-2">
              <Form.Group>
                <FloatingLabel label="Amount desired">
                  <Form.Control
                    id="amountDesired"
                    name="amountDesired"
                    size="sm"
                    type="number"
                    max={99}
                    placeholder="Amount of item desired"
                    onChange={handleChange}
                  />
                  <Form.Text>
                    How many of this item you are asking for.
                  </Form.Text>
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="mb-2">
              <Form.Group>
                <FloatingLabel label="URL of item">
                  <Form.Control
                    id="purchaseURL"
                    name="purchaseURL"
                    size="sm"
                    type="url"
                    placeholder="https://www.amazon.com/Stone-Beam-Down-Filled-Oversized-Hardwood/dp/B07P5LNM5P"
                    maxLength={255}
                    onChange={handleChange}
                    required
                  ></Form.Control>
                  <Form.Text>
                    The link to the item's page. For example:{" "}
                    <a
                      href="https://www.amazon.com/Stone-Beam-Down-Filled-Oversized-Hardwood/dp/B07P5LNM5P"
                      className="small"
                    >
                      https://www.amazon.com/Stone-Beam-Down-Filled-Oversized-Hardwood/dp/B07P5LNM5P
                    </a>
                  </Form.Text>
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col className="mb-2">
              <Row>
                <Col>
                  <Form.Group>
                    <FloatingLabel label="URL of item image">
                      <Form.Control
                        id="imageURL"
                        name="imageURL"
                        size="sm"
                        type="url"
                        placeholder="https://images-na.ssl-images-amazon.com/images/I/71nl-VimOgL.__AC_SY300_SX300_QL70_FMwebp_.jpg"
                        maxLength={255}
                        onChange={handleChange}
                        required
                      ></Form.Control>
                      <Form.Text>
                        The link to the image to be used on the item card. For
                        example:{" "}
                        <a
                          href="https://images-na.ssl-images-amazon.com/images/I/71nl-VimOgL.__AC_SY300_SX300_QL70_FMwebp_.jpg"
                          className="small"
                        >
                          https://images-na.ssl-images-amazon.com/images/I/71nl-VimOgL.__AC_SY300_SX300_QL70_FMwebp_.jpg
                        </a>
                      </Form.Text>
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                {/* <Col>
                  <Button variant="dark" className="w-100 h-100 shadow">
                    <p>or grab an image from</p>
                    <img src="https://images.pexels.com/lib/api/pexels-white.png" alt="Pexels" className="w-100" /></Button>
                </Col> */}
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            props.onHide();
            setFormDataChanged(false);
          }}
        >
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          {buttonText}
          {/* <i className="fa-solid fa-save fa-fw" /> Save Item */}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistryNewItemModal;
