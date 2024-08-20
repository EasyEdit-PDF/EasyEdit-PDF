'use client';

import Link from 'next/link';
import Logo from '../ui/Logo';

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-800 py-8">
            <div className="container mx-auto px-6 flex flex-col items-center md:flex-row md:justify-between">
                <Logo />
                <div className="text-center md:text-left mt-4 md:mt-0">
                    <span className="text-sm md:text-base">
                        Made by Indie-Hackers -{" "}
                        <a
                            href="https://anshulsoni.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-blue-500 hover:text-blue-700 transition-colors duration-300"
                        >
                            Anshul Soni
                        </a>
                        ,{' '}
                        <a
                            href="https://www.divjotsingh.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-blue-500 hover:text-blue-700 transition-colors duration-300"
                        >
                            Divjot Singh Arora
                        </a>
                    </span>
                </div>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <Link
                        href="https://twitter.com/anshulsoni2010"
                        aria-label="Twitter"
                        className="text-gray-600 hover:text-blue-500 transition-colors duration-300"
                    >
                        <svg
                            aria-hidden="true"
                            className="h-6 w-6 fill-current"
                            viewBox="0 0 24 24"
                        >
                            <path d="M23 3a10.913 10.913 0 0 1-3.128.857A5.464 5.464 0 0 0 22.388 2a10.933 10.933 0 0 1-3.469 1.328A5.46 5.46 0 0 0 16.619 2a5.467 5.467 0 0 0-5.467 5.467c0 .428.048.846.137 1.247A15.49 15.49 0 0 1 1.67 3.149a5.46 5.46 0 0 0 1.689 7.287A5.45 5.45 0 0 1 .964 9.62v.068A5.464 5.464 0 0 0 5.467 15a5.469 5.469 0 0 1-2.472.093A5.455 5.455 0 0 0 5.967 17a10.929 10.929 0 0 1-6.769 2.337A10.906 10.906 0 0 1 0 17.09a15.397 15.397 0 0 0 8.29 2.433c9.946 0 15.386-8.238 15.386-15.386 0-.234-.005-.467-.014-.699A10.95 10.95 0 0 0 23 3z" />
                        </svg>
                    </Link>
                    <Link
                        href="https://github.com/easyedit-pdf/easyedit-pdf/"
                        aria-label="GitHub"
                        className="text-gray-600 hover:text-blue-500 transition-colors duration-300"
                    >
                        <svg
                            aria-hidden="true"
                            className="h-6 w-6 fill-current"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;