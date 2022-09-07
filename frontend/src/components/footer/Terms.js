import logo from "../../media/Matcha-logos_black.png";
import { Container, Image } from "react-bootstrap";
import ScrollTop from "../../utils/scrollTop";
import { Link } from "react-router-dom";

const Terms = () => {
  ScrollTop("terms");
  return (
    <div id="terms" className="mb-5">
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
            <b>Terms Of Use</b>
          </p>
          <p className="text-muted">Last revised on August 6, 2022</p>
          <p className="fs-4">
            <b>Acceptance of Terms of Use Agreement.</b>
          </p>
          <p className="text-muted">
            By creating a Matcha account, whether through a mobile device, or
            computer (collectively, the “Service”) you agree to be bound by (i)
            these Terms of Use, (ii) our Privacy Policy, Cookie Policy,
            Arbitration Procedures (if applicable to you), Safety Tips, and
            Community Guidelines, each of which is incorporated by reference
            into this Agreement, and (iii) any terms disclosed and agreed to by
            you if you purchase additional features, products or services we
            offer on the Service (collectively, this "Agreement"). If you do not
            accept and agree to be bound by all of the terms of this Agreement,
            please do not use the Service. <br /> <br />
            We may make changes to this Agreement and to the Service from time
            to time. We may do this for a variety of reasons including to
            reflect changes in or requirements of the law, new features, or
            changes in business practices. The most recent version of this
            Agreement will be posted on the Service under Settings and also on
            gotinder.com, and you should regularly check for the most recent
            version. The most recent version is the version that applies. If the
            changes include material changes to your rights or obligations, we
            will notify you at least 30 days in advance of the changes (unless
            we’re unable to do so under applicable law) by reasonable means,
            which could include notification through the Service or via email.
            If you continue to use the Service after the changes become
            effective, then you agree to the revised Agreement.
          </p>
          <p className="fs-4">
            <b>Eligibility.</b>
          </p>
          <p className="text-muted">
            You are not authorized to create an account or access or use the
            Service or systems it resides on unless all of the following are
            true:
          </p>
          <ul className="text-muted">
            <li>you are at least 18 years of age. </li>
            <li>you can form a binding contract with Matcha, </li>
            <li>
              you are not a person who is barred from using the Service under
              the laws of Finalnd or any other applicable jurisdiction (for
              example, you
              <br /> do not appear on Finalnd's Treasury Department’s list of
              Specially Designated Nationals or face any other similar
              prohibition),
            </li>
            <li>
              you will comply with this Agreement and all applicable local,
              state, national and international laws, rules and regulations, and{" "}
            </li>
            <li>
              you have never been convicted of a felony or indictable offense
              (or crime of similar severity), a sex crime, or any crime
              involving violence, and that you are not required to register as a
              sex offender with any state, federal or local sex offender
              registry.
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Terms;
