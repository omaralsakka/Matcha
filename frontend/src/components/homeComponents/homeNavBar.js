import { Container, Nav, Navbar, NavDropdown, Form } from "react-bootstrap";
import AdvanceSearch from "./AdvanceSearch";
import UseField from "../UseField";
import { useEffect } from "react";
import { useStoreUsers } from "../../utils/getStoreStates";

const HomeNavBar = ({ setSort, setOrder, users, setUsers }) => {
  const usersInStore = useStoreUsers();

  const searchName = UseField("text", "");
  useEffect(() => {
    if (searchName.value.length) {
      const searchedUsers = users.filter((user) =>
        user.username.includes(searchName.value)
      );
      setUsers(searchedUsers);
    } else {
      if (usersInStore.users.length) {
        setUsers(usersInStore.users);
      }
    }
  }, [searchName.value]);

  return (
    <Navbar
      bg="transparent"
      expand="lg"
      className="mt-3 border border-light rounded"
    >
      <Container>
        <Nav bg="light">
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
            {...searchName}
            placeholder="Search with username"
            className="me-2"
            aria-label="Search"
          />
        </Form>
        <AdvanceSearch setUsers={setUsers} />
      </Container>
    </Navbar>
  );
};

export default HomeNavBar;
