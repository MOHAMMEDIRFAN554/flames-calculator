"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

import { FlamesResult } from "@/lib/flames";

interface ResultCardProps {
    result: FlamesResult;
    onReset: () => void;
}

const resultDetails: { [key: string]: { quote: string; color: string; bg: string } } = {
    F: { quote: "The best relationships begin with friendship.", color: "text-blue-400", bg: "from-blue-500/20 to-cyan-500/20" },
    L: { quote: "Some names are meant to meet.", color: "text-pink-400", bg: "from-pink-500/20 to-red-500/20" },
    A: { quote: "There’s a spark you can’t ignore.", color: "text-orange-400", bg: "from-orange-500/20 to-yellow-500/20" },
    M: { quote: "Some bonds are written in destiny.", color: "text-purple-400", bg: "from-purple-500/20 to-pink-500/20" },
    E: { quote: "Not every story is meant to last.", color: "text-red-400", bg: "from-red-600/20 to-orange-600/20" },
    S: { quote: "A bond of care and protection.", color: "text-green-400", bg: "from-green-500/20 to-emerald-500/20" },
};

const genericQuotes = [
    "Some connections are effortless.",
    "Every story has a reason.",
    "Sometimes hearts already know.",
    "The universe has its own plans.",
    "What’s meant to be will be.",
];

const ResultCard = ({ result, onReset }: ResultCardProps) => {
    const details = resultDetails[result.letter] || {
        quote: "The universe has its own plans.",
        color: "text-white",
        bg: "from-white/10 to-white/5"
    };

    useEffect(() => {
        if (result.letter === "L" || result.letter === "M") {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [result.letter]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ type: "spring", damping: 15 }}
            style={{ perspective: 1000 }}
            className={`w-full max-w-md p-10 rounded-[2.5rem] backdrop-blur-2xl border border-white/20 shadow-2xl bg-gradient-to-br ${details.bg} flex flex-col items-center gap-8 relative overflow-hidden`}
        >
            {/* Decorative background glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-white/5 pointer-events-none" />

            <div className="text-center space-y-2 relative z-10">
                <h3 className="text-white/60 text-sm font-uppercase tracking-widest">YOUR RESULT</h3>
                <motion.h2
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className={`text-9xl font-black ${details.color} drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]`}
                >
                    {result.letter}
                </motion.h2>
            </div>

            <div className="text-center space-y-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <span className="px-6 py-2 bg-white/10 rounded-full text-white font-semibold text-xl border border-white/10">
                        {result.meaning}
                    </span>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-white/80 text-lg italic font-light px-4"
                >
                    "{details.quote}"
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-white/40 text-sm flex flex-col gap-1 items-center"
                >
                    <span>{genericQuotes[Math.floor(Math.random() * genericQuotes.length)]}</span>
                    <span className="text-[10px] uppercase tracking-tighter opacity-50">Match Score: {result.totalRemaining}</span>
                </motion.p>
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onReset}
                className="mt-4 px-10 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/20 transition-all font-medium relative z-10"
            >
                Try Again
            </motion.button>
        </motion.div>
    );
};

export default ResultCard;
