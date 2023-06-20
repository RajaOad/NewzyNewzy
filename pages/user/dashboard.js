
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Layout from '../components/Layout';

const Dashboard = () => {

  const router = useRouter();

  useEffect(() => {
  
    const token = localStorage.getItem('token')
      if(!token) {
        router.push('/user/login')
      }

  }, [])
  

  return (
    <>
    <Layout>

    <div className="flex h-screen">
    <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className='mb-4'>Welcome to your dashboard! This is where you can manage your articles and other important information.</p>
       
      </div>
    </div>

    </Layout>
    </>
  )
}

export default Dashboard