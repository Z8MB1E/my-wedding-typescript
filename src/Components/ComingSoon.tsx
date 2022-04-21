import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../Config";

const ComingSoon: React.FC = () => {
  const NAVIGATE = useNavigate();

  const handleAdminAccess = () => {
    var passAttempt = window.prompt("Please enter code:");

    axios.post(`${API_URL}/auth/login`, { accessCode: passAttempt }).then(response => {
      if (response.data === "Admin access granted.") {
        NAVIGATE("/admin", {replace: true});
      }
    }).catch(response => {
      window.alert("The code was invalid.");
      console.error(response);
    })
  }
  
  return (
    <>
      <main>
        <div className="page-center">
          <i className="fs-4 fa-solid fa-heart fa-fw"></i>
          <hr />
          <h1>Our website is coming soon...</h1>
          <p>
            and we can't wait to share it with you! Check back later to keep
            track of our progress.
          </p>
          <p style={{ fontWeight: "bold" }}>
            Thank you for being a part of our journey!
          </p>
          <p className="text-muted">
            <small onClick={handleAdminAccess}>- Jason & Alyssa</small>
          </p>
        </div>
      </main>
    </>
  );
};

export default ComingSoon;
