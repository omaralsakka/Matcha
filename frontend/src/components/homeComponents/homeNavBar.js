import { Container, Nav, Navbar, NavDropdown, Form } from "react-bootstrap";


const HomeNavBar = ({ setSort, setOrder }) => {
  return (
    <Navbar
      bg="transparent"
      expand="lg"
      className="mt-3 border border-light rounded"
    >
      <Container>
        <Nav>
          <NavDropdown title="sort by">
            <NavDropdown.Item onClick={() => setSort("age")}>
              Age
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => setSort("location")}>
              Location
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => setSort("tags")}>
              Tags
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => setSort("liked_by")}>
              Fame rate
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="order by">
            <NavDropdown.Item onClick={() => setOrder("ascending")}>
              Ascending
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => setOrder("descending")}>
              Descending
            </NavDropdown.Item>
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
