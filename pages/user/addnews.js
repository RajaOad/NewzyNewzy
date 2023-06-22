
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout';

const Addnews = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
  
    const token = localStorage.getItem('token')
      if(!token) {
        router.push('/user/login')
      }

  }, [])

  const handleDescriptionClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    // Perform additional validation
      if (description.length < 20) {

        toast.error('Description should be at least 20 characters long.', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            
        return;
      }

    const data = [{title, desc: description, lang: language, category, author, image}]
    const authToken = localStorage.getItem('token');
  


    // Perform any additional logic such as validation, data formatting, etc.

    let res = await fetch(`/api/addnews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(data),
      })
      let response = await res.json()
   

      if (response.success) {

    // Clear form fields
    setTitle('');
    setDescription('');
    setLanguage('');
    setCategory('');
    setAuthor('');
    setImage('');

    toast.success('Successfully Published', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

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

    // Submit the form data to the server or perform desired action
   
  };

  return (
    <>
    
    <Layout>
    <div className="max-w-xl my-16 mx-auto bg-white rounded-lg shadow-lg p-6">
   
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

<h1 className="text-3xl font-bold mb-6">Add News Article</h1>
<form onSubmit={handleSubmit} className="space-y-6">
  <div>
    <label htmlFor="title" className="block text-sm font-medium mb-1 text-gray-800">
      Title:
    </label>
    <input
      type="text"
      id="title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      minLength={5}
      className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>

  <div>
    <label htmlFor="description" className="block mb-1 text-gray-800">
      Description:
    </label>
    <textarea
      id="description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      onClick={handleDescriptionClick}
      className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    ></textarea>
  </div>

  <div>
  <label htmlFor="language" className="block text-sm font-medium mb-1 text-gray-800">
    Language:
  </label>
  <select
    id="language"
    value={language}
    onChange={(e) => setLanguage(e.target.value)}
    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  >
    <option value="">Select a language</option>
    <option value="english">English</option>
    <option value="urdu">Urdu</option>
    <option value="sindhi">Sindhi</option>

  </select>
</div>


  <div>
  <label htmlFor="category" className="block text-sm font-medium mb-1 text-gray-800">
    Category:
  </label>
  <select
    id="category"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  >
    <option value="">Select a category</option>
    <option value="top">Top</option>
    <option value="business">Business</option>
    <option value="entertainment">Entertainment</option>
    <option value="technology">Technology</option>
    <option value="environment">Environment</option>
    <option value="food">Food</option>
    <option value="sports">Sports</option>
    <option value="science">Science</option>
    <option value="politics">Politics</option>
    <option value="health">Health</option>
    <option value="tourism">Tourism</option>
    <option value="world">World</option>
    <option value="anime">Anime</option>
   
  </select>
</div>


  <div>
    <label htmlFor="author" className="block text-sm font-medium mb-1 text-gray-800">
      Author:
    </label>
    <input
      type="text"
      id="author"
      value={author}
      onChange={(e) => setAuthor(e.target.value)}
      minLength={3}
      className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>

  <div>
    <label htmlFor="image" className="block text-sm font-medium mb-1 text-gray-800">
      Image:
    </label>
    <input
      type="text"
      id="image"
      value={image}
      onChange={(e) => setImage(e.target.value)}
      className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <button
    type="submit"
    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
  >
    Publish
  </button>
</form>


{showModal && (
  <div className="fixed top-0 z-50 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-75">
    <div className="bg-white p-4 rounded">
      <h2 className="text-lg font-bold mb-4">Enter Description</h2>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full  h-96 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
        autoFocus
        required
        cols={180}

      ></textarea>
      <div className="flex justify-end mt-4">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={handleCloseModal}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


</div>
</Layout>

    </>

  );
};

export default Addnews;
