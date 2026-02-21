"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Calendar, Clock, Mail, FileText, ChevronLeft, Check, User, Phone } from "lucide-react";
import { supabase } from "@/lib/supabase";

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "19:00",
  "20:00",
];

interface AppointmentForm {
  name: string;
  phone: string;
  date: string;
  timeSlot: string;
  email: string;
  notes: string;
}

const AppointmentPage = () => {
  const [step, setStep] = useState<"form" | "confirm" | "success">("form");
  const [formData, setFormData] = useState<AppointmentForm>({
    name: "",
    phone: "",
    date: "",
    timeSlot: "",
    email: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof AppointmentForm, string>>>({});
  const [slotConflictError, setSlotConflictError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof AppointmentForm, string>> = {};
    if (!formData.name?.trim()) newErrors.name = "请输入姓名";
    if (!formData.phone?.trim()) newErrors.phone = "请输入电话";
    if (!formData.date) newErrors.date = "请选择预约日期";
    if (!formData.timeSlot) newErrors.timeSlot = "请选择时间段";
    if (!formData.email) {
      newErrors.email = "请输入邮箱";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "请输入有效的邮箱地址";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) setStep("confirm");
  };

  const handleConfirm = async () => {
    setSlotConflictError(null);
    setSubmitError(null);
    setIsSubmitting(true);

    const { data: existing } = await supabase
      .from("appointments")
      .select("id")
      .eq("appointment_date", formData.date)
      .eq("time_slot", formData.timeSlot)
      .maybeSingle();

    if (existing) {
      setSlotConflictError("该时间段已被预约");
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase.from("appointments").insert({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      appointment_date: formData.date,
      time_slot: formData.timeSlot,
      notes: formData.notes.trim() || null,
    });

    setIsSubmitting(false);

    if (error) {
      if (error.code === "23505") {
        setSlotConflictError("该时间段已被预约");
      } else {
        setSubmitError("预约失败，请稍后重试");
      }
      return;
    }

    setStep("success");
  };

  const handleBackToEdit = () => {
    setStep("form");
    setSlotConflictError(null);
    setSubmitError(null);
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr + "T12:00:00");
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  const getTomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

  return (
    <main className="min-h-screen bg-primary">
      <Navigation />

      <section className="pt-32 pb-32 px-8 md:px-16 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 label-utility text-forest/70 hover:text-forest transition-premium mb-16"
          >
            <ChevronLeft className="w-4 h-4" />
            返回首页
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-utility text-sage mb-6 block">预约服务</span>
            <h1 className="text-5xl md:text-6xl font-display text-forest leading-[0.9] mb-6">
              预约 <span className="text-sage lowercase">session</span>
            </h1>
            <p className="text-forest/65 font-body mb-14">
              请填写以下信息完成预约，我们将在 24 小时内与您确认。
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {step === "form" && (
              <motion.form
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onSubmit={handleSubmit}
                className="bg-sageLight/20 p-10 md:p-14 rounded-organic-lg border border-forest/5 space-y-10"
              >
                <div>
                  <label className="flex items-center gap-2 label-utility text-forest mb-4">
                    <User className="w-4 h-4" />
                    姓名
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="您的姓名"
                    className={`w-full px-6 py-4 rounded-organic bg-primary border transition-premium font-body text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-sage/50 ${
                      errors.name ? "border-red-500/50" : "border-forest/10 focus:border-sage"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600/80 font-body">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 label-utility text-forest mb-4">
                    <Calendar className="w-4 h-4" />
                    预约日期
                  </label>
                  <input
                    type="date"
                    min={getTomorrow()}
                    value={formData.date}
                    onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                    className={`w-full px-6 py-4 rounded-organic bg-primary border transition-premium font-body text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-sage/50 ${
                      errors.date ? "border-red-500/50" : "border-forest/10 focus:border-sage"
                    }`}
                  />
                  {errors.date && (
                    <p className="mt-2 text-sm text-red-600/80 font-body">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 label-utility text-forest mb-4">
                    <Clock className="w-4 h-4" />
                    时间段 <span className="text-forest/50 font-body text-[10px] normal-case tracking-normal">(50 分钟/时段)</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {TIME_SLOTS.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, timeSlot: time }))}
                        className={`py-4 rounded-organic text-sm font-bold transition-premium ${
                          formData.timeSlot === time
                            ? "bg-forest text-primary"
                            : "bg-primary border border-forest/10 text-forest/60 hover:border-sage hover:text-sage"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  {errors.timeSlot && (
                    <p className="mt-2 text-sm text-red-600/80 font-body">{errors.timeSlot}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 label-utility text-forest mb-4">
                    <Mail className="w-4 h-4" />
                    联系方式 (邮箱)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                    className={`w-full px-6 py-4 rounded-organic bg-primary border transition-premium font-body text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-sage/50 ${
                      errors.email ? "border-red-500/50" : "border-forest/10 focus:border-sage"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600/80 font-body">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 label-utility text-forest mb-4">
                    <Phone className="w-4 h-4" />
                    电话
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="您的联系电话"
                    className={`w-full px-6 py-4 rounded-organic bg-primary border transition-premium font-body text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-sage/50 ${
                      errors.phone ? "border-red-500/50" : "border-forest/10 focus:border-sage"
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600/80 font-body">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 label-utility text-forest mb-4">
                    <FileText className="w-4 h-4" />
                    备注
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder="可填写您希望咨询的主题或其它说明（选填）"
                    rows={4}
                    className="w-full px-6 py-4 rounded-organic bg-primary border border-forest/10 text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-premium font-body resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-forest text-primary py-6 rounded-organic label-utility hover:bg-forestLight transition-premium shadow-lg"
                >
                  提交
                </motion.button>
              </motion.form>
            )}

            {step === "confirm" && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="bg-sageLight/20 p-10 md:p-14 rounded-organic-lg border border-forest/5 space-y-10"
              >
                <h3 className="text-xl font-display text-forest uppercase tracking-tight mb-8">
                  请确认您的预约信息
                </h3>

                {(slotConflictError || submitError) && (
                  <div className="rounded-organic bg-red-500/10 border border-red-500/30 px-6 py-4 text-red-600 font-body">
                    {slotConflictError || submitError}
                  </div>
                )}

                <div className="space-y-6 font-body text-forest">
                  <div className="flex justify-between py-4 border-b border-forest/10">
                    <span className="text-forest/60">姓名</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-forest/10">
                    <span className="text-forest/60">预约日期</span>
                    <span className="font-medium">{formatDisplayDate(formData.date)}</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-forest/10">
                    <span className="text-forest/60">时间段</span>
                    <span className="font-medium">{formData.timeSlot} (50 分钟)</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-forest/10">
                    <span className="text-forest/60">邮箱</span>
                    <span className="font-medium">{formData.email}</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-forest/10">
                    <span className="text-forest/60">电话</span>
                    <span className="font-medium">{formData.phone}</span>
                  </div>
                  {formData.notes && (
                    <div className="flex flex-col gap-2 py-4 border-b border-forest/10">
                      <span className="text-forest/60">备注</span>
                      <span className="font-medium">{formData.notes}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBackToEdit}
                    className="flex-1 py-4 rounded-organic label-utility border-2 border-forest/20 text-forest hover:border-forest hover:bg-forest/5 transition-premium"
                  >
                    返回修改
                  </motion.button>
                  <motion.button
                    type="button"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    onClick={handleConfirm}
                    className="flex-1 py-4 rounded-organic label-utility bg-forest text-primary hover:bg-forestLight transition-premium shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "提交中..." : "确认"}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {step === "success" && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-forest/60 backdrop-blur-sm z-50"
              onClick={() => {}}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md bg-primary rounded-organic-lg border border-forest/10 p-12 shadow-2xl text-center"
            >
              <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-sage/30 flex items-center justify-center">
                <Check className="w-8 h-8 text-forest" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-display text-forest uppercase tracking-tight mb-4">
                预约成功
              </h3>
              <p className="text-forest/70 font-body mb-10">
                预约已提交成功，我们将在 24 小时内与您确认。
              </p>
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-forest text-primary py-4 rounded-organic label-utility hover:bg-forestLight transition-premium"
                >
                  返回首页
                </motion.button>
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
};

export default AppointmentPage;
