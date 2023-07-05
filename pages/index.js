import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';
import SideAdvertisement from './components/SideAdvertisement';
import { useEffect, useState } from 'react';
import DummyImage from './components/DummyImage';

function Home() {
 const [imageError, setImageError] = useState(false);
    const [allNews, setAllNews] = useState([]);
    const [topNews, setTopNews] = useState([]);
    const [sportsNews, setSportsNews] = useState([]);
    const [worldNews, setWorldNews] = useState([]);
    const [businessNews, setBusinessNews] = useState([]);
    const [politicsNews, setPoliticsNews] = useState([]);
    const [technologyNews, setTechnologyNews] = useState([]);
    const [entertainmentNews, setEntertainmentNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const url2 = `${process.env.NEXT_PUBLIC_HOST}/api/getnews`;
          const res = await fetch(url2);
          const newsData = await res.json();
          const allNews = newsData.news;
          setAllNews(allNews);
  
          const categories = [
            { name: 'top', limit: 20 },
            { name: 'sports', limit: 10 },
            { name: 'world', limit: 10 },
            { name: 'business', limit: 10 },
            { name: 'politics', limit: 10 },
            { name: 'technology', limit: 10 },
            { name: 'entertainment', limit: 10 },
          ];
  
          const promises = categories.map(async (category) => {
            const url = `${process.env.NEXT_PUBLIC_HOST}/api/getnewsbycategory?category=${category.name}&limit=${category.limit}`;
            const response = await fetch(url);
            const result = await response.json();
            return result.categoryNews || [];
          });
  
          const [
            topNews,
            sportsNews,
            worldNews,
            businessNews,
            politicsNews,
            technologyNews,
            entertainmentNews,
          ] = await Promise.all(promises);
  
          setTopNews(topNews);
          setSportsNews(sportsNews);
          setWorldNews(worldNews);
          setBusinessNews(businessNews);
          setPoliticsNews(politicsNews);
          setTechnologyNews(technologyNews);
          setEntertainmentNews(entertainmentNews);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setError(error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error.message}</p>;
    }

 

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
        {topNews.slice(0, 8).map((article) => (

          <SplideSlide key={article._id}>
            <div 
        className="zoom relative w-full h-full overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
        data-te-ripple-init
        data-te-ripple-color="light">
          
       

{article.image && !imageError ? (
              <img className="w-full h-full align-middle transition duration-300 ease-linear" src={article.image} alt={article.title} onError={handleImageError} />
            ) : (
              <DummyImage
                logoName="Newzy Newzy"
                textColor="#168eea"
                backgroundColor="#e2e8f0"
                width="100%"
                height="100%"
              />
            )}
          
         
          
        <a href={`/user/shared/${encodeURIComponent(article.title)}` } target="_blank">
          <div
            className="absolute top-0 right-0 bottom-0 left-0 h-full bg-[hsla(0,0%,0%,0.4)] w-full overflow-hidden bg-fixed">
            <div className="flex h-full items-end justify-start">
              <div className="m-6 text-white">
                <h5  style={{wordBreak: "break-word"}} className="mb-3 text-lg md:text-3xl font-bold">{article.title}</h5>
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
  <h2 className="mb-12 text-center text-3xl font-bold">Top News</h2>

  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-12">
  {topNews.slice(8, 14).map((article) => (
    <div key={article._id} className="mb-6 lg:mb-0">
      <div className="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
        data-te-ripple-init data-te-ripple-color="light">
        {article.image && !imageError ? (
              <img className="w-full h-48" src={article.image} alt={article.title} onError={handleImageError} />
            ) : (
              <DummyImage
                logoName="Newzy Newzy"
                textColor="#168eea"
                backgroundColor="#e2e8f0"
                width="100%"
                height="12rem"
              />
            )}
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
{article.image && !imageError ? (
              <img className="w-full h-full align-middle transition duration-300 ease-linear" src={article.image} alt={article.title} onError={handleImageError} />
            ) : (
              <DummyImage
                logoName="Newzy Newzy"
                textColor="#168eea"
                backgroundColor="#e2e8f0"
                width="100%"
                height="100%"
              />
            )}

        <a href={`/user/shared/${encodeURIComponent(article.title)}` } target='_blank'>
          <div
            className="absolute top-0 right-0 bottom-0 left-0 h-full w-full bg-[hsla(0,0%,0%,0.4)] overflow-hidden bg-fixed">
            <div className="flex h-full items-end justify-start">
              <div className="m-6 text-white">
                <h5  style={{wordBreak: "break-word"}} className="mb-3 text-lg font-bold">{article.title}</h5>
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

  <div className=" py-20">
      <h1 className="text-3xl border-gray-200 py-2 border font-semibold mb-4">Business News</h1>
      <div className="grid grid-cols-1 gap-1">
        {businessNews.slice(0, 5).map((article) => (
          <div key={article._id} className=" cursor-pointer NewsList flex items-center p-4 bg-white rounded shadow">
          {/* <img src={article.image_url} alt={article.title} className="w-24 h-24 object-cover rounded-md mr-4" /> */}
          {article.image && !imageError ? (
              <img className="w-24 h-24 object-cover rounded-md mr-4" src={article.image} alt={article.title} onError={handleImageError} />
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
          <div>
            <a href={`/user/shared/${encodeURIComponent(article.title)}` } target='_blank'>
            <h2 style={{wordBreak: "break-word"}} className="text-lg md:text-xs lg:text-sm font-semibold mb-2">{limitDescription(article.title, 70)}</h2></a>
            {/* <p className="text-gray-500">{limitDescription(article.desc, 40)}</p> */}
          </div>
        </div>
        ))}
      </div>
    </div>

  </div>

<div className='md:w-4/6 lg:h-3/4'>
<div className="container mx-auto md:px-6">

  <section>
 
    <h2 className="mb-12 text-center text-3xl font-bold">Latest News</h2>

    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

    {allNews.slice(0, 8).map((article) => (

     
    <div key={article._id} className="flex-shrink max-w-full w-full px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
    <div className="flex flex-row sm:block hover-img">
      <a href={`/user/shared/${encodeURIComponent(article.title)}` } target="_blank">
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
        {worldNews.slice(0, 8).map((article) => (

          <SplideSlide key={article._id}>
           
           <div className="rounded overflow-hidden shadow-lg">

            <div className="relative">
                <a href={`/user/shared/${encodeURIComponent(article.title)}` } target='_blank'>
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
                <a href="#">
                    <div
                        className="absolute bottom-0 left-0 bg-blue-600 px-4 py-2 text-white text-sm hover:bg-white hover:text-blue-600 transition duration-500 ease-in-out">
                        {Cap(article.category)}
                    </div>
                </a>

                <a href="#">
                    <div
                        className="text-sm absolute top-0 right-0 bg-blue-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-blue-600 transition duration-500 ease-in-out">
                        <span className="font-bold">{getDayFromDate(article.createdAt)}</span>
                        <small>{getMonthFromString(article.createdAt)}</small>
                    </div>
                </a>
            </div>
            <div className="px-6 bg-white py-4">

                <a href={`/user/shared/${encodeURIComponent(article.title)}` } target='_blank'  style={{wordBreak: "break-word"}}
                    className="font-semibold text-lg inline-block hover:text-blue-600 transition duration-500 ease-in-out">{limitDescription(article.title, 60)}</a>
                <p className="text-gray-500 break-words text-sm">
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

    {entertainmentNews.slice(0, 8).map((article) => (

     
    <div key={article._id} className="flex-shrink max-w-full w-full px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
    <div className="flex flex-row sm:block hover-img">
      <a href={`/user/shared/${encodeURIComponent(article.title)}` } target="_blank">
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
          <a href={`/user/shared/${encodeURIComponent(article.title)}` } target="_blank">
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

    {sportsNews.slice(0, 8).map((article) => (

     
    <div key={article._id} className="flex-shrink max-w-full w-full px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
    <div className="flex flex-row sm:block hover-img">
      <a href={`/user/shared/${encodeURIComponent(article.title)}` } target="_blank">
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
          <a href={`/user/shared/${encodeURIComponent(article.title)}` } target="_blank">
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

  <div className=" py-20">
      <h1 className="text-3xl border-gray-200 py-2 border font-semibold mb-4">Politics News</h1>
      <div className="grid grid-cols-1 gap-1">
        {politicsNews.slice(0, 5).map((article) => (
          <div key={article._id} className=" cursor-pointer NewsList flex items-center p-4 bg-white rounded shadow">
      
          <div>
            <a href={`/user/shared/${encodeURIComponent(article.title)}`} target='_blank'>
            <h2 style={{wordBreak: "break-word"}} className="text-lg md:text-xs lg:text-sm font-semibold mb-2">{limitDescription(article.title, 70)}</h2></a>
            {/* <p className="text-gray-500">{limitDescription(article.desc, 20)}</p> */}
          </div>
          {/* <img src={article.image} alt={article.title} className="w-24 h-24 object-cover rounded-md ml-auto" /> */}
          {article.image && !imageError ? (
              <img className="w-24 h-24 object-cover rounded-md ml-auto" src={article.image} alt={article.title} onError={handleImageError} />
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
        ))}
      </div>
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
        {technologyNews.slice(0, 8).map((article) => (

          <SplideSlide key={article._id}>
           
           <div className="rounded overflow-hidden shadow-lg">

            <div className="relative">
                <a href={`/user/shared/${encodeURIComponent(article.title)}` } target='_blank'>
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
                <a href="#">
                    <div
                        className="absolute bottom-0 left-0 bg-blue-600 px-4 py-2 text-white text-sm hover:bg-white hover:text-blue-600 transition duration-500 ease-in-out">
                        {Cap(article.category)}
                    </div>
                </a>

                <a href="#">
                    <div
                        className="text-sm absolute top-0 right-0 bg-blue-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-blue-600 transition duration-500 ease-in-out">
                        <span className="font-bold">{getDayFromDate(article.createdAt)}</span>
                        <small>{getMonthFromString(article.createdAt)}</small>
                    </div>
                </a>
            </div>
            <div className="px-6 bg-white py-4">

                <a href={`/user/shared/${encodeURIComponent(article.title)}` } target='_blank' style={{wordBreak: "break-word"}}
                    className="font-semibold text-lg inline-block hover:text-blue-600 transition duration-500 ease-in-out">{limitDescription(article.title, 40)}</a>
                <p className="text-gray-500 break-words text-sm">
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

export default Home;
