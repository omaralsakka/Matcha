import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";
import AdvanceSearch from "./AdvanceSearch";
import { useState } from "react";

const HomeNavBar = ({ setSort, setOrder, setUsers, originalUsers, searchName }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar
        bg="transparent"
        expand="sm"
        className="mt-3 border border-light rounded"
      >
        <Container>
          <Container className="d-flex d-sm-none align-items-center p-0 mb-2">
            <Navbar.Toggle aria-controls="home-navbar" />
            <span className="d-sm-none fs-6 ms-auto">Search</span>
          </Container>
          <Navbar.Collapse id="home-navbar">
            <Nav className="d-flex align-items-sm-center w-100 justify-content-sm-between gap-sm-0 gap-3">
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
              <Form>
                <Form.Control
                  {...searchName}
                  placeholder="Filter with username"
                  className="me-2"
                  aria-label="Search"
                />
              </Form>
              <Button onClick={handleShow}>Advanced search</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <AdvanceSearch
        originalUsers={originalUsers}
        show={show}
        setShow={setShow}
      />
    </>
  );
};

export default HomeNavBar;
