import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NewsCard from './NewsCard';

const News = (props) => {
  const router = useRouter();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    document.title = `${Cap(props.category)} - Newzy Newzy`;
    updateNews();
  }, [router.asPath]);

  const Cap = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const country = props.country;
  const category = props.category;

  const updateNews = async () => {
    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en&country=${country}&category=${category}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result.results);
      setArticles(result.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="mt-28 mb-14 text-4xl font-bold text-center text-blue-700">{`${Cap(props.category)} - News`}</h1>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-8 mb-16 md:mx-4 ">
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
      </div>
    </>
  );
};

export default News;
