import React, { useRef } from 'react';
import Testimonials_image_1 from '../assets/Testimonials_image_1.jpg';
import Testimonials_image_2 from '../assets/Testimonials_image_2.jpg';
import Testimonials_image_3 from '../assets/Testimonials_image_3.jpg';
import Testimonials_image_4 from '../assets/Testimonials_image_4.jpg';
import Testimonials_image_5 from '../assets/Testimonials_image_5.jpg';
import Testimonials_image_6 from '../assets/Testimonials_image_6.jpg';

const testimonialsData = [
    {
        image: Testimonials_image_1,
        name: 'Puran Kalapala',
        title: 'Mentor',
        feedback: 'As a teacher, this platform has been a great resource for my students and has made online learning engaging and effective.',
        rating: 4,
    },
    {
        image: Testimonials_image_2,
        name: 'Divyashakti Pal',
        title: 'Student',
        feedback: 'This website is very useful. I love that i can organize topics into different decks and use the random shuffle for practice.',
        rating: 5,
    },
    {
        image: Testimonials_image_3,
        name: 'Jatin Sharma',
        title: 'Student',
        feedback: "StudyBuddy is an outstanding platform! The lessons are incredibly easy to grasp, and the community offers fantastic support.",
        rating: 5,
    },
    {
        image: Testimonials_image_4,
        name: 'Aryan Kanojia',
        title: 'Student',
        feedback: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae quo ullam dolore. Nostrum, earum architecto.',
        rating: 4,
    },
    {
        image: Testimonials_image_5,
        name: 'Nitesh Rajput',
        title: 'Student',
        feedback: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae quo ullam dolore. Nostrum, earum architecto.',
        rating: 5,
    },
    {
        image: Testimonials_image_6,
        name: 'Balaji',
        title: 'Student',
        feedback: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae quo ullam dolore. Nostrum, earum architecto.',
        rating: 4,
    },
];

const Testimonial = ({ image, name, title, feedback, rating }) => {
    const renderStars = (rating) => (
        Array.from({ length: rating }, (_, i) => (
            <span key={i} className="text-yellow-400 text-xl">★</span>
        ))
    );

    return (
        <div className="bg-white p-6 min-w-[320px] rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 flex flex-col items-center">
            <img src={image} alt={name} className="w-24 h-24 rounded-full mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 text-center">{name}</h3>
            <p className="text-sm text-gray-500 text-center">{title}</p>
            <div className="flex justify-center mt-2">
                {renderStars(rating)}
            </div>
            <p className="text-gray-600 text-center mt-4">{feedback}</p>
            <button className="mt-6 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors">
                Read More
            </button>
        </div>
    );
};

const Testimonials = () => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollRef;
        const scrollAmount = 300;

        current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    };

    return (
        <section className="bg-green-50 py-12">
            <div className="max-w-6xl mx-auto px-4 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">What Our Learners Say</h2>
                <div className="relative flex items-center">
                    <button
                        onClick={() => scroll('left')}
                        className="p-2 bg-gray-700 text-white rounded-full hover:bg-indigo-500 transition-colors"
                    >
                        ◀
                    </button>
                    <div
                        ref={scrollRef}
                        className="flex gap-6 w-full overflow-x-scroll px-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {testimonialsData.map((testimonial, index) => (
                            <Testimonial key={index} {...testimonial} />
                        ))}
                    </div>
                    <button
                        onClick={() => scroll('right')}
                        className="p-2 bg-gray-700 text-white rounded-full hover:bg-indigo-500 transition-colors"
                    >
                        ▶
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;     
