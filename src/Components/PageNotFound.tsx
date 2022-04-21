import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PageNotFound: React.FC<{ isWIP?: boolean }> = (props) => {
  const HISTORY = useNavigate();
  return (
    <Container className="pageNotFoundContainer">
      {props.isWIP !== true ? (
        <>
          <h1>Page not found! 😢</h1>
          <p>
            The page you were looking for was not found. We're so sorry about
            that!
          </p>
        </>
      ) : (
        <>
          <h1>This page is a work-in-progress. 🛠</h1>
          <p>
            The page you're looking for is currently being worked on. Please
            check back later to see its completed state.
          </p>
        </>
      )}
      <p>
        Would you like to <Button onClick={() => HISTORY(-1)}>go back?</Button>
      </p>
    </Container>
  );
};

export default PageNotFound;
