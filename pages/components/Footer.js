
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
   
    return (
      <footer className="bg-gradient-to-b from-blue-500 to-indigo-500 text-white">
        <div id="footer-content" className="relative pt-8 xl:pt-16 pb-6 xl:pb-12">
          <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2 overflow-hidden">
            <div className="flex flex-wrap flex-row lg:justify-between -mx-3">
              <div className="flex-shrink max-w-full w-full lg:w-2/5 px-3 lg:pr-16">
                <div className="flex items-center mb-2">
                  <span className="text-3xl leading-normal mb-2 font-bold text-gray-100 mt-2">Newzy Newzy</span>
                </div>
                <p>Stay informed with the latest news and updates.</p>
  
                <div className="footer-icons text-3xl space-x-3 mt-6 mb-6 Lg:mb-0">
        <a href="about.html" >
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
        <a href="#" >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="#" >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="#" >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
      </div>
              </div>
              <div className="flex-shrink max-w-full w-full lg:w-3/5 px-3">
                <div className="flex flex-wrap flex-row">
                  <div className="flex-shrink max-w-full w-1/2 md:w-1/4 mb-6 lg:mb-0">
                    <h4 className="text-base leading-normal mb-3 uppercase text-gray-100">Sections</h4>
                    <ul>
                      <li className="py-1 hover:text-blue-200">
                        <a href="#">World</a>
                      </li>
                      <li className="py-1 hover:text-blue-200">
                        <a href="#">Politics</a>
                      </li>
                      <li className="py-1 hover:text-blue-200">
                        <a href="#">Business</a>
                      </li>
                      <li className="py-1 hover:text-blue-200">
                        <a href="#">Technology</a>
                      </li>
                      <li className="py-1 hover:text-blue-200">
                        <a href="#">Science</a>
                      </li>
                    </ul>
                  </div>
                  <div className="flex-shrink max-w-full w-1/2 md:w-1/4 mb-6 lg:mb-0">
                    <h4 className="text-base leading-normal mb-3 uppercase text-gray-100">Features</h4>
                    <ul>
                      <li className="py-1 hover:text-blue-200">
                        <a href="#">Opinions</a>
                      </li>
                      <li className="py-1 hover:text-blue-200">
                        <a href="#">Analysis</a>
                      </li>
                      <li className="py-1 hover:text-blue-200">
                        <a href="#">Interviews</a>
                      </li>
                      <li className="py-1 hover:text-blue-200">
                        <a href="#">Reviews</a>
                      </li>
                      <li className="py-1 hover:text-blue-200">
                        <a href="#">Trending</a>
                      </li>
                    </ul>
                  </div>
                  <div className="flex-shrink max-w-full w-1/2 md:w-1/4 mb-6 lg:mb-0">
                    <h4 className="text-base leading-normal mb-3 uppercase text-gray-100">Resources</h4>
                    <ul>
                      <li className="py-1 hover:text-blue-200">
                        <a href="#">Archives</a>
                      </li>
                      <li className="py-1 hover:text-blue-200">
                        <a href="#">Events</a>
                      </li>
                      <li className="py-1 hover:text-blue-200">
                        <a href="#">Newsletters</a>
                      </li>
                      <li className="py-1 hover:text-blue-200">
                        <a href="#">Podcasts</a>
                      </li>
                      <li className="py-1 hover:text-blue-200">
                        <a href="#">Videos</a>
                      </li>
                    </ul>
                  </div>
                  <div className="flex-shrink max-w-full w-1/2 md:w-1/4 mb-6 lg:mb-0">
                    <h4 className="text-base leading-normal mb-3 uppercase text-gray-100">Legal</h4>
                    <ul>
                      <li className="py-1 hover:text-blue-200">
                        <a href="#">Terms of Service</a>
                      </li>
                      <li className="py-1 hover:text-blue-200">
                        <a href="#">Privacy Policy</a>
                      </li>
                      <li className="py-1 hover:text-blue-200">
                        <a href="#">Cookie Policy</a>
                      </li>
                      <li className="py-1 hover:text-blue-200">
                        <a href="#">Disclaimer</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="footer-dark">
          <div className="py-4 border-t border-gray-200 border-opacity-10">
            <div className="row">
              <div className="col-12 px-2 md:px-0 col-md text-center">
                <p className="d-block my-3">
                  &copy; 2023 Newzy Newzy. All rights reserved. Developed and Designed by Rajkumar Oad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  