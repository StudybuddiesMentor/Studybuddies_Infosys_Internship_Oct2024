import React from "react";
import "./Privacy.css";
import Header from './Header';

const Privacy = () => {
    return (
        <>
            <Header />
            <div className="privacy-policy">
                <h1><strong>Study Buddies Privacy Policy</strong></h1>
                <p>Last Updated: Nov 6, 2024</p><br></br>
                <p>
                    Welcome to StudeyBuddies platform. Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information when you use our flashcard-building platform. By using our website, you agree to this policy: <br></br>
                    <br></br>
                    <li>Personal Data We Collect</li>
                    <li>How We Use Your Information</li>
                    <li>Sharing Your Information</li>
                    <li>Data Security</li>
                    <li>Your Choices</li>
                    <li>Changes to This Policy</li>
                    <li>How to Contact Us</li>
                </p><br></br>

                {/* Personal Data Usage */}
                <div className="privacy-section">
                    <h2><strong>Personal Data We Collect</strong></h2>
                    <p>
                        We collect information about you from different sources and in various ways when you use our services, including information you provide directly, information collected automatically, information from third-party data sources, and data we infer or generate from other data.
                        Information you provide directly. We collect personal data you provide to us. For example:<br></br>

                        <li><b>Name and Contact Information:</b> When you sign up for our services, we collect your name, username, email address, birthdate, Mobile No. etc.  </li>

                        <li><b>Demographic data: </b>In some cases, such as when you register or participate in surveys, we request that you provide age, gender, and similar demographic details.</li>

                        <li><b>Other profile information: </b>We collect information about your interests, biographic information, education level, intended use of our service, links to social media accounts, and classes for your profile.</li>

                        <li><b>Content and files: </b>We collect the flashcards, decks, photos or other files you upload to our services; and if you send us email messages or other communications, we collect and retain those communications. Finally, if you leave reviews or comments on our service or notes and flashcards, we collect the content of those reviews and comments.</li>

                    </p>
                </div>

                {/* Data Usage Section */}
                <div className="privacy-section">
                    <h2><strong>How We Use Your Information</strong></h2>
                    <p>
                        We collect information about you when you use the Service for a variety of reasons in order to support Quizlet and to enable our team to continue to create engaging experiences for our users. For Examples:<br></br><br></br>

                        <li><b>Providing, maintaining and improving the Service: </b>Account information we collect from you allows us to help you log in, host your content, and use the various study tools we have. It also allows us to learn about how you and others use StudyBuddies to help create new activities and services.</li>

                        <li><b>Improving, personalizing and facilitating your use of the Service: </b>
                            When you sign up and use a StudyBuddies account, we may associate certain information with your new account, such as information about other StudyBuddies accounts you had or currently have, and your prior usage of the Service. For example, we use information collected from cookies and other technologies, like pixel tags, to save your language preferences, so we will be able to have our services appear in the language you prefer. We do this in order to ensure that content from the Service is presented in the most effective manner for you.
                        </li>

                        <li><b>Measuring, tracking and analyzing trends and usage in connection with your use or the performance of the Service: </b>
                            In order to develop and enhance our products and deliver a consistent, secure and continuous experience, we need to gather certain information to analyze usage and performance of the Service. We also use mobile analytics software to pursue our legitimate interests in operating and improving StudyBuddies by allowing us to better understand the functionality of our mobile software on your device. This software may record information such as how often you use the application, the events and activities that occur within the application, aggregated usage, performance data, and where the application was downloaded from.
                        </li>

                    </p>
                </div>

                {/* Data Sharing Section */}
                <div className="privacy-section">
                    <h2><strong>Sharing Your Information</strong></h2>
                    <p>
                        We value your privacy and do not share your data with third-party marketers. However, we may share data with trusted partners for analytics and development, always under strict confidentiality agreements. Expect:<br></br><br></br>

                        <li><b>For Legal Requirements: </b>If required by law, we may disclose your information to comply with legal processes.</li>

                        <li><b>With Service Providers: </b>To improve and support our service (e.g., hosting providers) but only under strict confidentiality agreements.</li><br></br>

                    </p>
                </div>

                {/* Data Security Section */}
                <div className="privacy-section">
                    <h2><strong>Data Security</strong></h2>
                    <p>
                        We use industry-standard security measures to protect your data. Your information is securely stored and encrypted, ensuring the highest level of security on our platform. We take reasonable steps to protect your information from unauthorized access and ensure data safety. However, please be aware that no internet service is entirely secure.

                    </p>
                </div>

                {/* Your Choices Section */}
                <div className="privacy-section">
                    <h2><strong> Your Choices </strong></h2>

                    <li><b>Manage Your Data: </b>You can access, edit, or delete your account information and content anytime in your account settings.</li>

                    <li><b>Cookies: </b> We may use cookies for enhancing site performance. You can control cookies through your browser settings.</li><br></br>
                </div>

                {/* Privacy Changes Section */}
                <div className="privacy-section">
                    <h2><strong> Changes to This Policy </strong></h2>

                    <p>We may update this Privacy Policy from time to time. When changes are made, we’ll notify you via email or post an update on the website.
                    </p><br></br>
                </div>

                {/* Contact Us Section */}
                <div className="privacy-section">
                    <h2><strong> How to Contact Us </strong></h2>

                    <p>If you have a privacy concern, complaint, or a question for StudyBuddies, please contact us at infosysstudybuddies@gmail.com.<br></br><br></br>

                        We also have the following contact details:<br></br>
                        StudyBuddies, Inc.<br></br>
                        Plot No. 44/97 A, 3rd cross,<br></br>
                        Electronic City, Hosur Road,<br></br>
                        Bengaluru - 560 100<br></br>
                        Phone +91 (80285) 20261 / +91 (80398) 72222 <br></br>
                        Fax +91 (80285) 20362
                    </p><br></br>
                </div>
            </div>
        </>
    );
};

export default Privacy;
