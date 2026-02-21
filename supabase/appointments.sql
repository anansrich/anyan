-- 预约表
-- 在 Supabase Dashboard → SQL Editor 中执行此脚本

CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- 同一日期同一时间段只能有一人预约
  UNIQUE (appointment_date, time_slot)
);

-- 可选：为查询已预约时段建索引
CREATE INDEX idx_appointments_date_slot ON appointments (appointment_date, time_slot);
