import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../Config";

const LayoutView: React.FC = () => {
  const pathname = useLocation().pathname;
  const [currentPath, setCurrentPath] = useState(pathname);
  const NAVIGATE = useNavigate();

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const handleLogin = () => {
    axios
      .get(`${API_URL}/auth/is_admin`)
      .then((response) => {
        window.alert("You already have admin access.");
        return;
      })
      .catch((response) => {
        var passAttempt = window.prompt("Please enter code:");

        axios
          .post(`${API_URL}/auth/login`, { accessCode: passAttempt })
          .then((response) => {
            if (response.data === "Admin access granted.") {
              window.alert("Admin access granted.");
              // NAVIGATE("/admin", {replace: true});
            }
          })
          .catch((response) => {
            if (passAttempt === "" || passAttempt === null) return;
            window.alert("The code was invalid.");
            console.error(response);
          });
      });
  };

  return (
    <>
      <Alert variant="danger" className="mb-0 p-2 text-center"><span><i className="fa-solid fa-warning fa-fw me-1" />This website is <b>under active construction</b>. Not all features are guaranteed to work at this time.</span></Alert>
      <Navbar className="fancyNav">
        <Container>
          <Nav activeKey={currentPath} className="m-auto gap-3 text-center">
            <Nav.Link as={Link} to="/" eventKey="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/registry" eventKey="/registry">
              Registry
            </Nav.Link>
            <Nav.Link as={Link} to="/wedding-party" eventKey="/wedding-party">
              Wedding Party
            </Nav.Link>
            <Nav.Link as={Link} to="/rsvp" eventKey="/rsvp">
              RSVP
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/our-story" eventKey="/our-story">
              Our Story
            </Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
      <footer>
        <Container>
          <Row>
            <Col className="text-center text-muted small">
              <Button variant="link" onClick={handleLogin}>
                Admin
              </Button>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default LayoutView;
