-- Phase 3: Teacher Dashboard Database Expansion

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Students Table
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    grade INTEGER NOT NULL,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Session Logs Table
CREATE TABLE IF NOT EXISTS session_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    session_date DATE NOT NULL DEFAULT CURRENT_DATE,
    sfl_existential INTEGER NOT NULL CHECK (sfl_existential BETWEEN 1 AND 5),
    sfl_relational INTEGER NOT NULL CHECK (sfl_relational BETWEEN 1 AND 5),
    sfl_material INTEGER NOT NULL CHECK (sfl_material BETWEEN 1 AND 5),
    phonics_practiced TEXT[], -- Using TEXT ARRAY for efficiency
    youtube_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Initial seed data for testing
INSERT INTO students (name, grade) VALUES 
('Budi Santoso', 1),
('Siti Aminah', 2),
('Andi Pratama', 3)
ON CONFLICT DO NOTHING;
