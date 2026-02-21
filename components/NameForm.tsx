"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NameFormProps {
    onCalculate: (name1: string, name2: string) => void;
    isLoading: boolean;
}

const NameForm = ({ onCalculate, isLoading }: NameFormProps) => {
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading) return;
        setError("");

        const term1 = name1.trim();
        const term2 = name2.trim();

        if (!term1 || !term2) {
            setError("Please whisper both names to the stars...");
            return;
        }

        if (!/[a-zA-Z]/.test(term1) || !/[a-zA-Z]/.test(term2)) {
            setError("Names must contain at least a few letters!");
            return;
        }

        onCalculate(term1, term2);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
        >
            <form
                onSubmit={handleSubmit}
                className="bg-white/10 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col gap-8 relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 animate-gradient-x" />

                <div className="text-center space-y-2">
                    <h2 className="text-white text-3xl font-bold tracking-tight">Bond Check</h2>
                    <p className="text-white/40 text-sm">Enter the names to see what fate has in store.</p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-white/60 text-xs font-bold uppercase tracking-widest ml-1">The First Individual</label>
                        <div className="relative group">
                            <input
                                type="text"
                                value={name1}
                                onChange={(e) => setName1(e.target.value)}
                                placeholder="Enter a name..."
                                disabled={isLoading}
                                className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500/30 transition-all text-lg group-hover:border-white/20 shadow-inner"
                            />
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl opacity-20 group-focus-within:opacity-50 transition-opacity">👤</div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-white/60 text-xs font-bold uppercase tracking-widest ml-1">The Second Individual</label>
                        <div className="relative group">
                            <input
                                type="text"
                                value={name2}
                                onChange={(e) => setName2(e.target.value)}
                                placeholder="Enter a name..."
                                disabled={isLoading}
                                className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all text-lg group-hover:border-white/20 shadow-inner"
                            />
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl opacity-20 group-focus-within:opacity-50 transition-opacity">👤</div>
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs px-4 py-3 rounded-xl flex items-center gap-3">
                                <span className="text-lg">⚠️</span>
                                {error}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.01, translateY: -2 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                    type="submit"
                    className="relative group overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 group-hover:from-pink-400 group-hover:to-purple-500 transition-all" />
                    <div className="relative py-4 w-full flex items-center justify-center gap-2 text-white font-black text-lg uppercase tracking-widest">
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                />
                                Connecting...
                            </div>
                        ) : (
                            <>
                                Reveal Destiny
                                <span className="text-xl">✨</span>
                            </>
                        )}
                    </div>
                </motion.button>

                <p className="text-center text-[10px] text-white/20 uppercase tracking-widest font-medium">Your data is stored securely in our stardust database.</p>
            </form>
        </motion.div>
    );
};

export default NameForm;
