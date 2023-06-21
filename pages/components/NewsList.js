import React, { useState } from 'react'
import DummyImage from './DummyImage';

const NewsList = ({ article }) => {

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

    function limitDescription(description, maxLength) {
        if (description.length > maxLength) {
          return `${description.slice(0, maxLength)}...`;
        }
        return description;
      }

  return (
    <div></div>
    // <div className=" cursor-pointer NewsList flex items-center p-4 bg-white rounded shadow">
    //   {/* <img src={article.image_url} alt={article.title} className="w-24 h-24 object-cover rounded-md mr-4" /> */}
    //   {article.image && !imageError ? (
    //       <img className="w-24 h-24 object-cover rounded-md mr-4" src={article.image} alt={article.title} onError={handleImageError} />
    //     ) : (
    //       <DummyImage
    //         logoName="Newzy Newzy"
    //         textColor="#168eea"
    //         backgroundColor="#e2e8f0"
    //         width="6rem"
    //         height="6rem"
    //         textSize="1.5rem"
    //       />
    //     )}
    //   <div>
    //     <h2 className="text-lg md:text-xs lg:text-sm font-semibold mb-2">{limitDescription(article.title, 70)}</h2>
    //     {/* <p className="text-gray-500">{limitDescription(article.desc, 40)}</p> */}
    //   </div>
    // </div>
  )
}

export default NewsList
