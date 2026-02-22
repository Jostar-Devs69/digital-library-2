
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow pt-16">
                <div className="bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="max-w-3xl mx-auto">
                            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-8">
                                About Asianista Digital Library
                            </h1>
                            <div className="prose prose-lg text-gray-600 mx-auto">
                                <p>
                                    Welcome to the Asianista Digital Library, your gateway to a universe of knowledge. Our mission is to democratize access to information by providing free, unlimited access to a vast collection of books from around the world. We believe that everyone, regardless of their location or background, deserves the opportunity to explore, learn, and grow.
                                </p>
                                <p>
                                    Founded on the principles of open access and lifelong learning, our library offers thousands of titles across a multitude of languages and genres. From classic literature and groundbreaking scientific research to children's stories and historical archives, our collection is curated to cater to curious minds of all ages.
                                </p>
                                <p>
                                    We leverage cutting-edge technology, including AI-powered search and recommendation engines, to help you discover books tailored to your interests. Our platform is designed to be user-friendly, accessible, and responsive, ensuring a seamless reading experience on any device.
                                </p>
                                <p>
                                    Thank you for being a part of our community. Happy reading!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AboutPage;
