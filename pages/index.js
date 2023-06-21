import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';
import NewsList from './components/NewsList';
import SideAdvertisement from './components/SideAdvertisement';
import ListNews from './components/ListNews';
import { useState } from 'react';
import DummyImage from './components/DummyImage';

function Home({ topNews, technologyNews }) {

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  function getDayFromDate(dateString) {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate();
    return day;
  }
  

  function getMonthFromString(dateString) {
    const dateObject = new Date(dateString);
    const monthIndex = dateObject.getMonth();
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthIndex];
  }
  
  
  

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  function limitDescription(description, maxLength) {
    if (description.length > maxLength) {
      return `${description.slice(0, maxLength)}...`;
    }
    return description;
  }

  const Cap = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
    <div className='flex flex-col mx-3 md:mx-0 lg:flex-row justify-evenly  mt-28'>



      <div className='lg:w-3/5 w-full'>
      <div className='md:mx-6 lg:mx-0'>
      <Splide
        className='w-full mx- lg:mx-0 mt-8'
        aria-label='My Favorite Images'
        options={{
          rewind: true,
          height: 500,
          gap: '1rem',
          type: 'loop',
          perPage: 1,
          perMove: 1,
          autoplay: true,
               breakpoints: {
            1024: {
              
            },
            768: {
              height: 300,
            },
          }
        }}
      >
        {topNews.map((article) => (

          <SplideSlide key={article.id}>
            <div
        className="zoom relative w-full h-full overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
        data-te-ripple-init
        data-te-ripple-color="light">
          
        <img
          src={article.image}
          className="w-full h-full align-middle transition duration-300 ease-linear" />
          
         
          
        <a href={`/user/shared/${encodeURIComponent(article.title)}` } target="_blank">
          <div
            className="absolute top-0 right-0 bottom-0 left-0 h-full bg-[hsla(0,0%,0%,0.4)] w-full overflow-hidden bg-fixed">
            <div className="flex h-full items-end justify-start">
              <div className="m-6 text-white">
                <h5 className="mb-3 text-lg md:text-3xl font-bold">{article.title}</h5>
                <p className='text-xs font-semibold'>
                  
                    Published <u>{formatDate(article.createdAt)}</u> by {article.author}
                </p>
              </div>
            </div>
          </div>
          <div
            className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed transition duration-300 ease-in-out hover:bg-[hsla(0,0%,99%,0.15)]"></div>
        </a>
      </div>
          </SplideSlide>
        ))}
      </Splide>
      </div>

 
      <div className="container w-full my-16 md:px-6">

<section className="text-center">
  <h2 className="mb-12 text-center text-3xl font-bold">Top articles</h2>

  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-12">
  {topNews.slice(0, 6).map((article) => (
    <div key={article._id} className="mb-6 lg:mb-0">
      <div className="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
        data-te-ripple-init data-te-ripple-color="light">
        <img src={article.image} className="w-full h-48" alt="Louvre" />
        <a href={`/user/shared/${encodeURIComponent(article.title)}` } target='_blank'>
          <div
            className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
          </div>
        </a>
      </div>
      <a href={`/user/shared/${encodeURIComponent(article.title)}` } target='_blank'>
      <h5 className="mb-3 break-words text-lg font-bold">{limitDescription(article.title, 40)}</h5>
      </a>
   
      <p className="mb-6 text-neutral-500 dark:text-neutral-300">
        <small>Published <u>{formatDate(article.createdAt)}</u> by
          <a href="#!"> {article.author}</a></small>
      </p>
      <p className="text-neutral-500 break-words dark:text-neutral-300">
        {limitDescription(article.desc, 130)}
      </p>
    </div>
  ))}

  </div>
</section>

</div>

      </div>

     

      <div className='lg:w-1/4 w-full'>
<div className='md:px-6 lg:px-0'>
      <SideAdvertisement/>
      </div>

    <div className="container md:mb-16 lg:mb-0 mt-28 md:px-6">

  <section>

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">

    {technologyNews.slice(0, 4).map((article) => (

      <div key={article._id}
        className="zoom relative overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
        data-te-ripple-init
        data-te-ripple-color="light">
        <img
          src={article.image}
          className="w-full h-full align-middle transition duration-300 ease-linear" />
        <a href="#!">
          <div
            className="absolute top-0 right-0 bottom-0 left-0 h-full w-full bg-[hsla(0,0%,0%,0.4)] overflow-hidden bg-fixed">
            <div className="flex h-full items-end justify-start">
              <div className="m-6 text-white">
                <h5 className="mb-3 text-lg font-bold">{article.title}</h5>
                <p className='font-semibold'>
                  
                    Published <u>{formatDate(article.createdAt)}</u> by {article.author}
                  
                </p>
              </div>
            </div>
          </div>
          <div
            className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed transition duration-300 ease-in-out hover:bg-[hsla(0,0%,99%,0.15)]"></div>
        </a>
      </div>

      ))}

    </div>
  </section>

</div>


    </div>

    </div>

    

<div className='flex flex-col md:flex-row justify-evenly'>

  <div className='md:w-1/3 px-3 md:px-0 md:pl-6 lg:w-1/4'>

  {/* <div className=" py-20">
      <h1 className="text-3xl border-gray-200 py-2 border font-semibold mb-4">Business News</h1>
      <div className="grid grid-cols-1 gap-1">
        {topNews.slice(0, 5).map((article) => (
          <NewsList key={article._id} article={article} />
        ))}
      </div>
    </div> */}

  </div>

<div className='md:w-4/6 lg:h-3/4'>
<div className="container mx-auto md:px-6">

  <section>
 
    <h2 className="mb-12 text-center text-3xl font-bold">Latest News</h2>

    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

    {topNews.slice(0, 8).map((article) => (

     
    <div key={article._id} className="flex-shrink max-w-full w-full px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
    <div className="flex flex-row sm:block hover-img">
      <a href="https://www.brecorder.com/news/40248190/gold-listless-as-markets-assess-recent-us-data-and-fed-cues" target="_blank">
        {/* <img className="max-w-full h-full w-full mx-auto" src={article.image_url} alt="alt title" /> */}
        {article.image && !imageError ? (
          <img className="max-w-full h-full w-full mx-auto" src={article.image} alt={article.title} onError={handleImageError} />
        ) : (
          <DummyImage
            logoName="Newzy Newzy"
            textColor="#168eea"
            backgroundColor="#e2e8f0"
            width="100%"
            height="100%"
          />
        )}
      </a>
      <div className="py-0 sm:py-3 pl-3 sm:pl-0">
        <h3 className="text-md break-words font-bold leading-tight mb-2">
          <a href="https://www.brecorder.com/news/40248190/gold-listless-as-markets-assess-recent-us-data-and-fed-cues" target="_blank">
           {article.title}
          </a>
        </h3>
        <p className="hidden text-sm md:block break-words text-gray-600 leading-tight mb-1">{limitDescription(article.desc, 100)}</p>
        <a className="text-gray-500" href="#"><span className="inline-block h-3 border-l-2 border-red-600 mr-2"></span>{article.author}</a>
      </div>
    </div>
  </div>

      ))}

    </div>
  </section>

</div>
</div>


</div>





    <div className="w-full bg-blue-100 mx-auto md:mt-16 lg:mt-0 py-8 p-5 sm:p-10 md:p-16">
    <div className="grid grid-cols-1 gap-10">

     
     


<Splide
        className='w-full mt-8'
        aria-label='My Favorite Images'
        options={{
          rewind: true,
          height: 450,
          gap: '1rem',
          type: 'loop',
          perPage: 3,
          perMove: 1,
          color:'#4f46e5',
          autoplay: true,
          breakpoints: {
            1024: {
              perPage: 2,
            },
            768: {
              perPage: 1,
            },
          }
        }}
      >
        {technologyNews.slice(0, 8).map((article) => (

          <SplideSlide key={article._id}>
           
           <div className="rounded overflow-hidden shadow-lg">

            <a href="#"></a>
            <div className="relative">
                <a href="#">
                    {/* <img className="w-full h-72"
                        src={article.image}/> */}

{article.image && !imageError ? (
          <img className="w-full h-72" src={article.image} alt={article.title} onError={handleImageError} />
        ) : (
          <DummyImage
            logoName="Newzy Newzy"
            textColor="#168eea"
            backgroundColor="#e2e8f0"
            width="100%"
            height="18rem"
          />
        )}

                    <div
                        className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                    </div>
                </a>
                <a href="#!">
                    <div
                        className="absolute bottom-0 left-0 bg-blue-600 px-4 py-2 text-white text-sm hover:bg-white hover:text-blue-600 transition duration-500 ease-in-out">
                        {Cap(article.category)}
                    </div>
                </a>

                <a href="!#">
                    <div
                        className="text-sm absolute top-0 right-0 bg-blue-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-blue-600 transition duration-500 ease-in-out">
                        <span className="font-bold">{getDayFromDate(article.createdAt)}</span>
                        <small>{getMonthFromString(article.createdAt)}</small>
                    </div>
                </a>
            </div>
            <div className="px-6 bg-white py-4">

                <a href="#"
                    className="font-semibold text-lg inline-block hover:text-blue-600 transition duration-500 ease-in-out">{limitDescription(article.title, 60)}</a>
                <p className="text-gray-500 text-sm">
                    {limitDescription(article.desc, 40)}
                </p>
            </div>
          
        </div>

          </SplideSlide>
        ))}
      </Splide>

      </div>
</div>

<div className='flex mt-16 flex-col md:flex-row justify-evenly'>



<div>
<div className="container mx-auto md:px-6">

  <section>
 
    <h2 className="mb-12 text-center text-3xl font-bold">Entertainment News</h2>

    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

    {topNews.slice(0, 8).map((article) => (

     
    <div key={article._id} className="flex-shrink max-w-full w-full px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
    <div className="flex flex-row sm:block hover-img">
      <a href="https://www.brecorder.com/news/40248190/gold-listless-as-markets-assess-recent-us-data-and-fed-cues" target="_blank">
        {/* <img className="max-w-full h-full w-full mx-auto" src={article.image} alt="alt title" /> */}

        {article.image && !imageError ? (
          <img className="max-w-full h-full w-full mx-auto" src={article.image} alt={article.title} onError={handleImageError} />
        ) : (
          <DummyImage
            logoName="Newzy Newzy"
            textColor="#168eea"
            backgroundColor="#e2e8f0"
            width="100%"
            height="100%"
          />
        )}
        
      </a>
      <div className="py-0 sm:py-3 pl-3 sm:pl-0">
        <h3 className="text-md break-words font-bold leading-tight mb-2">
          <a href="https://www.brecorder.com/news/40248190/gold-listless-as-markets-assess-recent-us-data-and-fed-cues" target="_blank">
           {article.title}
          </a>
        </h3>
        <p className="hidden text-sm md:block break-words text-gray-600 leading-tight mb-1">{limitDescription(article.desc, 100)}</p>
        <a className="text-gray-500" href="#"><span className="inline-block h-3 border-l-2 border-red-600 mr-2"></span>{article.author}</a>
      </div>
    </div>
  </div>

      ))}

    </div>
  </section>

</div>
</div>

<div className='px-3 md:pr-6'>

<SideAdvertisement/>

</div>

</div>

<div className='flex  mt-12 flex-col md:flex-row justify-evenly'>


<div className='md:w-4/6 lg:w-3/4'>
<div className="container mx-auto md:px-6">

  <section>
 
    <h2 className="mb-12 text-center text-3xl font-bold">Sports News</h2>

    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

    {topNews.slice(0, 8).map((article) => (

     
    <div key={article._id} className="flex-shrink max-w-full w-full px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
    <div className="flex flex-row sm:block hover-img">
      <a href="https://www.brecorder.com/news/40248190/gold-listless-as-markets-assess-recent-us-data-and-fed-cues" target="_blank">
        {/* <img className="max-w-full h-full w-full mx-auto" src={article.image} alt="alt title" /> */}

        {article.image && !imageError ? (
          <img className="max-w-full h-full w-full mx-auto" src={article.image} alt={article.title} onError={handleImageError} />
        ) : (
          <DummyImage
            logoName="Newzy Newzy"
            textColor="#168eea"
            backgroundColor="#e2e8f0"
            width="100%"
            height="100%"
          />
        )}
        
      </a>
      <div className="py-0 sm:py-3 pl-3 sm:pl-0">
        <h3 className="text-md break-words font-bold leading-tight mb-2">
          <a href="https://www.brecorder.com/news/40248190/gold-listless-as-markets-assess-recent-us-data-and-fed-cues" target="_blank">
           {article.title}
          </a>
        </h3>
        <p className="hidden text-sm md:block break-words text-gray-600 leading-tight mb-1">{limitDescription(article.desc, 100)}</p>
        <a className="text-gray-500" href="#"><span className="inline-block h-3 border-l-2 border-red-600 mr-2"></span>{article.author}</a>
      </div>
    </div>
  </div>

      ))}

    </div>
  </section>

</div>
</div>

  <div className='md:w-1/3 px-3 md:px-0 md:pr-6 lg:w-1/4'>

  {/* <div className=" py-20">
      <h1 className="text-3xl border-gray-200 py-2 border font-semibold mb-4">Politics News</h1>
      <div className="grid grid-cols-1 gap-1">
        {topNews.slice(0, 5).map((article) => (
          <ListNews key={article._id} article={article} />
        ))}
      </div>
    </div> */}

  </div>



</div>

<div className="w-full bg-blue-100 mx-auto md:mt-16 lg:mt-0 py-8 p-5 sm:p-10 md:p-16">
    <div className="grid grid-cols-1 gap-10">

     
     


<Splide
        className='w-full mt-8'
        aria-label='My Favorite Images'
        options={{
          rewind: true,
          height: 400,
          gap: '1rem',
          type: 'loop',
          perPage: 4,
          perMove: 1,
          autoplay: true,
          breakpoints: {
            1024: {
              perPage: 2,
            },
            768: {
              perPage: 1,
            },
          }
        }}
      >
        {technologyNews.map((article) => (

          <SplideSlide key={article._id}>
           
           <div className="rounded overflow-hidden shadow-lg">

            <a href="#"></a>
            <div className="relative">
                <a href="#">
                    {/* <img className="w-full h-60"
                        src={article.image}/> */}

{article.image && !imageError ? (
          <img className="w-full h-60" src={article.image} alt={article.title} onError={handleImageError} />
        ) : (
          <DummyImage
            logoName="Newzy Newzy"
            textColor="#168eea"
            backgroundColor="#e2e8f0"
            width="100%"
            height="15rem"
          />
        )}

                    <div
                        className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                    </div>
                </a>
                <a href="#!">
                    <div
                        className="absolute bottom-0 left-0 bg-blue-600 px-4 py-2 text-white text-sm hover:bg-white hover:text-blue-600 transition duration-500 ease-in-out">
                        {Cap(article.category)}
                    </div>
                </a>

                <a href="!#">
                    <div
                        className="text-sm absolute top-0 right-0 bg-blue-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-blue-600 transition duration-500 ease-in-out">
                        <span className="font-bold">{getDayFromDate(article.createdAt)}</span>
                        <small>{getMonthFromString(article.createdAt)}</small>
                    </div>
                </a>
            </div>
            <div className="px-6 bg-white py-4">

                <a href="#"
                    className="font-semibold text-lg inline-block hover:text-blue-600 transition duration-500 ease-in-out">{limitDescription(article.title, 40)}</a>
                <p className="text-gray-500 text-sm">
                    {limitDescription(article.desc, 40)}
                </p>
            </div>
          
        </div>

          </SplideSlide>
        ))}
      </Splide>

      </div>
</div>


</>

  );
}

export async function getServerSideProps() {
  try {
    const categories = [
      { name: 'top', limit: 8 },
      { name: 'sports', limit: 5 },
      { name: 'technology', limit: 10 },
    ];

    const promises = categories.map(async (category) => {
      const url = `${process.env.NEXT_PUBLIC_HOST}/api/getnewsbycategory?category=${category.name}&limit=${category.limit}`;
      const response = await fetch(url);
      const result = await response.json();
      return result.categoryNews || [];
    });

    const [topNews, sportsNews, technologyNews] = await Promise.all(promises);

    return {
      props: {
        topNews,
        sportsNews,
        technologyNews,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        topNews: [],
        sportsNews: [],
        technologyNews: [],
      },
    };
    
  }
}


export default Home;
