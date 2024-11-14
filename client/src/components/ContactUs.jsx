import React, { useState } from 'react';
import Header from './Header';

// ContactForm component to handle form submission and file attachments
const ContactForm = () => {
    // State to track form submission and file attachment status
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [files, setFiles] = useState(null)
    // Function to handle form submission
    const onSubmit = async (event) => {
        event.preventDefault()
        setIsSubmitting(true)

        // Simulate a delay (e.g., network request)
        await new Promise(resolve => setTimeout(resolve, 2000))

        alert("Request submitted. We'll get back to you as soon as possible.")

        setIsSubmitting(false)
        setFiles(null)
        event.target.reset() // Reset form inputs
    }
     // Handle file drop event
    const handleFileDrop = (e) => {
        e.preventDefault() // Prevent default browser behavior
        setFiles(e.dataTransfer.files) // Set the files from the drop event
    }
    // Handle file selection via input
    const handleFileInput = (e) => {
        if (e.target.files) {
            setFiles(e.target.files) // Set the selected files
        }
    }

    return (
        <>
            {/* Include the Header component */}
            <Header />
            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', border: '2px' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: '600', marginBottom: '1.5rem' }}>Submit a request</h1>
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
                                borderRadius: '0.25rem'
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
                                borderRadius: '0.25rem'
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
                                minHeight: '150px'
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
                                cursor: 'pointer'
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
                            cursor: isSubmitting ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </>
    )
}

export default ContactForm;
