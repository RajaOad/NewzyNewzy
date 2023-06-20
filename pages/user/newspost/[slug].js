
import News from '@/models/News';
import Layout from '@/pages/components/Layout';
import mongoose from 'mongoose';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react';

const Slug = ({article}) => {

  useEffect(() => {
  
    const token = localStorage.getItem('token')
      if(!token) {
        router.push('/user/login')
      }

  }, [])

  const router = useRouter();
  const { slug } = router.query;
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const handleShare = async () => {
    const sharedLink = `${window.location.origin}/user/shared/${encodeURIComponent(article.title)}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: article.desc,
          url: sharedLink,
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
    <Layout>
<div class="container my-24 mx-auto md:px-6">

  <section class="mb-32 text-center">
 
    <div class="mb-12 flex flex-wrap justify-center">
      <div class="w-full shrink-0 grow-0 basis-auto px-3 md:w-10/12">
      <h5 class="text-lg md:text-xl lg:text-3xl font-bold">
          {article.title}
        </h5>
        <div class="relative mb-6 mt-6 md:mt-8 lg:mt-16 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
          data-te-ripple-init data-te-ripple-color="light">
          <img src={article.image} class="w-full" />
          <a href="#!">
            <div
              class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
            </div>
          </a>
        </div>
      </div>

      <div class="w-full shrink-0 grow-0 basis-auto px-3 md:w-10/12 xl:w-8/12">
       
        <p class="mb-4 text-neutral-500 dark:text-neutral-300">
          <small>Published <u>{formatDate(article.createdAt)}</u> by
            <a href="#!"> {article.author}</a></small>
        </p>
        <p class="mb-6 break-words whitespace-pre-wrap">
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
</Layout>

    </>
  )
}


export async function getServerSideProps(context) {
  let error = null;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
console.log(context.query.slug)
  let news = await News.findOne({ title: decodeURIComponent(context.query.slug) })
  console.log(news)
  if(news == null) {
    return {
      props: {error: 404}, // will be passed to the page component as props
    }
  }


  return {
    props: {error:error, article: JSON.parse(JSON.stringify(news)) }, // will be passed to the page component as props
  };
}


export default Slug