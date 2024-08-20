'use client';

import { useState } from 'react';
import Logo from '../ui/Logo';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuToggle = () => setIsOpen(!isOpen);

    return (
        <header className="bg-white border-b border-gray-200 shadow-lg">
            <div className="container mx-auto flex justify-between items-center py-4 px-6 sm:px-8">
                <Logo />
                <nav className="hidden sm:flex items-center gap-6">
                    <Link
                        href="/dashboard"
                        className="text-gray-800 py-2 px-4 text-lg font-medium rounded-lg hover:bg-gray-100 transition ease-in-out duration-300"
                    >
                        Log in
                    </Link>
                    <Link
                        href="/dashboard"
                        className="bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 px-4 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                    >
                        Sign up
                    </Link>
                </nav>
                <button
                    className="sm:hidden flex items-center p-2 rounded-lg hover:bg-gray-100 transition ease-in-out duration-300"
                    onClick={handleMenuToggle}
                >
                    <Image
                        src="/menu-icon.svg"
                        alt="Menu"
                        width={24}
                        height={24}
                        className="cursor-pointer"
                    />
                </button>
            </div>
            {isOpen && (
                <motion.div
                    className="sm:hidden flex flex-col items-center gap-4 py-4 bg-white border-t border-gray-200 shadow-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                    <Link
                        href="/dashboard"
                        className="text-gray-800 py-2 px-4 text-lg font-medium rounded-lg hover:bg-gray-100 transition ease-in-out duration-300"
                    >
                        Log in
                    </Link>
                    <Link
                        href="/dashboard"
                        className="bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 px-4 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                    >
                        Sign up
                    </Link>
                </motion.div>
            )}
        </header>
    );
};

export default Header;