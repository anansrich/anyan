"use client";

import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: "个人心理成长",
    description: "通过深度的自我探索，解开心结，重塑自我认同，开启更有张力的生命旅程。",
    icon: "01",
  },
  {
    title: "亲密关系修复",
    description: "改善沟通模式，重建信任，在关系中找到平衡点，重拾爱与被爱的能力。",
    icon: "02",
  },
  {
    title: "职场焦虑管理",
    description: "在高压环境中建立心理韧性，平衡职业追求与个人生活，重获掌控感。",
    icon: "03",
  },
];

const AboutServices = () => {
  return (
    <section id="service" className="py-32 px-8 md:px-16 bg-sageLight/20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-7">
            <span className="label-utility text-sage mb-6 block">Our Expertise</span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-display text-forest leading-[0.9]"
            >
              A HOLISTIC <br />
              <span className="text-sage lowercase">approach</span> TO WELLBEING
            </motion.h2>
          </div>
          <div className="md:col-span-5 pb-2">
            <p className="max-w-sm text-forest/70 leading-relaxed font-body">
              我们相信每个灵魂都值得被温柔以待。通过融合循证心理学与人文关怀，提供定制化的心理支持方案。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="p-10 md:p-14 bg-primary rounded-organic-lg border border-forest/5 group transition-premium hover:border-sage/30 hover:shadow-xl"
            >
              <span className="text-7xl font-display text-forest/10 group-hover:text-sage/20 transition-premium block mb-10">
                {service.icon}
              </span>
              <h3 className="text-2xl font-display text-forest mb-6 uppercase tracking-tight group-hover:text-forestLight transition-premium">
                {service.title}
              </h3>
              <p className="text-forest/65 leading-relaxed font-body group-hover:translate-x-2 transition-transform duration-700">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="aspect-video rounded-organic-lg overflow-hidden bg-sageLight/20 group relative">
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200"
                alt="Therapy Room"
                className="w-full h-full object-cover grayscale hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-forest/10 group-hover:bg-transparent transition-colors duration-700" />
            </div>
          </motion.div>
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h3 className="text-4xl md:text-5xl font-display text-forest mb-8 leading-tight uppercase">
              建立一段<br />
              基于信任的<span className="text-sage lowercase">alliance</span>
            </h3>
            <p className="text-lg text-forest/70 mb-12 leading-relaxed font-body">
              拥有十年执业经验的国家二级心理咨询师。专注于成人依恋模型与情绪调节。
              我们不仅提供技术，更提供一个可以安全存放脆弱的空间。
            </p>
            <button className="self-start label-utility text-forest border-b-2 border-sage pb-1 hover:text-sage transition-premium">
              View Qualifications
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutServices;
