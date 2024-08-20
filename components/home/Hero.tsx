'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons'; // Example icon

const Hero = () => {
    return (
        <section className="relative bg-gradient-to-r from-blue-200 to-teal-100 overflow-hidden">
            <div className="container mx-auto px-6 py-16 text-center relative z-10">
                <motion.h1
                    className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    Transform Your Documents with <br /> AI-Powered PDF Editing
                </motion.h1>
                <motion.p
                    className="text-lg md:text-2xl text-gray-700 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                >
                    Engage with your papers, textbooks, and contracts in a revolutionary way. Experience effortless editing with our cutting-edge technology.
                </motion.p>
                <Link href="/dashboard">
                    <motion.button
                        className="bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 px-6 text-lg font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get Started
                    </motion.button>
                </Link>
                <motion.div
                    className="absolute inset-0 overflow-hidden pointer-events-none"
                    aria-hidden="true"
                >
                    <svg
                        className="absolute bottom-0 left-0 w-full h-auto text-blue-200"
                        viewBox="0 0 1280 120"
                        fill="currentColor"
                    >
                        <path
                            d="M0,48C0,21.6,19.2,0,43.2,0H1232c24,0,43.2,21.6,43.2,48V120H0V48Z"
                            opacity=".5"
                        />
                    </svg>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;