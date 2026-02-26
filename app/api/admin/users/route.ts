import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const pendingUsers = await prisma.user.findMany({
      where: { status: 'ONAY_BEKLIYOR' },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(pendingUsers, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Kullanıcılar çekilemedi.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { userId, action } = await request.json();
    if (!userId || !action) return NextResponse.json({ error: 'Eksik veri.' }, { status: 400 });

    const newStatus = action === 'APPROVE' ? 'AKTIF' : 'ENGELLI';
    
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { status: newStatus }
    });

    return NextResponse.json({ success: true, user: updatedUser }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'İşlem başarısız.' }, { status: 500 });
  }
}
