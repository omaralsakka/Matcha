import { useState } from "react";
import { Button, Offcanvas, Form, Spinner, Container } from "react-bootstrap";
import { useStoreUser, useStoreUsers } from "../../utils/getStoreStates";
import LocationSearch from "./advanceSearchComponents/LocationSearch";
import TagsInput from "../userInfoForms/TagsInput";
import InputRange from "react-input-range";

const AdvanceSearch = ({ setUsers }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user } = useStoreUser();
  const usersInStore = useStoreUsers();

  const [tags, setTags] = useState([]);
  const [ranges, setRanges] = useState({
    ageValues: {
      min: 21,
      max: 41,
    },
    fameValues: {
      min: 20,
      max: 60,
    },
  });

  if (!user || !usersInStore) {
    return <Spinner />;
  }

  const handleSearch = () => {
    let filteredUsers = usersInStore.users;
    if (tags.length) {
      filteredUsers = usersInStore.users.filter((singleUser) =>
        singleUser.tags.some((tag) => tags.includes(tag))
      );
    }
    if (filteredUsers.length) {
      filteredUsers = filteredUsers.filter(
        (singleUser) =>
          singleUser.age >= ranges.ageValues.min &&
          singleUser.age <= ranges.ageValues.max
      );
      if (filteredUsers.length) {
        filteredUsers = filteredUsers.filter((singleUser) => {
          if (singleUser.liked_by) {
            return (
              singleUser.liked_by.length >= ranges.fameValues.min &&
              singleUser.liked_by.length <= ranges.fameValues.max
            );
          }
          return [];
        });
      }
    }

    setUsers(filteredUsers);
  };

  const handleReset = () => {
    setTags([]);
    setUsers(usersInStore.users);
    const defaultRanges = {
      ageValues: {
        min: 21,
        max: 41,
      },
      fameValues: {
        min: 20,
        max: 60,
      },
    };
    setRanges(defaultRanges);
  };

  return (
    <>
      <Button onClick={handleShow}>Advanced search</Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <div className="mb-3 bg-light border-bottom">
          <Offcanvas.Header closeButton={"light"}>
            <Offcanvas.Title>Advanced Search</Offcanvas.Title>
          </Offcanvas.Header>
        </div>
        <Offcanvas.Body>
          <LocationSearch user={user} />
          <hr />
          <Container className="p-3" fluid>
            <TagsInput tags={tags} setTags={setTags} />

            <Form.Group className="mb-5">
              <Form.Label>Age range</Form.Label>
              <div className="mt-4 w-50">
                <InputRange
                  maxValue={61}
                  minValue={18}
                  formatLabel={(value) => `${value}`}
                  value={ranges.ageValues}
                  onChange={(value) =>
                    setRanges({ ...ranges, ageValues: value })
                  }
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-5">
              <Form.Label>Fame rate range</Form.Label>
              <div className="mt-4 w-50">
                <InputRange
                  maxValue={100}
                  minValue={0}
                  formatLabel={(value) => `${value}`}
                  value={ranges.fameValues}
                  onChange={(value) =>
                    setRanges({ ...ranges, fameValues: value })
                  }
                />
              </div>
            </Form.Group>

            <div className="d-flex gap-3 mt-5">
              <Button
                onClick={handleSearch}
                size="sm"
                variant="outline-primary"
              >
                Search
              </Button>
              <Button onClick={handleReset} size="sm" variant="outline-dark">
                Reset
              </Button>
            </div>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AdvanceSearch;
