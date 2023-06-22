// pages/shared/[slug].js

import News from '@/models/News';
import mongoose from 'mongoose';
import React from 'react';
// import { decodeURIComponent } from 'querystring';

const SharedArticle = ({ article }) => {

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: article.desc,
          url: window.location.href,
        });
      } else {
        alert('Web Share API is not supported in this browser.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };


  return (
    <>
    
    <div className="container my-24 mx-auto md:px-6">

<section className="mb-32 text-center">

  <div className="mb-12 flex flex-wrap justify-center">
    <div className="w-full shrink-0 grow-0 basis-auto px-3 md:w-10/12">
    <h5 className="text-lg md:text-xl lg:text-3xl font-bold">
        {article.title}
      </h5>
      <div className="relative mb-6 mt-6 md:mt-8 lg:mt-16 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
        data-te-ripple-init data-te-ripple-color="light">
        <img src={article.image} className="w-full" />
        <a href="#!">
          <div
            className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
          </div>
        </a>
      </div>
    </div>

    <div className="w-full shrink-0 grow-0 basis-auto px-3 md:w-10/12 xl:w-8/12">
     
      <p className="mb-4 text-neutral-500 dark:text-neutral-300">
        <small>Published <u>{formatDate(article.createdAt)}</u> by
          <a href="#!"> {article.author}</a></small>
      </p>
      <p className="mb-6 break-words whitespace-pre-wrap">
        {article.desc}
      </p>
     
    </div>
  </div>

           <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleShare}
            >
              Share
            </button>

</section>

</div>
      
    </>
  );
};

export async function getServerSideProps(context) {
  let error = null;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let news = await News.findOne({ title: decodeURIComponent(context.query.slug) });

  if (news == null) {
    return {
      props: { error: 404 }, // will be passed to the page component as props
    };
  }

  return {
    props: {
      error: error,
      article: JSON.parse(JSON.stringify(news)),
    }, // will be passed to the page component as props
  };
}

export default SharedArticle;
