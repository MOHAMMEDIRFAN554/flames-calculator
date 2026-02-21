"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { FlamesResult } from "@/lib/flames";

interface ResultCardProps {
    result: FlamesResult;
    onReset: () => void;
    name1: string;
    name2: string;
}

const resultDetails: Record<string, { quote: string; color: string; bg: string; icon: string }> = {
    F: { quote: "The best relationships begin with friendship.", color: "text-blue-400", bg: "from-blue-600/30 to-cyan-500/30", icon: "🤝" },
    L: { quote: "Some names are meant to meet.", color: "text-pink-400", bg: "from-pink-600/30 to-red-500/30", icon: "❤️" },
    A: { quote: "There’s a spark you can’t ignore.", color: "text-orange-400", bg: "from-orange-600/30 to-yellow-500/30", icon: "✨" },
    M: { quote: "Some bonds are written in destiny.", color: "text-purple-400", bg: "from-purple-600/30 to-pink-500/30", icon: "💍" },
    E: { quote: "Not every story is meant to last.", color: "text-red-400", bg: "from-red-600/30 to-orange-600/30", icon: "💔" },
    S: { quote: "A bond of care and protection.", color: "text-green-400", bg: "from-green-600/30 to-emerald-500/30", icon: "🛡️" },
};

const ResultCard = ({ result, onReset, name1, name2 }: ResultCardProps) => {
    const [showBreakdown, setShowBreakdown] = useState(false);
    const details = resultDetails[result.letter] || {
        quote: "The universe has its own plans.",
        color: "text-white",
        bg: "from-white/10 to-white/5",
        icon: "🌟"
    };

    useEffect(() => {
        if (result.letter === "L" || result.letter === "M") {
            const duration = 4 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 80, zIndex: 50 };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: any = setInterval(() => {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) return clearInterval(interval);

                const particleCount = 60 * (timeLeft / duration);
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [result.letter]);

    return (
        <div className="w-full max-w-2xl px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className={`relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br ${details.bg} backdrop-blur-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]`}
            >
                <div className="absolute top-0 right-0 p-8 text-6xl opacity-20 select-none">
                    {details.icon}
                </div>

                <div className="p-8 md:p-12 flex flex-col items-center text-center space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-white/50 uppercase tracking-[0.3em] text-xs font-bold">Calculation Complete</h2>
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                            <span className="text-2xl md:text-3xl font-light text-white italic">{name1}</span>
                            <span className="text-pink-500 text-xl">&</span>
                            <span className="text-2xl md:text-3xl font-light text-white italic">{name2}</span>
                        </div>
                    </div>

                    <div className="relative">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", damping: 12, delay: 0.2 }}
                            className={`text-[10rem] md:text-[12rem] font-black leading-none ${details.color} drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]`}
                        >
                            {result.letter}
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-[-1rem]"
                        >
                            <span className="px-8 py-3 bg-white/10 rounded-full text-white font-bold text-2xl border border-white/10 shadow-xl backdrop-blur-md">
                                {result.meaning}
                            </span>
                        </motion.div>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-white/70 text-lg md:text-xl font-medium max-w-md italic"
                    >
                        "{details.quote}"
                    </motion.p>

                    <div className="w-full pt-4 space-y-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowBreakdown(!showBreakdown)}
                            className="mx-auto flex items-center gap-2 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/60 text-xs font-bold uppercase tracking-widest transition-all shadow-lg"
                        >
                            <span>{showBreakdown ? "Hide Process" : "Show How It Was Calculated"}</span>
                            <motion.span animate={{ rotate: showBreakdown ? 180 : 0 }}>▼</motion.span>
                        </motion.button>

                        <AnimatePresence>
                            {showBreakdown && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="bg-black/40 rounded-3xl p-6 md:p-8 text-left space-y-6 border border-white/5 backdrop-blur-md shadow-inner mt-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <span className="text-[10px] text-white/40 uppercase font-black tracking-widest block">Normalized Names</span>
                                                <div className="flex flex-col gap-1">
                                                    <p className="text-white/90 font-mono text-xs bg-white/5 py-2 px-3 rounded-lg border border-white/5">{result.name1Normalized}</p>
                                                    <p className="text-white/90 font-mono text-xs bg-white/5 py-2 px-3 rounded-lg border border-white/5">{result.name2Normalized}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <span className="text-[10px] text-white/40 uppercase font-black tracking-widest block">Common Letters Removed</span>
                                                <div className="p-3 bg-pink-500/5 border border-pink-500/10 rounded-xl min-h-[40px] flex flex-wrap gap-2 items-center text-center">
                                                    {result.commonLetters.length > 0 ? (
                                                        result.commonLetters.map((l, i) => (
                                                            <span key={i} className="w-6 h-6 flex items-center justify-center bg-pink-500/20 rounded text-pink-300 font-mono text-xs mx-auto md:mx-0">{l}</span>
                                                        ))
                                                    ) : (
                                                        <span className="text-white/20 text-xs italic mx-auto">No common letters</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <span className="text-[10px] text-white/40 uppercase font-black tracking-widest block">The Calculation Result</span>
                                            <div className="grid grid-cols-3 gap-2">
                                                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
                                                    <p className="text-[9px] text-white/30 mb-1 uppercase tracking-tighter">Remaining</p>
                                                    <p className="text-3xl font-black text-white">{result.totalRemaining}</p>
                                                </div>
                                                <div className="flex items-center justify-center">
                                                    <motion.div
                                                        animate={{ x: [0, 5, 0] }}
                                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                                        className="text-white/20 text-2xl"
                                                    >
                                                        ➜
                                                    </motion.div>
                                                </div>
                                                <div className="bg-gradient-to-br from-white/10 to-transparent rounded-2xl p-4 border border-white/10 text-center">
                                                    <p className="text-[9px] text-white/30 mb-1 uppercase tracking-tighter">Final Result</p>
                                                    <p className={`text-3xl font-black ${details.color}`}>{result.letter}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <span className="text-[10px] text-white/40 uppercase font-black tracking-widest block">Logic Elimination Rounds</span>
                                            <div className="space-y-2 max-h-40 overflow-y-auto pr-3 custom-scrollbar">
                                                {result.breakdown.map((step, i) => (
                                                    <div key={i} className="text-[10px] text-white/50 border-l-2 border-pink-500/30 pl-4 py-2 bg-white/5 rounded-r-lg group hover:bg-white/10 transition-colors">
                                                        <span className="text-pink-500/40 mr-2 font-mono">#{i + 1}</span>
                                                        {step}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="flex flex-col gap-4 w-full pt-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onReset}
                            className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/20 transition-all font-bold tracking-wider uppercase text-sm shadow-xl"
                        >
                            Try with others
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ResultCard;
