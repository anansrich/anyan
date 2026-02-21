"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-20 z-50 flex items-center justify-between px-8 md:px-16 bg-primary/80 backdrop-blur-md border-b border-forest/5">
      <Link href="/" className="text-xl font-display tracking-tight text-forest uppercase">
        PSYCH CARE <span className="text-sage">X</span> EXPERT
      </Link>

      <div className="hidden md:flex items-center space-x-12">
        {['Service', 'About', 'Journal', 'Booking'].map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase()}`}
            className="label-utility text-forest/70 hover:text-forest transition-premium"
          >
            {item}
          </Link>
        ))}
        <Link
          href="/appointment"
          className="label-utility text-forest/70 hover:text-forest transition-premium"
        >
          预约
        </Link>
      </div>

      <Link href="/appointment">
        <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="bg-forest text-primary font-bold text-xs tracking-[0.2em] uppercase px-8 py-3 rounded-organic transition-premium hover:bg-forestLight"
      >
        Make Appointment
      </motion.button>
      </Link>
    </nav>
  );
};

export default Navigation;
