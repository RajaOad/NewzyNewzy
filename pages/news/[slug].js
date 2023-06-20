import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NewsCard from '../components/NewsCard';
import LoadingBar from 'react-top-loading-bar';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import InfiniteScroll from 'react-infinite-scroll-component';

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query; // Get the category from the URL slug
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (slug) {
      document.title = `${Cap(slug)} - Newzy Newzy`;
      updateNews();
    }
  }, [slug]);

  const Cap = (string) => {
    if (!string) {
      return ''; // Return an empty string if string is null or undefined
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const country = 'pk'; // Update with the desired country code

  const updateNews = async () => {
    setLoading(true);

    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en&country=${country}&category=${slug}`;

    try {
      setProgress(30); // Set the progress bar to a specific value

      const response = await fetch(url);
      const result = await response.json();
      console.log(result.results);
      setArticles(result.results || []); // Set empty array if results is null or undefined
      setNextPage(result.nextPage);
      setHasMore(result.nextPage !== null);

      setProgress(100); // Set the progress bar to 100% after loading is complete
    } catch (error) {
      console.error(error);
      setArticles([]); // Set empty array if there's an error
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = async () => {
    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en&country=${country}&category=${slug}&page=${nextPage}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result.results);

      setArticles((prevArticles) => [...prevArticles, ...result.results]);
      setNextPage(result.nextPage);
      setHasMore(result.nextPage !== null);
    } catch (error) {
      console.error(error);
    }
  };

  if (!slug) {
    return null; // Render null or a loading indicator while slug is undefined
  }

  return (
    <>
      <h1 className="mt-28 mb-14 text-4xl font-bold text-center text-blue-700">{`${Cap(slug)} - News`}</h1>

      <LoadingBar
        height={3}
        color="#ff0000" // Change the color to red
        loaderColor="#ff0000" // Change the color of the loading bar
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <div className="flex justify-center">
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
                <CircularProgress />
              </Box>
            }
            endMessage={
              articles.length === 0 ? (
                <p className="text-gray-500 text-center mb-16 text-xl">No news available for the {Cap(slug)} category.</p>
                
              ) : (
                <p className="text-gray-500 text-center mb-16 text-xl">No more articles to load.</p>
              )
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-8 mb-16 md:mx-4">
              {articles.map((news) => (
                <NewsCard
                  key={news.link}
                  title={news.title}
                  description={news.description}
                  imageUrl={news.image_url}
                  time={news.pubDate}
                  source={news.source_id}
                  url={news.link}
                />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </>
  );
};

export default Slug;
