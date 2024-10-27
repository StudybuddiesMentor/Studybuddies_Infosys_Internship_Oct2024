import React from 'react';
// import './index.css';

const Features = () => {
  return (
    <div className="features-section p-8 md:p-16 lg:px-28 font-sans text-gray-700 bg-gradient-to-b from-indigo-100 to-orange-50 selection:bg-white selection:text-black">
      <h1 className="features-title font-bold text-4xl md:text-5xl text-center mb-10 text-black">Explore Your Innovation</h1>

      {/* Section: Explore Your Innovation */}
      <div className="features-content flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-10 bg-gradient-to-l from-yellow-100 shadow-lg rounded-lg p-8 md:p-16 mt-5 hover:shadow-xl hover:border-yellow-100 hover:bg-gradient-to-tr">
        {/* Left Column */}
        <div className="left-column space-y-6">
          <div className="feature-item flex items-start">
            <img src="https://cdn-icons-png.flaticon.com/512/9489/9489151.png" alt="Innovation Icon" className="icon w-12 h-12 mr-5" />
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet natus perferendis expedita explicabo aperiam debitis tempora voluptatum nostrum nesciunt iure? Hic magni debitis cum ullam sed reprehenderit non? Numquam, ullam.</p>
          </div>
          <div className="feature-item flex items-start">
            <img src="https://www.onlygfx.com/wp-content/uploads/2021/12/power-fist-7404.svg" alt="Power Icon" className="icon w-12 h-12 mr-5 ml-5" />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia dolorum suscipit ipsum provident necessitatibus corporis laudantium commodi officia. Quisquam inventore nulla et doloribus, sit tenetur deleniti dolorum? Aliquam, eligendi sequi!</p>
          </div>
          <div className="feature-item flex items-start">
            <img src="https://cdn-icons-png.flaticon.com/512/4696/4696465.png" alt="Knowledge Icon" className="icon w-12 h-12 mr-5" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, eligendi natus! Beatae aspernatur laboriosam tempora nam corporis. Cumque soluta esse natus, maxime assumenda, ad tempore corrupti minus, quia sit provident!</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column space-y-6">
          <div className="feature-item flex items-start">
            <img src="https://cdn-icons-png.flaticon.com/512/2112/2112352.png" alt="Growth Icon" className="icon w-12 h-12 mr-5" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestiae tempora minima deserunt ad quasi porro at tempore iusto mollitia ipsam eligendi dolor, obcaecati accusamus enim laborum et laboriosam placeat?</p>
          </div>
          <div className="feature-item flex items-start">
            <img src="https://www.freeiconspng.com/thumbs/growth-icon/growth-icon-15.png" alt="Achievement Icon" className="icon w-12 h-12 mr-5" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab expedita doloremque, culpa unde eos est. Aliquam, veritatis! Odit, iure qui labore, nisi at nemo quam optio error nobis ut officia.</p>
          </div>
          <div className="feature-item flex items-start">
            <img src="https://www.pikpng.com/pngl/b/254-2541230_book-clipart-black-and-white-png-download.png" alt="Book Icon" className="icon w-12 h-12 mr-5" />
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur odio distinctio facere earum assumenda animi magni velit dignissimos obcaecati, quasi, et aperiam maiores in quis? Laborum alias quidem deleniti animi.</p>
          </div>
        </div>
      </div>

      {/* Section: Unlock the Future Of */}
      <h1 className="future-title pt-12 pb-6 font-bold text-4xl md:text-5xl text-center text-black">Unlock the Future of</h1>
      <div className="future-features flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 mt-8">
        <div className="future-feature flex-1 px-8 py-10 shadow-lg bg-gradient-to-t from-green-100 to-green-50 rounded-xl text-center hover:shadow-xl hover:bg-gradient-to-br">
          <img src="https://cdn-icons-png.flaticon.com/512/75/75818.png" alt="Collaborative Learning Icon" className="h-20 mx-auto" />
          <h2 className="font-semibold text-xl mt-5">Collaborative Learning</h2>
          <p className="mt-3">Discover the power of Shared FLASHCARDS and <br /><strong>Study Together</strong></p>
        </div>
        <div className="future-feature flex-1 px-8 py-10 shadow-lg bg-gradient-to-t from-blue-100 to-blue-50 rounded-xl text-center hover:shadow-xl hover:bg-gradient-to-br">
          <img src="https://pngimg.com/d/folder_PNG100452.png" alt="Connect With Study Icon" className="h-20 mx-auto" />
          <h2 className="font-semibold text-xl mt-5">Connect With Study</h2>
          <p className="mt-3">Unlock the benefits of Collaborative Studying <br /><strong>Elevate your Learning Experiences</strong></p>
        </div>
        <div className="future-feature flex-1 px-8 py-10 shadow-lg bg-gradient-to-t from-pink-100 to-pink-50 rounded-xl text-center hover:shadow-xl hover:bg-gradient-to-br">
          <img src="https://cdn-icons-png.freepik.com/512/11112/11112591.png" alt="Thrive With Study Icon" className="h-20 mx-auto" />
          <h2 className="font-semibold text-xl mt-5">Thrive With Study</h2>
          <p className="mt-3">Unlock the Secrets to Effortless Studying <br /><strong>And achieve your academic Goals</strong></p>
        </div>
      </div>
    </div>
  );
};

export default Features;
