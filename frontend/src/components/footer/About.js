import logo from "../../media/Matcha-logos_black.png";
import { Container, Image } from "react-bootstrap";
import luke from "../../media/luke.JPG";
import omar from "../../media/omar.jpg";
import ScrollTop from "../../utils/scrollTop";
import { Link } from "react-router-dom";
const About = () => {
  ScrollTop("about");
  return (
    <div id="about" className="mb-5">
      <Container>
        <Container className="terms-logo-container ms-0 w-25">
          <Link to="/">
            <Image alt="" src={logo} className="w-50" />
          </Link>
        </Container>
      </Container>
      <hr />
      <Container>
        <div>
          <p className="fs-1">
            <b>About Us</b>
          </p>
          <p className="fs-4">
            <b>The project concept</b>
          </p>
          <p className="text-muted">
            Matcha is a Hive's School project. The idea here is to build a
            dating app. Starting from the frontend to the backend and handling
            all Geolocation matters as well.
            <br />
            The project goal is to learn the use of micro-framework and the
            ability to build a big web application that can be available for
            many users simultaneously.
            <br />
            Additionally, the web app should be working in real time. Meaning
            that any updates happens to any user, should render in the app right
            away like in the real world applications.
            <br />
            We have decided to use the following tools to build this project:
          </p>
          <ul className="text-muted">
            <li>React</li>
            <li>NodeJs</li>
            <li>Bootstrap</li>
            <li>Express</li>
            <li>Redux</li>
            <li>Postgres</li>
          </ul>
          <p className="fs-4">
            <b>The team</b>
          </p>
          <div className="team-row">
            <div className="team-col">
              <div className="team-img-container mb-5">
                <img alt="" src={omar} />
              </div>
              <p className="fs-5">
                <b>Omar Abdelfattah</b>
              </p>
              <p className="text-muted">
                Full stack developer enthusiast, with big interest in working in
                frontend
              </p>
            </div>

            <div className="team-col">
              <div className="team-img-container mb-5">
                <img alt="" src={luke} />
              </div>
              <p className="fs-5">
                <b>Luke Lönnroth</b>
              </p>
              <p className="text-muted">
                I am here to rock the place and make everything great and no one
                can stop me.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
