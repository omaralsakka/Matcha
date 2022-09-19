import ImageUploading from "react-images-uploading";
import { Button, Card, Spinner } from "react-bootstrap";
import { Container } from "react-bootstrap";
import useImage from "../../utils/useImage";
import {
  pictureFormService,
  InfoFilledTokenService,
} from "../../services/userServices";
import { useState } from "react";
import ScrollTop from "../../utils/scrollTop";

const UserImageCard = ({ index, src, onImageUpdate, onImageRemove }) => {
  ScrollTop("picturesForm");
  return (
    <Card
      id="picturesForm"
      style={{ width: "18rem", minWidth: "12rem" }}
      className="m-3"
    >
      <Card.Img className="card-img-top" variant="top" src={src} />
      <Card.Body className="w-100">
        <Container className="d-flex justify-content-between">
          <Button
            onClick={() => onImageUpdate(index)}
            className="landing-signup-Button"
            variant="dark"
            size="sm"
          >
            Change
          </Button>
          <Button
            onClick={() => onImageRemove(index)}
            className="landing-signup-Button"
            variant="dark"
            size="sm"
          >
            Delete
          </Button>
        </Container>
      </Card.Body>
    </Card>
  );
};

const PicturesForm = ({ defaultValue }) => {
  const images = useImage(defaultValue);
  const [spinner, setSpinner] = useState(false);

  const saveImages = async () => {
    setSpinner(true);
    await pictureFormService(images.value);
    const infoFilledResponse = await InfoFilledTokenService();
    if (infoFilledResponse) {
      window.localStorage.removeItem("LoggedMatchaUser");
      window.localStorage.setItem(
        "LoggedMatchaUser",
        JSON.stringify(infoFilledResponse)
      );
      window.location.reload();
    }
  };

  return (
    <>
      <Container className="signup-container mb-3 mt-3 w-75 mb-5">
        <h1 className="fs-3 text-center mb-3">Upload your favorite pictures</h1>
        <ImageUploading multiple {...images}>
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            <div className="uploading-container">
              <div className="images-wrapper">
                {imageList.map((image, index) => (
                  <UserImageCard
                    key={index}
                    index={index}
                    src={image.data_url}
                    onImageUpdate={onImageUpdate}
                    onImageRemove={onImageRemove}
                  />
                ))}
              </div>
              <div className="pictures-form-btn">
                <Button
                  className="landing-signup-Button"
                  variant="dark"
                  size="md"
                  style={isDragging ? { color: "red" } : null}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </Button>
                <p className="text-muted mt-2">
                  maximum five pictures
                  <br />
                  maximum size 3MB
                </p>
              </div>
            </div>
          )}
        </ImageUploading>
        <Container className="d-flex align-items-center gap-3">
          <Button
            disabled={images.value.length ? false : true}
            onClick={saveImages}
            className="landing-signup-Button"
            variant="dark"
          >
            Save
          </Button>

          {spinner && <Spinner animation="grow" />}
        </Container>
      </Container>
    </>
  );
};

export default PicturesForm;
