import React from 'react';
import NewsCard from './NewsCard';

const News = ({ articles, category }) => {
  const Cap = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <h1 className="mt-28 mb-14 text-4xl font-bold text-center text-blue-700">{`${Cap(category)} - News`}</h1>

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

export async function getServerSideProps(context) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const country = 'pk'; // Replace with the desired country
  const category = 'top'; // Replace with the desired category

  const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en&country=${country}&category=${category}`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    const articles = result.results || []; // If result.results is null or undefined, set an empty array

    return {
      props: {
        articles,
        category,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        articles: [],
        category: '',
      },
    };
  }
}
