import React from 'react';

const TrendingSection = () => {
  return ( <>
    <div className="container mx-auto">
      <div className="flex flex-wrap -mx-4">
        <div className="col-lg-6 col-md-6">
          <div className="bg-white rounded-lg  mb-8">
            <div className="relative p-4">
              <div className="relative">
                <img
                  src="http://127.0.0.1:5500/assets/img/news/weeklyNews2.jpg"
                  alt=""
                  className="rounded-t-lg"
                />
                <div className="absolute bottom-8 z-10 left-0 mb-2 ml-2">
                  <span className="bg-blue-500 text-white text-sm py-1 px-2 rounded">
                    Night party
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-20 left-0 pl-4 py-16 rounded-lg bg-white m-24 mb-0 ml-0 px-12">
                <h4 className="text-lg font-semibold">
                  <a href="#" className="text-gray-800 hover:underline">
                    Welcome To The Best Model Winner Contest
                  </a>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div className="flex-shrink max-w-full w-full sm:w-1/3 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
  <div className="flex flex-row sm:block hover-img">
    <a href="https://www.brecorder.com/news/40248190/gold-listless-as-markets-assess-recent-us-data-and-fed-cues" target="_blank">
      <img className="max-w-full w-full mx-auto" src="https://i.brecorder.com/large/2023/06/1611463478ff605.jpg?r=114649" alt="alt title" />
    </a>
    <div className="py-0 sm:py-3 pl-3 sm:pl-0">
      <h3 className="text-lg font-bold leading-tight mb-2">
        <a href="https://www.brecorder.com/news/40248190/gold-listless-as-markets-assess-recent-us-data-and-fed-cues" target="_blank">
          Gold listless as markets assess recent US data and Fed cues
        </a>
      </h3>
      <p className="hidden md:block text-gray-600 leading-tight mb-1">Gold prices moved in a tight range on Friday as traders weighed recent US economic data and hawkish ...</p>
      <a className="text-gray-500" href="#"><span className="inline-block h-3 border-l-2 border-red-600 mr-2"></span>brecorder</a>
    </div>
  </div>
</div>

    </>
  );
};

export default TrendingSection;
