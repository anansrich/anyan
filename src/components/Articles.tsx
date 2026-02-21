"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const articles = [
  {
    title: "在快节奏时代，如何寻找内心的静谧岛屿？",
    category: "Mental Growth",
    date: "Feb 12, 2026",
    excerpt: "在这个信息过载的时代，焦虑感往往源于我们对外界声音的过度依赖。通过建立心理边界，我们可以重新拿回对生活的掌控感。",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "亲密关系中的影子：依恋模式对成年的影响",
    category: "Relationships",
    date: "Jan 28, 2026",
    excerpt: "童年时期的依恋模式，在不经意间塑造了我们成年后的情感互动逻辑。识别这些模式，是通往健康关系的第一步。",
    image: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?auto=format&fit=crop&q=80&w=800",
  },
];

const Articles = () => {
  return (
    <section id="journal" className="py-32 px-8 md:px-16 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-12 mb-24 border-b border-forest/10 pb-12">
          <div>
            <span className="label-utility text-sage mb-6 block">The Journal</span>
            <h2 className="text-5xl md:text-7xl font-display text-forest leading-[0.9]">
              INSIGHTS <br />
              <span className="text-sage lowercase">& ideas</span>
            </h2>
          </div>
          <button className="hidden md:flex items-center gap-4 group pb-2 self-start">
            <span className="label-utility text-forest group-hover:text-sage transition-premium">View All Articles</span>
            <ArrowRight className="w-5 h-5 text-forest group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {articles.map((article, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] rounded-organic-lg overflow-hidden mb-10 relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute top-8 left-8">
                  <span className="bg-primary/95 backdrop-blur px-4 py-2 rounded-full label-utility text-forest">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="max-w-xl">
                <span className="label-utility text-forest/50 mb-4 block">
                  {article.date}
                </span>
                <h3 className="text-2xl md:text-3xl font-display text-forest mb-6 group-hover:text-sage transition-premium leading-tight uppercase">
                  {article.title}
                </h3>
                <p className="text-forest/65 leading-relaxed font-body mb-8">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-3 text-forest font-bold label-utility border-b border-transparent group-hover:border-sage transition-premium w-fit">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-32 pt-24 border-t border-forest/5 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1 border-r border-forest/5 pr-12">
            <h4 className="label-utility text-forest/40 mb-8">Quick Thought</h4>
            <p className="text-xl font-body italic text-forest/80 leading-relaxed">
              "Healing is not a linear process, it's a series of unfolding layers."
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="bg-sageLight/30 p-10 rounded-organic-lg flex flex-col md:flex-row items-center justify-between gap-8 border border-sage/20">
              <div>
                <h4 className="text-xl font-display text-forest mb-2 uppercase tracking-tight">订阅我的简报</h4>
                <p className="text-forest/65 font-body">每月获取深度心理学洞察与自我疗愈指南。</p>
              </div>
              <div className="flex border-b-2 border-forest/20 pb-2 w-full md:w-auto min-w-[200px]">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="bg-transparent border-none outline-none label-utility placeholder:text-forest/40 flex-grow"
                />
                <button className="label-utility text-sage hover:text-forest transition-premium ml-4">Join</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Articles;
