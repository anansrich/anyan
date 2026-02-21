"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-36 pb-24 px-8 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-8 space-y-12">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11vw] md:text-[14vw] font-display uppercase text-forest leading-[0.85]"
          >
            THE INNER <br />
            <span className="text-sage lowercase tracking-tight">journey</span> <br />
            BEGINS NOW
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16"
          >
            <p className="max-w-md text-lg md:text-xl text-forest/70 leading-relaxed font-body">
              探索内心深处的秘密，与专业心理咨询师共同开启疗愈之旅。我们将以更奢雅、更私密的姿态，陪伴您的每一次蜕变。
            </p>

            <button className="group flex items-center gap-3 border-b-2 border-sage pb-2 text-forest transition-premium hover:text-sage">
              <span className="label-utility text-forest">Start Journey</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 relative group"
        >
          <div className="aspect-[3/4] rounded-organic-lg overflow-hidden bg-sageLight/30 relative z-10 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
              alt="Psychological Consultant"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            />
            <div className="absolute top-6 left-6 z-20">
              <span className="bg-primary/95 backdrop-blur px-4 py-2 label-utility text-forest rounded-full shadow-lg">
                Lead Therapist
              </span>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -right-6 w-full h-full border-2 border-sage/30 rounded-organic-lg -z-0 group-hover:border-sage/50 transition-premium"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
