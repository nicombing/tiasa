import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { student_name, student_grade, english_experience, parent_name, whatsapp_number } = body;

    if (!student_name || !student_grade || !english_experience || !parent_name || !whatsapp_number) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          student_name,
          student_grade: parseInt(student_grade),
          english_experience,
          parent_name,
          whatsapp_number,
        },
      ])
      .select('id')
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, id: data.id }, { status: 201 });
  } catch (err) {
    console.error('Error inserting lead:', err);
    return NextResponse.json({ 
      error: 'Internal Server Error', 
      details: err instanceof Error ? err.message : 'Unknown error' 
    }, { status: 500 });
  }
}
