import { NextResponse } from 'next/server';

export async function GET() {
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
  ];
  return NextResponse.json(users);
}
