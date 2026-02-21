"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface NameFormProps {
    onCalculate: (name1: string, name2: string) => void;
}

const NameForm = ({ onCalculate }: NameFormProps) => {
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const term1 = name1.trim().replace(/[^a-zA-Z\s]/g, "");
        const term2 = name2.trim().replace(/[^a-zA-Z\s]/g, "");

        if (!term1 || !term2) {
            setError("Please enter both names (letters only).");
            return;
        }

        onCalculate(term1, term2);
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="w-full max-w-md p-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl flex flex-col gap-6"
        >
            <div className="space-y-4">
                <div className="relative">
                    <label className="text-white/70 text-sm mb-1 ml-1 block font-medium">Your Name</label>
                    <input
                        type="text"
                        value={name1}
                        onChange={(e) => setName1(e.target.value)}
                        placeholder="Enter first name..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all text-lg"
                    />
                </div>

                <div className="relative">
                    <label className="text-white/70 text-sm mb-1 ml-1 block font-medium">Partner's Name</label>
                    <input
                        type="text"
                        value={name2}
                        onChange={(e) => setName2(e.target.value)}
                        placeholder="Enter second name..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all text-lg"
                    />
                </div>
            </div>

            {error && (
                <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-pink-300 text-sm text-center font-medium bg-pink-500/10 py-2 rounded-lg"
                >
                    {error}
                </motion.p>
            )}

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all"
            >
                Check FLAMES
            </motion.button>
        </motion.form>
    );
};

export default NameForm;
