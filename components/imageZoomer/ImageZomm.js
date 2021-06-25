import React, { useEffect, useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import { apiDomain } from "../../apiPath";

const ImageZoom = (props) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (props.isOpen) {
      setIsOpen(true);
    }
  }, [props.isOpen]);
  useEffect(() => {
    let imagesArray = [];
    for (let i = 0; i < props.images.length; i++) {
      imagesArray.push(
        `${apiDomain}/image/image/${props.images[i].filename}`
      );
    }

    setImages(imagesArray);
  }, [props.images]);
  const onClose = () => {
    setIsOpen(false);
    props.onCloseZoomImage();
  };

  return (
    <div>
      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => onClose(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </div>
  );
};
export default ImageZoom;
