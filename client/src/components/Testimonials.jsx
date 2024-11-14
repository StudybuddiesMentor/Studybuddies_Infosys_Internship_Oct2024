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
        feedback: 'As a teacher, this platform has been a great resource for my students and has made online learning engaging and effective. Highly recommend it for anyone in education!',
        rating: 4,
    },
    {
        image: Testimonials_image_2,
        name: 'Divyashakti Pal',
        title: 'Student',
        feedback: 'I’m studying for a certification, and this tools has been incredibly useful. I love that I can organize topics into different decks and use the random shuffle for practice.',
        rating: 5,
    },
    {
        image: Testimonials_image_3,
        name: 'Jatin',
        title: 'Student',
        feedback: 'Excellent platform! The lessons are easy to understand, and the community is very supportive',
        rating: 5,
    },
    {
        image: Testimonials_image_4,
        name: 'Aryan Kanojia',
        title: 'Student',
        feedback: 'I’ve been using this flashcard tool to prepare for the SAT, and it’s really helped with vocab and math formulas. It’s easy to create decks by subject, and the design is really nice and distraction-free.',
        rating: 4,
    },
    {
        image: Testimonials_image_5,
        name: 'Nitesh Rajput',
        title: 'Student',
        feedback: 'Learning a new language has its challenges, but using flashcards has made vocabulary practice much easier. I love how simple it is to create decks and review them ',
        rating: 5,
    },
    {
        image: Testimonials_image_6,
        name: 'Balaji',
        title: 'Student',
        feedback: 'This website saved me! Medical school requires memorizing so much information, and the flashcard maker is an amazing tool for breaking down complex topics.',
        rating: 4,
    },
];

const Testimonial = ({ image, name, title, feedback, rating }) => {
    const renderStars = (rating) => {
        return Array(rating)
            .fill()
            .map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">★</span>
            ));
    };

    return (
        <div className="bg-green-100 p-6 min-w-80 rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center">
            <img src={image} alt={name} className="w-20 h-20 rounded-full mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 text-center">{name}</h3>
            <p className="text-sm text-gray-500 text-center">{title}</p>
            <div className="flex justify-center mt-2">
                {renderStars(rating)}
            </div>
            <p className="text-gray-600 text-center mt-4">{feedback}</p>
            <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
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

        if (direction === 'left') {
            current.scrollLeft -= scrollAmount;
        } else {
            current.scrollLeft += scrollAmount;
        }
    };

    return (
        <section className="bg-green-50 py-12 relative">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">What Our Learners Say</h2>
                <div className="flex items-center">
                    <button
                        onClick={() => scroll('left')}
                        className="p-2 bg-gray-900 text-white rounded-full mr-2 hover:bg-blue-600 transition"
                    >
                        ◀
                    </button>
                    <div
                        ref={scrollRef}
                        className="flex gap-8 w-full overflow-x-scroll scrollbar-hide"
                    >
                        {testimonialsData.map((testimonial, index) => (
                            <Testimonial
                                key={index}
                                image={testimonial.image}
                                name={testimonial.name}
                                title={testimonial.title}
                                feedback={testimonial.feedback}
                                rating={testimonial.rating}
                            />
                        ))}
                    </div>
                    <button
                        onClick={() => scroll('right')}
                        className="p-2 bg-gray-900 text-white rounded-full ml-2 hover:bg-blue-600 transition"
                    >
                        ▶
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
