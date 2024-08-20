'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-500 to-teal-500 text-white py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute -top-20 -left-10 opacity-30"
          width="100%"
          height="100%"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            fillOpacity="0.1"
            d="M0,256L30,240C60,224,120,192,180,160C240,128,300,96,360,101.3C420,107,480,149,540,160C600,171,660,149,720,128C780,107,840,85,900,85C960,85,1020,107,1080,122.7C1140,139,1200,149,1260,165.3C1320,181,1380,203,1410,214.7L1440,226L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 flex flex-col items-center justify-center text-center relative z-10">
        <motion.h1
          className="text-4xl md:text-5xl font-bold leading-tight mb-4 md:mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Revolutionize Your Document Editing Experience
        </motion.h1>
        <p
          className="text-lg md:text-xl mb-8 md:mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          With EasyEdit PDF, you can streamline your document workflows with cutting-edge features and a seamless user experience.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link
            href="/signup"
            className="relative inline-flex items-center justify-center p-4 text-lg font-semibold text-blue-500 bg-white rounded-lg shadow-lg overflow-hidden group transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <span className="absolute inset-0 bg-blue-100 opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
            <span className="relative z-10">Get Started</span>
          </Link>
          <Link
            href="/features"
            className="relative inline-flex items-center justify-center p-4 text-lg font-semibold text-white bg-transparent border-2 border-white rounded-lg shadow-lg overflow-hidden group transition-transform transform hover:scale-105 hover:bg-white hover:text-blue-500"
          >
            <span className="absolute inset-0 bg-white opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
            <span className="relative z-10">Learn More</span>
          </Link>
        </div>
        <div className="absolute bottom-0 right-0 w-full h-full flex items-center justify-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Image
              src="/hero-image.png"
              alt="Hero Image"
              width={800}
              height={600}
              className="object-cover rounded-lg shadow-xl"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;