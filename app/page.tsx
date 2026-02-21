"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NameForm from "@/components/NameForm";
import LoadingScreen from "@/components/LoadingScreen";
import ResultCard from "@/components/ResultCard";
import { calculateFlames, FlamesResult } from "@/lib/flames";

export default function Home() {
  const [state, setState] = useState<"idle" | "loading" | "result">("idle");
  const [result, setResult] = useState<FlamesResult | null>(null);

  const handleCalculate = (name1: string, name2: string) => {
    setState("loading");

    // Logic is calculated but hidden during loading
    const finalResult = calculateFlames(name1, name2);
    setResult(finalResult);

    // Artificial delay for loading experience
    setTimeout(() => {
      setState("result");
    }, 3000);
  };

  const reset = () => {
    setState("idle");
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#4a1a4a] to-[#2e1a4a] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs for aesthetic */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full" />

      <div className="z-10 w-full flex flex-col items-center">
        <header className="mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 drop-shadow-sm mb-2"
          >
            FLAMES
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 tracking-[0.2em] font-light text-sm uppercase"
          >
            Discover Your Destiny
          </motion.p>
        </header>

        <section className="w-full flex justify-center items-center py-4">
          <AnimatePresence mode="wait">
            {state === "idle" && (
              <NameForm key="form" onCalculate={handleCalculate} />
            )}

            {state === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-md py-12"
              >
                <LoadingScreen />
              </motion.div>
            )}

            {state === "result" && result && (
              <ResultCard
                key="result"
                result={result}
                onReset={reset}
              />
            )}
          </AnimatePresence>
        </section>

        <footer className="mt-16 text-white/30 text-xs flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <span>F - Friends</span>
            <span>L - Love</span>
            <span>A - Attraction</span>
          </div>
          <div className="flex items-center gap-4">
            <span>M - Marriage</span>
            <span>E - Enemy</span>
            <span>S - Sister</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
