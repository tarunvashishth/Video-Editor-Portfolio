import { NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: Request) {
  await new Promise(res => setTimeout(res, 1000));
  return NextResponse.json({ success: true, message: 'Portfolio saved (mock)' });
}