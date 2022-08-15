import ImageUploading from "react-images-uploading";
import { Button, Card } from "react-bootstrap";
import { Container } from "react-bootstrap";
import useImage from "../../utils/useImage";
import {
  pictureFormService,
  InfoFilledTokenService,
} from "../../services/userServices";

const UserImageCard = ({ index, src, onImageUpdate, onImageRemove }) => {
  return (
    <Card style={{ width: "18rem" }} className="m-3">
      <Card.Img className="card-img-top" variant="top" src={src} />
      <Card.Body>
        <div className="d-flex justify-content-between">
          <Button
            onClick={() => onImageUpdate(index)}
            className="landing-signup-Button"
            variant="dark"
          >
            Change
          </Button>
          <Button
            onClick={() => onImageRemove(index)}
            className="landing-signup-Button"
            variant="dark"
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

const PicturesForm = ({ setVisibleForm }) => {
  const images = useImage();

  const saveImages = async () => {
    const picFormResponse = await pictureFormService(images.value);
    const infoFilledResponse = await InfoFilledTokenService();
    if (infoFilledResponse) {
      window.localStorage.removeItem("LoggedMatchaUser");
      window.localStorage.setItem(
        "LoggedMatchaUser",
        JSON.stringify(infoFilledResponse)
      );
      window.location.reload();
      setVisibleForm(3);
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
                  size="lg"
                  style={isDragging ? { color: "red" } : null}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </Button>
                <p className="text-muted mt-2">maximum five pictures</p>
              </div>
            </div>
          )}
        </ImageUploading>
        <Button
          disabled={images.value.length ? false : true}
          onClick={saveImages}
          className="landing-signup-Button"
          variant="dark"
        >
          Save
        </Button>
      </Container>
    </>
  );
};

export default PicturesForm;
