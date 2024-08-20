'use client';

import { useState } from 'react';
import Logo from '../ui/Logo';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const [open, setOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark', !darkMode);
    };

    return (
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-md transition-all duration-300">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <Logo />
                <div className="hidden sm:flex items-center space-x-4">
                    <Link
                        href="/dashboard"
                        className="text-blue-600 dark:text-blue-400 py-2 px-4 text-sm font-medium border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-800 transition"
                    >
                        Log in
                    </Link>
                    <Link
                        href="/dashboard"
                        className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white py-2 px-4 text-sm font-medium rounded-lg transition"
                    >
                        Sign up
                    </Link>
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                        aria-label="Toggle dark mode"
                    >
                        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="text-gray-600 dark:text-gray-300" />
                    </button>
                </div>
                <button
                    className="sm:hidden flex items-center"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    <Image
                        src="/align-justify.svg"
                        alt="Menu"
                        width={24}
                        height={24}
                        className="cursor-pointer"
                    />
                </button>
            </div>
            {open && (
                <div className="sm:hidden flex flex-col items-center space-y-4 py-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-md">
                    <Link
                        href="/dashboard"
                        className="text-blue-600 dark:text-blue-400 py-2 px-4 text-sm font-medium border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-800 transition"
                    >
                        Log in
                    </Link>
                    <Link
                        href="/dashboard"
                        className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white py-2 px-4 text-sm font-medium rounded-lg transition"
                    >
                        Sign up
                    </Link>
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                        aria-label="Toggle dark mode"
                    >
                        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="text-gray-600 dark:text-gray-300" />
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;