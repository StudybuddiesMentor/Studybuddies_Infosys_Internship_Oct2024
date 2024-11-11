import React from 'react';
import './Features.css';
import flashcard from '/src/assets/flashcard.png';
import flashcard3 from '/src/assets/flashcard3.png';
import time from '/src/assets/time.jpeg';

const Features = () => {
  return (
    <div className="features-section p-8 md:p-16 lg:px-28 font-sans text-gray-700 bg-gradient-to-b from-indigo-100 to-orange-50 selection:bg-white selection:text-black">
      
      <div className="flex justify-center w-full">
        <h1 className="features-title font-bold text-4xl md:text-5xl text-center mb-10 text-black">Explore Your Innovation</h1>
      </div>

      <section className="features-section bg">
        <div className="text-content">
          <h2>Create Flashcards</h2>
          <p>
            Creating your own set of flashcards is easy with our free flashcard maker. Simply enter a term and its definition, and organize your flashcards into custom categories to streamline your study sessions. Whether you're preparing for a test or learning something new, our flashcard maker helps you keep everything organized. Once your set is complete, you can study at your own pace and even share your flashcards with friends for collaborative learning.
          </p>
        </div>
        <div className="image-content">
          <img src={flashcard} alt="Flashcard Feature" />
        </div>
      </section>

      <section className="features-section reverse bg">
        <div className="text-content">
          <h2>Find Flashcards</h2>
          <p>
            Finding the perfect set of flashcards is quick and easy with our search feature. Whether you're studying for a specific subject, exam, or topic, simply enter a keyword, and browse through a variety of flashcard sets created by others. Filter results by relevance, popularity, or recent additions to discover the most helpful flashcards for your needs. Once you find the right set, you can start studying immediately or even customize it to suit your preferences.
          </p>
        </div>
        <div className="image-content">
          <img src={flashcard3} alt="Versatile Integrations" />
        </div>
      </section>

      <section className="features-section bg">
        <div className="text-content">
          <h2>A Smarter Way to Study</h2>
          <p>
            Flashcards are a highly effective tool for quick and focused learning. By breaking down complex topics into bite-sized pieces, flashcards make it easier to review and memorize key information. This method helps you retain knowledge faster and more efficiently, cutting down on study time while boosting recall. Whether you're preparing for exams or mastering new concepts, flashcards streamline your study sessions and make learning more manageable.
          </p>
        </div>
        <div className="image-content">
          <img src={time} alt="Flashcard Feature" />
        </div>
      </section>

      <div className="features-content flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-10 bg-gradient-to-l from-yellow-100 shadow-lg rounded-lg p-8 md:p-16 mt-5 hover:shadow-xl hover:border-yellow-100 hover:bg-gradient-to-tr">
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

      <div className="flex justify-center w-full pt-12">
        <h1 className="future-title font-bold text-4xl md:text-5xl text-center text-black">Unlock the Future of</h1>
      </div>

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
