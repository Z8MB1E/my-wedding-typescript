import { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import DaysCounter from "../Components/DaysCounter";
import { IRegistryItem } from "../Interfaces/RegistryInterfaces";

const HomeView: React.FC<{ featuredItems: IRegistryItem[] }> = (props) => {
  const [featuredItems, setFeaturedItems] = useState(props.featuredItems);

  useEffect(() => {
    document.title = "Home - Jason & Alyssa";
  }, []);

  useEffect(() => {
    setFeaturedItems(props.featuredItems);
  }, [props.featuredItems]);

  return (
    <main>
      <Container fluid>
        <Row className="jumbotron">
          <Col className="d-flex align-content-center justify-content-center">
            <div className="popout p-3 p-sm-5 m-3 m-sm-5 text-center">
              <div className="p-2" />
              <h2>Join us in celebrating the love of</h2>
              <h1 className="fancytext fs-xxl">
                Alyssa <small>+</small> Jason
              </h1>
              <div className="p-2" />
              <DaysCounter useFullCountdown={false} />
            </div>
          </Col>
        </Row>
        <Row className="w-md-75 m-auto mt-2" hidden={featuredItems.length < 2}>
          <Col className="bg-white border rounded-3 shadow p-5 pt-3">
            <div className="text-center">
              <div>
                <i className="fa-solid fa-star fa-fw" />
              </div>
              <h1 className="mb-3">Featured Registry Items</h1>
              <p className="lead">
                These are the Top {featuredItems.length} items we're looking for the most!
              </p>
            </div>
            <hr />
            <Row lg={5} className="g-4">
              {featuredItems.map((item, _idx) => {
                return (
                  <Col key={_idx}>
                    <Card className="h-100 shadow">
                      <div className="imgAndPriceHolder">
                        <Card.Img variant="top" src={item.ItemImageURL} />
                        <div className="priceDiv">
                          <abbr
                            title={`An estimated price of ${item.EstimatedPrice.replace(
                              "+",
                              " or more"
                            )}.`}
                          >
                            {item.EstimatedPrice}
                          </abbr>
                        </div>
                      </div>
                      {item.ItemIsFeatured ? (
                        <Card.Header as="h6" className="text-primary small">
                          <i className="fa-solid fa-star fa-fw me-1" />
                          Featured
                          <span className="text-muted">
                            {" "}
                            - Highly Desirable
                          </span>
                        </Card.Header>
                      ) : null}
                      <Card.Body className="d-flex flex-column align-items-baseline">
                        <Card.Title>
                          {item.ItemName}
                          {item.CategoryName ? (
                            <span className="d-block fs-6 fw-normal text-muted">
                              {item.CategoryName}
                            </span>
                          ) : undefined}
                          <Badge bg="secondary" className="me-1">
                            {item.ItemClaims}
                            {item.AmountDesired ? (
                              <span>
                                <span className="small"> out of</span>{" "}
                                {item.AmountDesired}
                              </span>
                            ) : (
                              <span>
                                <span className="small"> out of</span> &infin;
                              </span>
                            )}{" "}
                            claims
                          </Badge>
                          {item.IsExact ? (
                            <Badge bg="info">
                              <abbr title="We would preferably like this item exactly as listed/linked.">
                                Exact
                              </abbr>
                            </Badge>
                          ) : (
                            ""
                          )}
                        </Card.Title>
                        <Card.Text>{item.ItemDescription}</Card.Text>
                        <Link
                          to={`/registry?item=${item.ItemId}`}
                          className="mt-auto w-100"
                        >
                          <Button variant="primary" className="w-100">
                            <i className="fa-solid fa-arrow-up-right-from-square fa-fw" />
                            &nbsp;See in Registry
                          </Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default HomeView;
