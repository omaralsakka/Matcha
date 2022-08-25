import { useEffect, useState } from "react";
import { Button, Offcanvas, Form, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useStoreUser } from "../../utils/getStoreStates";
import LocationSearch from "./advanceSearchComponents/LocationSearch";
import TagsInput from "../userInfoForms/TagsInput";

const AdvanceSearch = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user } = useStoreUser();
  const [tags, setTags] = useState([]);

  if (!user) {
    return <Spinner />;
  }
  return (
    <>
      <Button onClick={handleShow}>Advanced search</Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Advance Search</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <LocationSearch user={user} />
          <TagsInput tags={tags} setTags={setTags} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AdvanceSearch;
