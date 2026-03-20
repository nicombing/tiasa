import { NextResponse } from 'next/server';
import { query } from '@/lib/pg';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      student_id, 
      session_date, 
      sfl_existential, 
      sfl_relational, 
      sfl_material, 
      phonics_practiced, 
      youtube_url 
    } = body;

    // Basic validation
    if (!student_id || !sfl_existential || !sfl_relational || !sfl_material) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const sql = `
      INSERT INTO session_logs (
        student_id, 
        session_date, 
        sfl_existential, 
        sfl_relational, 
        sfl_material, 
        phonics_practiced, 
        youtube_url
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `;

    const values = [
      student_id,
      session_date || new Date().toISOString().split('T')[0],
      parseInt(sfl_existential),
      parseInt(sfl_relational),
      parseInt(sfl_material),
      phonics_practiced || [],
      youtube_url || null
    ];

    const result = await query(sql, values);
    
    return NextResponse.json({ 
      success: true, 
      id: result.rows[0].id 
    }, { status: 201 });

  } catch (err) {
    console.error('Error logging session:', err);
    return NextResponse.json({ 
      error: 'Internal Server Error',
      details: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 });
  }
}
