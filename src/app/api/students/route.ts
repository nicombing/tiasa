import { NextResponse } from 'next/server';
import { query } from '@/lib/pg';

export async function GET() {
  try {
    const result = await query(
      'SELECT id, name, grade FROM students ORDER BY name ASC'
    );
    
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error('Error fetching students:', err);
    return NextResponse.json({ 
      error: 'Internal Server Error',
      details: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 });
  }
}
