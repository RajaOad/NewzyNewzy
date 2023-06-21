import '@/styles/globals.css'
import "@/styles/Navbar.module.css"
import Navbar from './components/Navbar'
import { useRouter } from 'next/router';
import Footer from './components/Footer';

export default function App({ Component, pageProps }) {

  const router = useRouter();

  const excludedPaths = [
    '/user/dashboard',
    '/user/addnews',
    '/user/usernews',
    `/user/newspost/${encodeURIComponent(router.query.slug)}`,
  ];
  // Check if the current pathname is in the excludedPaths array

  const shouldRenderNavbar = !excludedPaths.includes(
    router.asPath.split('?')[0]
  );


  return <>
  {shouldRenderNavbar && <Navbar />}
  <Component {...pageProps} />
  <Footer/>
  </>
}
