"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AboutServices from "@/components/AboutServices";
import Booking from "@/components/Booking";
import Articles from "@/components/Articles";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-primary">
      <Navigation />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Hero />
        <AboutServices />
        <Articles />
        <Booking />
        
        {/* Footer */}
        <footer className="py-28 px-8 md:px-16 bg-forest text-primary">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-20 md:gap-0">
            <div>
              <h2 className="text-6xl md:text-[8vw] font-display leading-[0.85] mb-12 uppercase">
                BE WELL <br />
                <span className="text-sageLight lowercase">always</span>
              </h2>
              <div className="flex flex-col gap-4">
                <span className="label-utility text-primary/50">Connect</span>
                <div className="flex gap-8">
                  <a href="#" className="label-utility hover:text-sageLight transition-premium">Instagram</a>
                  <a href="#" className="label-utility hover:text-sageLight transition-premium">LinkedIn</a>
                  <a href="#" className="label-utility hover:text-sageLight transition-premium">WeChat</a>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="flex flex-col gap-4 mb-12">
                <span className="label-utility text-primary/50">Office</span>
                <p className="text-base font-body font-medium uppercase tracking-wide">Room 402, Building 7 <br /> Luxury Plaza, Shanghai</p>
              </div>
              <p className="label-utility text-primary/30">
                © 2026 PSYCH CARE X EXPERT. ALL RIGHTS RESERVED.
              </p>
            </div>
          </div>
        </footer>
      </motion.div>
    </main>
  );
}
