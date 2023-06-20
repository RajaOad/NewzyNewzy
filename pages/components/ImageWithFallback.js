import React, { useState } from 'react';

const ImageWithFallback = ({ src, alt, fallbackSrc, fallbackComponent, ...rest }) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setImageError(true);
    }
  };

  if (imageSrc && !imageError) {
    return <img src={imageSrc} alt={alt} onError={handleImageError} {...rest} />;
  } else if (fallbackComponent) {
    return fallbackComponent;
  } else {
    return null;
  }
};

export default ImageWithFallback;
