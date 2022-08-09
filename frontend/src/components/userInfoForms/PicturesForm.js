import ImageUploading from "react-images-uploading";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import useImage from "../../utils/useImage";

const PicturesForm = () => {
  const images = useImage();
  // const [images, setImages] = useState([]);
  // const maxNumber = 5;
  // const onChange = (imageList, addUpdatedIndex) => {
  //   console.log(imageList, addUpdatedIndex);
  //   setImages(imageList);
  // };
  console.log("this is images: ", images);
  return (
    <>
      <Container className="signup-container mb-3 mt-5 w-75">
        {/* <div className="uploading-wrapper w-75 h-75"> */}
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
            // write your building UI
            <div className="uploading-container">
              <div className="images-wrapper">
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <div className="image-cnt mb-3">
                      <img src={image.data_url} alt="" width="100" />
                    </div>
                    <div className="image-item-btn-wrapper mb-3">
                      <button onClick={() => onImageUpdate(index)}>
                        Change image
                      </button>
                      <button onClick={() => onImageRemove(index)}>
                        Remove image
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pictures-form-btn">
                <Button
                  size="lg"
                  style={isDragging ? { color: "red" } : null}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </Button>
              </div>
            </div>
          )}
        </ImageUploading>
        {/* </div> */}
      </Container>
    </>
  );
};

export default PicturesForm;
