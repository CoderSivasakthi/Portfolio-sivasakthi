"use client";

import { motion } from "framer-motion";

export function TubelightIndicator() {
  return (
    <motion.div
      layoutId="active-tubelight"
      className="absolute inset-0 rounded-full -z-10"
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 28,
      }}
    >
      {/* Liquid glass base */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-full border border-white/10" />

      {/* Soft lamp glow */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white/40 rounded-t-full">
        <div className="absolute w-10 h-5 bg-white/20 blur-md -top-2 -left-1" />
        <div className="absolute w-6 h-4 bg-white/15 blur-sm top-0 left-1" />
      </div>
    </motion.div>
  );
}
