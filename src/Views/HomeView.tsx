import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import DaysCounter from "../Components/DaysCounter";

const HomeView: React.FC = () => {
  useEffect(() => {
    document.title = "Home - Jason & Alyssa";
  }, []);

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
      </Container>
    </main>
  );
};

export default HomeView;
