import React from 'react';

function Features() {
  const featuresData = [
    {
      title: 'Connect and Collaborate',
      description:
        'Connect with fellow learners to create study groups, share notes, and discuss challenging concepts. Collaboration is key to academic success!',
      icon: (
        <svg
          className="mx-auto h-12 w-12 fill-current text-blue-600 transition-transform duration-300 ease-in-out hover:scale-110"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C10.89 2 10 2.89 10 4s0.89 2 2 2 2-0.89 2-2-0.89-2-2-2zm-3 6.5C7.67 8.5 7 9.17 7 10v3H5.5c-0.83 0-1.5 0.67-1.5 1.5S4.67 16 5.5 16H10v-3H8v-3c0-0.83-0.67-1.5-1.5-1.5zm6 0c-0.83 0-1.5 0.67-1.5 1.5v3H10v3h4.5c0.83 0 1.5-0.67 1.5-1.5S15.33 13 14.5 13H13v-3c0-0.83-0.67-1.5-1.5-1.5zm7 4H18v3c0 0.83-0.67 1.5-1.5 1.5S15 15.83 15 15v-3H13v3c0 1.65 1.35 3 3 3s3-1.35 3-3v-3h1.5c0.83 0 1.5-0.67 1.5-1.5S21.33 12 20.5 12z" />
        </svg>
      ),
    },
    {
      title: 'Organize Your Learning',
      description:
        'Say goodbye to scattered notes and messy folders. Study Buddy helps you organize your study materials with easy-to-use tools for creating flashcards and study decks.',
      icon: (
        <svg
          className="mx-auto h-12 w-12 fill-current text-yellow-500 transition-transform duration-300 ease-in-out hover:scale-110"
          viewBox="0 0 24 24"
        >
          <path d="M3 5v14h18V5H3zm16 2v10H5V7h14zM7 10h10v2H7v-2z" />
        </svg>
      ),
    },
    {
      title: 'Flashcards for Effective Memorization',
      description:
        'Create custom flashcards to memorize key terms, definitions, and concepts. Study Buddy makes it fun and easy to reinforce your learning.',
      icon: (
        <svg
          className="mx-auto h-12 w-12 fill-current text-green-600 transition-transform duration-300 ease-in-out hover:scale-110"
          viewBox="0 0 24 24"
        >
          <path d="M21 3H3c-1.1 0-1.99 0.9-1.99 2L1 19c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2V5c0-1.1-0.9-2-2-2zM3 5h18v4H3V5zm0 12V11h18v6H3z" />
        </svg>
      ),
    },
    {
      title: 'Discover Helpful Resources',
      description:
        "Explore a library of study materials created by other users. Find helpful notes, flashcards, and study guides to supplement your own learning.",
      icon: (
        <svg
          className="mx-auto h-12 w-12 fill-current text-purple-600 transition-transform duration-300 ease-in-out hover:scale-110"
          viewBox="0 0 24 24"
        >
          <path d="M18 2H6c-1.1 0-2 0.9-2 2v16c0 1.1 0.9 2 2 2h12c1.1 0 2-0.9 2-2V4c0-1.1-0.9-2-2-2zm0 18H6V4h12v16zm-5-5h-2v-2h2v2zm0-4h-2V7h2v4z" />
        </svg>
      ),
    },
    {
      title: 'Study Anytime, Anywhere',
      description:
        "Access your study materials and connect with your study group from any device with an internet connection. Learning is no longer confined to a specific time or place.",
      icon: (
        <svg
          className="mx-auto h-12 w-12 fill-current text-indigo-600 transition-transform duration-300 ease-in-out hover:scale-110"
          viewBox="0 0 24 24"
        >
          <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9v-2h2v2zm4-4H7v-2h8v2zm0-4H7V7h8v2z" />
        </svg>
      ),
    },
    {
      title: 'Achieve Your Goals Together',
      description:
        "Join a supportive community of learners and achieve your academic goals together. Study Buddy provides the tools and resources to help you succeed.",
      icon: (
        <svg
          className="mx-auto h-12 w-12 fill-current text-red-600 transition-transform duration-300 ease-in-out hover:scale-110"
          viewBox="0 0 24 24"
        >
          <path d="M12 1.5C6.48 1.5 2 5.98 2 11.5c0 2.5 1 4.71 2.68 6.29L12 22l7.32-4.21C21 16.21 22 14 22 11.5c0-5.52-4.48-10-10-10zm0 18l-6.32-3.6C4.34 14.45 3.5 13.06 3.5 11.5 3.5 7.91 6.41 5 10 5s6.5 2.91 6.5 6.5c0 1.56-0.84 2.95-2.18 3.9L12 19.5z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-green-100 to-green-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl">
          Effortless flashcards for fun learning.</h2>
          <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-8">
          Discover smarter ways to study, stay organized, and achieve academic success with ease          </p>
        </div>

        <div className="grid grid-cols-1 mt-10 text-center sm:mt-16 sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-3 md:gap-0 xl:mt-24">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className={`md:p-8 lg:p-14 relative cursor-pointer border border-gray-200 rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:border-transparent hover:shadow-xl ${
                index > 0 && index < 3 ? 'md:border-l' : ''
              } ${index > 2 ? 'md:border-t' : ''} group`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 opacity-0 group-hover:opacity-25 transition-opacity duration-300 ease-in-out"></div>
              <div className="relative z-10">
                {feature.icon}
                <h3 className="mt-12 text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="mt-5 text-base text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;