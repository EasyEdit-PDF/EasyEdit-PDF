"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface LogoProps {
  isMobile?: boolean;
}

const Logo = ({ isMobile }: LogoProps) => {
  return (
    <Link href="/" aria-label="Home">
      <div className="flex items-center space-x-2">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
          className="flex justify-center items-center"
        >
          <Image
            src="/logo.png"
            alt="EasyEdit PDF Logo"
            width={30}
            height={34}
            className={`transition-transform duration-300 ease-in-out ${isMobile ? 'w-[21px] h-[25px]' : 'w-[30px] h-[34px]'} mt-1`}
            priority
          />
        </motion.div>
        {!isMobile && (
          <motion.h1 
            className="text-primary font-semibold text-2xl sm:text-3xl leading-tight transition-transform duration-300 ease-in-out"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            EasyEdit PDF
          </motion.h1>
        )}
      </div>
    </Link>
  );
};

export default Logo;