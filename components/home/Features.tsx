'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faPaperclip, faLock, faDeleteLeft, faImage, faFileWord} from '@fortawesome/free-solid-svg-icons'; // Example icons

const featuresData = [
    {
        id: 1,
        name: 'Chat with PDF',
        description: 'Interact with your PDFs using our advanced AI technology.',
        link: '/chat',
        icon: <FontAwesomeIcon icon={faRocket} />,
    },
    {
        id: 2,
        name: 'PDF Merger',
        description: 'Combine multiple PDF files into a single document effortlessly.',
        link: '/tools/pdf-merger/',
        icon: <FontAwesomeIcon icon={faPaperclip} />,
    },
    {
        id: 3,
        name: 'PDF Encryptor',
        description: 'Encrypt your PDF documents with high level security.',
        link: '/tools/pdf-encryptor/',
        icon: <FontAwesomeIcon icon={faLock} />,
    },
    {
        id: 4,
        name: 'PDF Page Deleter',
        description: 'Delete PDF pages without any quality issues',
        link: '/tools/pdf-page-deleter/',
        icon: <FontAwesomeIcon icon={faDeleteLeft} />,
    },
    {
        id: 5,
        name: 'PDF Page Extractor',
        description: 'Encrypt your PDF documents with high level security.',
        link: '/tools/pdf-page-extractor/',
        icon: <FontAwesomeIcon icon={faFileWord} />,
    },
    {
        id: 6,
        name: 'Image To PDF',
        description: 'Convert high-quality images into PDF.',
        link: '/tools/image-to-pdf/',
        icon: <FontAwesomeIcon icon={faImage} />,
    },
]; 
const Features = () => {
    return (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-6 text-center">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-gray-900 mb-12"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    Explore Our Features
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuresData.map(feature => (
                        <motion.div
                            key={feature.id}
                            className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:-translate-y-3 hover:shadow-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                        >
                            <a
                                href={feature.link}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="mb-4 p-4 rounded-full bg-blue-100 text-blue-500 shadow-md">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {feature.name}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;