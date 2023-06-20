import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewsCard from './UserNewsCard';

const NewsArticles = () => {

    useEffect(() => {

        getNews()

    }, [])
    
    const [articles, setArticles] = useState([])



    const deleteNews = async (id)=> {

      // API Call
      const url = `${process.env.NEXT_PUBLIC_HOST}/api/deletenews?id=${id}`;

      const authToken = localStorage.getItem("token");
      const res = await fetch(url, {
       method: "DELETE",
      
       headers: {
         "Content-Type": "application/json",
         'Authorization': `Bearer ${authToken}`,
         
       }
     })
     let response = await res.json()
     console.log(response)
    
     if(response.success) {
      toast.success(response.success, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        window.location.reload();
        
    } else {
      toast.error(response.error, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }

    }


    const getNews = async () => {

        try {

            const url = `${process.env.NEXT_PUBLIC_HOST}/api/getusernews`;
            const authToken = localStorage.getItem("token");
            // const response = await fetch(url);
            const response = await fetch(url, {
              headers: {
                'Authorization': `Bearer ${authToken}`,
              },
            });
            const result = await response.json();
            console.log(result.news)
            setArticles(result.news)
            console.log(articles)
            
        } catch (error) {

            console.error(error);
            
        }

       

    }

   

  return (
    <>

    

  <section class="mb-32 text-center md:text-left">
  <ToastContainer
position="top-left"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    <h2 class="my-12 text-center text-3xl font-bold">Your Articles</h2>

    { articles.map((article)=> {

return <NewsCard
 key={article.title}
title={article.title}
desc={article.desc}
category={article.category}
language={article.lang}
author={article.author}
imgUrl={article.image}
time={article.createdAt}
slug={article._id}
deleteNews={deleteNews}
/>

}) }

 

  </section>
 
</>


  )
}

export default NewsArticles