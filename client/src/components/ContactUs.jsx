import React, { useEffect, useState } from 'react';
import Header from './Header';
import Nav from './Nav';
import HomeFooter from './Homefooter';

// ContactForm component to handle form submission and file attachments
const ContactForm = () => {
    // State to track form submission, file attachment status, and notification
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [files, setFiles] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [notification, setNotification] = useState(null); // State for notification

    useEffect(() => {
        // Check if the token cookie is present
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true); // If token exists, user is logged in
        } else {
            setIsLoggedIn(false); // If no token, user is not logged in
        }
    }, []);

    // Function to handle form submission
    const onSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        // Simulate a delay (e.g., network request)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Set notification message
        setNotification('Request submitted. We\'ll get back to you as soon as possible.');

        setIsSubmitting(false);
        setFiles(null);
        event.target.reset(); // Reset form inputs

        // Remove the notification after 3 seconds
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    }

    // Handle file drop event
    const handleFileDrop = (e) => {
        e.preventDefault(); // Prevent default browser behavior
        setFiles(e.dataTransfer.files); // Set the files from the drop event
    }

    // Handle file selection via input
    const handleFileInput = (e) => {
        if (e.target.files) {
            setFiles(e.target.files); // Set the selected files
        }
    }

    return (
        <>
            {/* Include the Header component */}
            {isLoggedIn ? <Nav /> : <Header />}
            
            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', border: '2px' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                    Submit a request
                </h1>

                {/* Notification bar */}
                {notification && (
                    <div
                        style={{
                            position: 'fixed',
                            top: '1rem',
                            right: '1rem',
                            backgroundColor: '#f1fdf4', // Light green background
                            color: '#3ba55d', // Green text
                            borderRadius: '8px', // Rounded corners
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
                            padding: '0.8rem 1.2rem', // Padding for spacing
                            display: 'flex',
                            alignItems: 'center', // Align icon and text
                            gap: '0.5rem', // Space between icon and text
                            fontSize: '1rem',
                            fontWeight: '500',
                            zIndex: 1000,
                        }}
                    >
                        <div
                            style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: '#3ba55d', // Green circle
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white', // White checkmark
                                fontSize: '1rem',
                                fontWeight: 'bold',
                            }}
                        >
                            ✓
                        </div>
                        {notification}
                        <button
                            onClick={() => setNotification(null)}
                            style={{
                                marginLeft: 'auto', // Push close button to the end
                                background: 'none',
                                border: 'none',
                                color: '#3ba55d', // Green close button
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                            }}
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* Form element with submit handler */}
                <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Email input field */}
                    <div>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
                            Your email address <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            placeholder="Enter your email"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ccc',
                                borderRadius: '0.25rem',
                            }}
                        />
                    </div>

                    {/* Subject input field */}
                    <div>
                        <label htmlFor="subject" style={{ display: 'block', marginBottom: '0.5rem' }}>
                            Subject <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            id="subject"
                            required
                            placeholder="Enter the subject"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ccc',
                                borderRadius: '0.25rem',
                            }}
                        />
                    </div>

                    {/* Description textarea */}
                    <div>
                        <label htmlFor="description" style={{ display: 'block', marginBottom: '0.5rem' }}>
                            Description <span style={{ color: 'red' }}>*</span>
                        </label>
                        <textarea
                            id="description"
                            required
                            placeholder="Please enter the details of your request"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ccc',
                                borderRadius: '0.25rem',
                                minHeight: '150px',
                            }}
                        />
                        <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
                            Please enter the details of your request. A member of our support staff will respond as soon as possible.
                        </p>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Attachments</label>
                        <div
                            onDrop={handleFileDrop}
                            onDragOver={(e) => e.preventDefault()}
                            style={{
                                border: '2px dashed #ccc',
                                borderRadius: '0.5rem',
                                padding: '1rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                            }}
                        >
                            <input
                                type="file"
                                id="file"
                                multiple
                                onChange={handleFileInput}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="file" style={{ cursor: 'pointer', fontSize: '0.875rem' }}>
                                {files && files.length > 0 ? (
                                    <span>{files.length} file(s) selected</span>
                                ) : (
                                    <span>Add file or drop files here</span>
                                )}
                            </label>
                        </div>
                    </div>

                    {/* Submit button with conditional styling based on submission state */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            width: '8rem',
                            padding: '0.5rem',
                            backgroundColor: isSubmitting ? '#ccc' : '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.25rem',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>

            {/* Footer */}
            {isLoggedIn ? (
                <footer className="bg-gray-800 text-white py-6 mt-10">
                    <div className="container mx-auto text-center">
                        <p>&copy; 2024 Study Buddy. All Rights Reserved.</p>
                        <div className="mt-3 space-x-5">
                            {["Privacy Policy", "Terms of Service", "Contact Us"].map((item) => (
                                <a
                                    key={item}
                                    href={`/${item.toLowerCase().replaceAll(" ", "-")}`}
                                    className="hover:text-gray-400"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                </footer>
            ) : (
                <HomeFooter />
            )}
        </>
    );
}

export default ContactForm;
