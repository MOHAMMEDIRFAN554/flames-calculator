"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
    "Love begins with a single spark.",
    "Every name tells a story.",
    "Two hearts, one destiny.",
    "Let fate decide...",
    "Sometimes magic hides in names.",
    "Love begins where logic ends.",
    "Destiny sometimes hides in simple things.",
    "Maybe this is written in the stars.",
    "Names can carry magic.",
    "Let’s see what fate whispers.",
];

const LoadingScreen = () => {
    const [quoteIndex, setQuoteIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setQuoteIndex((prev) => (prev + 1) % quotes.length);
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center space-y-8 p-6">
            <div className="relative">
                {/* Animated Heart */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="relative z-10"
                >
                    <svg
                        width="80"
                        height="80"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]"
                    >
                        <path
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                            fill="currentColor"
                        />
                    </svg>
                </motion.div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-pink-500/20 blur-3xl rounded-full scale-150" />
            </div>

            <div className="h-16 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={quoteIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-white text-xl md:text-2xl font-light italic text-center max-w-sm"
                    >
                        "{quotes[quoteIndex]}"
                    </motion.p>
                </AnimatePresence>
            </div>

            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                />
            </div>
        </div>
    );
};

export default LoadingScreen;
