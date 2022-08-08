import { Link } from "react-router-dom";
const AppFooter = () => {
  return (
    <div className="main-footer">
      <div className="info-footer">
        <div className="footer-links mt-3">
          <Link to="/terms" className="terms-link mx-1">
            <p className="footer-text">Terms</p>
          </Link>
          <Link to="/about" className="terms-link mx-1">
            <p className="footer-text">About us</p>
          </Link>
        </div>
        <div className="rights-text mt-3">
          <p className="footer-text">
            &copy; 2022 Matcha App - All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppFooter;
