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
  const [names, setNames] = useState({ name1: "", name2: "" });

  const handleCalculate = async (name1: string, name2: string) => {
    setNames({ name1, name2 });
    setState("loading");

    try {
      const finalResult = calculateFlames(name1, name2);
      setResult(finalResult);

      // Save to DB in background
      try {
        console.log("Frontend: Sending results to DB...");
        const response = await fetch("/api/save-result", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name1, name2, result: finalResult }),
        });
        const data = await response.json();
        console.log("Frontend: DB Save Response:", data);
      } catch (e) {
        console.error("Frontend: Failed to save result", e);
      }
    } catch (error) {
      console.error("Calculation failed:", error);
    }

    // Artificial cinematic delay
    setTimeout(() => {
      setState("result");
    }, 3000);
  };

  const reset = () => {
    setState("idle");
    setResult(null);
    setNames({ name1: "", name2: "" });
  };

  return (
    <main className="min-h-screen bg-[#0a0510] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-pink-900/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-purple-900/20 blur-[180px] rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      <div className="z-10 w-full flex flex-col items-center max-w-4xl space-y-12">
        <header className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white/40 uppercase tracking-[0.4em] backdrop-blur-sm"
          >
            The Ultimate Affinity Check
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-7xl md:text-9xl font-black text-white tracking-tighter"
          >
            F<span className="text-pink-500">L</span>AM<span className="text-purple-500">E</span>S
          </motion.h1>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto opacity-50" />
        </header>

        <section className="w-full flex justify-center items-center">
          <AnimatePresence mode="wait">
            {state === "idle" && (
              <NameForm key="idle-form" onCalculate={handleCalculate} isLoading={false} />
            )}

            {state === "loading" && (
              <motion.div
                key="loading-screen"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex justify-center"
              >
                <LoadingScreen />
              </motion.div>
            )}

            {state === "result" && result && (
              <ResultCard
                key="result-card"
                result={result}
                onReset={reset}
                name1={names.name1}
                name2={names.name2}
              />
            )}
          </AnimatePresence>
        </section>

        {state === "idle" && (
          <footer className="pt-12 text-center space-y-6">
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {[
                { l: "F", m: "Friends" },
                { l: "L", m: "Love" },
                { l: "A", m: "Attraction" },
                { l: "M", m: "Marriage" },
                { l: "E", m: "Enemy" },
                { l: "S", m: "Sister" },
              ].map((item) => (
                <div key={item.l} className="flex flex-col items-center gap-1 group">
                  <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white font-black group-hover:bg-white/10 transition-colors shadow-lg">
                    {item.l}
                  </span>
                  <span className="text-[10px] uppercase text-white/30 font-bold tracking-widest">{item.m}</span>
                </div>
              ))}
            </div>
            <p className="text-white/10 text-[10px] tracking-widest uppercase">Trusted by thousands of destiny seekers</p>
          </footer>
        )}
      </div>
    </main>
  );
}
