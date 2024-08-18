"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrochip } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon

const FeaturesData = [
    {
        id: 1,
        name: 'Chat with PDF',
        description: 'Chat with PDF using our AI!',
        link: '/chat',
        icon: <FontAwesomeIcon icon={faMicrochip} />, // Correctly pass the icon component
    },
{
        id: 2,
        name: 'PDF Merger',
        description: 'Merge your PDF Files into one PDF!',
        link: '/tools/pdf-merger/', // taking so much time
        icon: <FontAwesomeIcon icon={faMicrochip} />, // Correctly pass the icon component -- leave it nowe
    },
];

const Features = () => {
    return (
        <div>
<div className="grid w-full grid-cols-2 gap-x-10 md:grid-cols-3">
    {FeaturesData.map((project) => {
        return (
            <motion.div
                whileHover={{
                    y: -8,
                    scale: 1.02, // Slightly enlarge on hover for a subtle effect
                }}
                transition={{
                    type: 'spring',
                    bounce: 0.7,
                }}
                key={project.id}
                className="p-5 mt-5 text-center bg-white  rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={project.link}
                    className="flex flex-col items-center justify-center"
                >
                    <i
                        className="mb-3 p-3 rounded-full border border-gray-300  text-gray-900  text-2xl"
                    >
                        {project.icon}
                    </i>

                    <div className="mb-1 text-4xl font-medium text-gray-900 ">
                        {project.name}
                    </div>
                    <div className="max-w-[250px] text-sm font-normal text-gray-600 ">
                        {project.description}
                    </div>
                </a>
            </motion.div>
        );
    })}
</div>


        </div>
    );
};

export default Features;
