import { Container, Nav, Navbar, NavDropdown, Form } from "react-bootstrap";

const HomeNavBar = () => {
  return (
    <Navbar bg="light" expand="lg" className="mt-3">
      <Container>
        <Nav>
          <NavDropdown title="sort by">
            <NavDropdown.Item href="#age">age</NavDropdown.Item>
            <NavDropdown.Item href="#tags">tags</NavDropdown.Item>
            <NavDropdown.Item href="#tags">fame rate</NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search with username"
            className="me-2"
            aria-label="Search"
          />
        </Form>
      </Container>
    </Navbar>
  );
};

export default HomeNavBar;
