import React, { useState } from 'react'
import DummyImage from './DummyImage';

const ListNews = ({ article }) => {

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
    <div className=" cursor-pointer NewsList flex items-center p-4 bg-white rounded shadow">
      
      <div>
        <h2 className="text-lg md:text-xs lg:text-sm font-semibold mb-2">{limitDescription(article.title, 70)}</h2>
        {/* <p className="text-gray-500">{limitDescription(article.desc, 20)}</p> */}
      </div>
      {/* <img src={article.image} alt={article.title} className="w-24 h-24 object-cover rounded-md ml-auto" /> */}
      {article.image_url && !imageError ? (
          <img className="w-24 h-24 object-cover rounded-md ml-auto" src={article.image_url} alt={article.title} onError={handleImageError} />
        ) : (
          <DummyImage
            logoName="Newzy Newzy"
            textColor="#168eea"
            backgroundColor="#e2e8f0"
            width="6rem"
            height="6rem"
            textSize="1.5rem"
          />
        )}
    </div>
  )
}

export default ListNews
