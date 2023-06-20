
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import Layout from '../components/Layout';

const Home = () => {

  const router = useRouter();

  useEffect(() => {
  
    const token = localStorage.getItem('token')
      if(!token) {
        router.push('/login')
      }

  }, [])

  return (
    <Layout>
      <div className='flex justify-center mt-8'>
      </div>
    </Layout>
  )
}

export default Home