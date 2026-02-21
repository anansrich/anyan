"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, ChevronRight } from 'lucide-react';

const timeSlots = ["09:00", "11:00", "14:00", "16:00", "19:00", "21:00"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Booking = () => {
  const [selectedDay, setSelectedDay] = useState("Mon");
  const [selectedTime, setSelectedTime] = useState("");

  return (
    <section id="booking" className="py-32 px-8 md:px-16 bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5">
            <span className="label-utility text-sage mb-6 block">Ready to Connect</span>
            <h2 className="text-5xl md:text-7xl font-display text-forest mb-12 leading-[0.9]">
              SECURE YOUR <br />
              <span className="text-sage lowercase">session</span>
            </h2>
            <p className="text-lg text-forest/65 leading-relaxed font-body mb-12">
              所有的谈话都受到严格的隐私保护协议。请选择您方便的时间段，我们将在 24 小时内确认您的预约。
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-organic flex items-center justify-center border border-sage/30 group-hover:bg-sage/20 group-hover:border-sage transition-premium">
                  <CalendarIcon className="w-6 h-6 text-forest" />
                </div>
                <span className="label-utility text-forest">Flexible Scheduling</span>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-organic flex items-center justify-center border border-sage/30 group-hover:bg-sage/20 group-hover:border-sage transition-premium">
                  <Clock className="w-6 h-6 text-forest" />
                </div>
                <span className="label-utility text-forest">50-Minute Sessions</span>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-sageLight/20 p-10 md:p-16 rounded-organic-lg border border-forest/5"
          >
            <div className="mb-14">
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-xl font-display text-forest uppercase tracking-tight">February 2026</h4>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-sage/20 rounded-organic transition-premium">
                    <ChevronRight className="w-5 h-5 rotate-180 text-forest" />
                  </button>
                  <button className="p-2 hover:bg-sage/20 rounded-organic transition-premium">
                    <ChevronRight className="w-5 h-5 text-forest" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-3">
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`aspect-square flex flex-col items-center justify-center rounded-organic transition-premium ${
                      selectedDay === day
                        ? 'bg-forest text-primary'
                        : 'hover:bg-sage/20 text-forest/50'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase mb-1">{day}</span>
                    <span className="text-base font-display tracking-tight">12</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-14">
              <h4 className="label-utility text-forest/50 mb-6">Available Time</h4>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-4 rounded-organic text-sm font-bold transition-premium ${
                      selectedTime === time
                        ? 'bg-forest text-primary'
                        : 'bg-primary border border-forest/10 text-forest/60 hover:border-sage hover:text-sage'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-forest text-primary py-6 rounded-organic label-utility hover:bg-forestLight transition-premium shadow-lg"
            >
              Confirm Appointment
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
