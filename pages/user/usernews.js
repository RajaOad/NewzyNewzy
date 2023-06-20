
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import NewsArticles from '../components/UserNewsArticles'
import Layout from '../components/Layout'

const Usernews = () => {

  const router = useRouter();

  useEffect(() => {
  
    const token = localStorage.getItem('token')
      if(!token) {
        router.push('/user/login')
      }

  }, [])

  return ( <>
      <Layout>
      <NewsArticles/>
      </Layout>
   
    </>
  )
}

export default Usernews