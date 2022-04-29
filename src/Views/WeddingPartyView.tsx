import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Nav,
  ProgressBar,
  Row,
} from "react-bootstrap";
// import { run as runHolder } from "holderjs/holder";
import { useHolderjs } from "use-holderjs";
import { useEffect } from "react";
import { env } from "process";

const WeddingPartyView: React.FC = () => {
  useHolderjs();

  useEffect(() => {
    document.title = "Wedding Party - Jason & Alyssa";
  }, []);

  return (
    <Container fluid className="p-sm-5 p-3">
      <Row>
        <Col className="text-center">
          <h1>Our Wedding Party</h1>
          <p className="lead">
            Our wedding wouldn't have been possible without these people and the
            impact they've had in our lives. Scroll below to see just how
            impactful they've been.
          </p>
          <hr className="w-50 mx-auto" />
        </Col>
      </Row>
      <Row className="w-lg-100 w-xl-75 m-auto">
        <Col className="party-members">
          <div className="text-center m-auto mb-4">
            <i className="fa-solid fa-users fa fw" />
            <h2>The Bridal Party</h2>
          </div>
          <Row className="bg-light rounded border-1 p-3 shadow mb-3 gy-2">
            <Col
              md={3}
              className="d-flex justify-content-center justify-content-md-start"
            >
              {/* <img src="holder.js/250x250?auto=yes" className="rounded-3" /> */}
              <img
                src={process.env.PUBLIC_URL + "/Assets/Images/alyssa-alice.jpg"}
                className="rounded-3"
                alt="Alice Crowe"
              />
            </Col>
            <Col className="d-flex flex-column justify-content-center">
              <h1 className="mb-0">Alice Crowe</h1>
              <p className="lead text-muted">
                Maid of Honor<i className="ms-1 fa-solid fa-award fa-fw"></i>
              </p>
              <p>
                Alice and Alyssa met in middle school at youth group and quickly
                became friends over their shared love of books, Lord of the
                Rings, and drawing. While in recent years they have been
                separated by the Michigan/Ohio state line, Alice has continued
                to be a good friend. She is graduating from Calvin College in
                Grand Rapids, MI with a poly sci degree. (And Alyssa is very
                proud of her ❤)
              </p>
            </Col>
          </Row>
          <Row className="bg-light rounded border-1 p-3 shadow mb-3 gy-2">
            <Col md={3}>
              {/* <img src="holder.js/250x250?auto=yes" className="rounded" /> */}
              <img
                src={process.env.PUBLIC_URL + "/Assets/Images/alyssa-katelyn.jpeg"}
                className="rounded"
                alt="Katelyn Grant"
              />
            </Col>
            <Col className="d-flex flex-column justify-content-center">
              <h1 className="mb-0">Katelyn Grant</h1>
              <p className="lead text-muted">Bridesmaid</p>
              <p>
                Alyssa and Katelyn met way back in fifth grade in a church class
                where both were socially awkward introverts. The two have been
                close friends despite living what felt like forever away to
                middle schoolers (one hour) and Katelyn introduced Alyssa to her
                first Studio Ghibli movie! Katelyn is currently a very smart
                student at Miami University in Miami, OH, although she is
                currently in a semester abroad in Costa Rica (jealous).
              </p>
            </Col>
          </Row>
          <Row className="bg-light rounded border-1 p-3 shadow mb-3 gy-2">
            <Col md={3}>
              {/* <img src="holder.js/250x250?auto=yes" className="rounded" /> */}
              <img
                src={process.env.PUBLIC_URL + "/Assets/Images/alyssa-taryn.jpg"}
                className="rounded"
                style={{ objectPosition: "top" }}
                alt="Taryn Waugh"
              />
            </Col>
            <Col className="d-flex flex-column justify-content-center">
              <h1 className="mb-0">Taryn Waugh</h1>
              <p className="lead text-muted">Bridesmaid</p>
              <p>
                Out of the entire wedding party, Alyssa has known Taryn the
                longest. The two were homeschooled and attended the same co-op
                and dance studio, often finding themselves in the same classes.
                For a few years, they lost contact as their lives went their
                separate ways, however, when both took classes at MVNU, they
                rekindled their friendship! After struggling through Organic
                Chemistry together, those bonds are never gone. (Science pun.)
                Taryn is a very loyal, very awesome friend who is a pre-vet
                student at MVNU.
              </p>
            </Col>
          </Row>
          <Row className="bg-light rounded border-1 p-3 shadow mb-3 gy-2">
            <Col md={3}>
              <img
                src={process.env.PUBLIC_URL + "/Assets/Images/alyssa-lb.jpg"}
                className="rounded"
              />
            </Col>
            <Col className="d-flex flex-column justify-content-center">
              <h1 className="mb-0">Laura Beth Hurst</h1>
              <p className="lead text-muted">Bridesmaid</p>
              <p>
                While LB is Jason’s sister, Alyssa proudly claims her as her
                own. Over the past two years, LB has been a confidant and friend
                that rivals anyone else. Whether it is providing coffee and
                kitten cuddles, or playing video games or choreographing a
                musical, LB has been a consistent friend and mentor. LB is
                currently working at MVNU and is married to Joe! She and Alyssa
                are kindred spirits.
              </p>
            </Col>
          </Row>
          <Row className="bg-light rounded border-1 p-3 shadow mb-3 gy-2">
            <Col md={3} className="m-auto">
              <img
                src={process.env.PUBLIC_URL + "/Assets/Images/rachel-lilah.jpg"}
                className="rounded"
                style={{height: "350px"}}
              />
            </Col>
            <Col className="d-flex flex-column justify-content-center">
              <h3 className="mb-0">Rachel Fraley <span className="fs-6 fw-normal small text-muted">(on left)</span></h3>
              <p className="lead text-muted">
                Flowergirl
                <i className="ms-1 bi-flower3" />
              </p>
              <p>
                Rachel is one of Jason’s little sisters (and now Alyssa’s).
                Similar to Lilah, Rachel is very free willed and creative. With
                four younger siblings, she is very bossy but also caring.
              </p>
              <hr />
              <h3 className="mb-0">Lilah Van Fossen <span className="fs-6 fw-normal small text-muted">(on right)</span></h3>
              <p className="lead text-muted">
                Flowergirl
                <i className="ms-1 bi-flower3" />
              </p>
              <p>
                Lilah is Alyssa’s favorite little sister. She and Lilah are
                twins, nearly identical in looks and personalities. She is 9
                years old and is a spunky pipsqueak of a girl. She is very
                independent, caring, and creative.
              </p>
            </Col>
          </Row>
          {/* <Row className="bg-light rounded border-1 p-3 shadow mb-3 gy-2">
            <Col md={3}>
              <img src={process.env.PUBLIC_URL + "/Assets/Images/rachel-lilah.jpg"} className="rounded" />
            </Col>
            <Col className="d-flex flex-column justify-content-center">
              <h1 className="mb-0">Rachel Fraley</h1>
              <p className="lead text-muted">
                Flowergirl
                <i className="ms-1 bi-flower3" />
              </p>
              <p>
                Rachel is one of Jason’s little sisters (and now Alyssa’s).
                Similar to Lilah, Rachel is very free willed and creative. With
                four younger siblings, she is very bossy but also caring.
              </p>
            </Col>
          </Row> */}
        </Col>
      </Row>
      <Row>
        <Alert variant="warning" className="w-md-75 w-sm-100 m-auto text-center"><i className="fa-solid fa-hammer fa-fw me-1" /> The section for the party of the groom is currently under construction. The information for this section will be added in a future update.</Alert>
      </Row>
    </Container>
  );
};

export default WeddingPartyView;
