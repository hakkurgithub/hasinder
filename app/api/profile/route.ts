import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    if (!userId) return NextResponse.json({ error: 'Kullanıcı ID eksik.' }, { status: 400 });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, taxNo: true, sector: true, role: true, iban: true, phone: true }
    });

    if (!user) return NextResponse.json({ error: 'Kullanıcı bulunamadı.' }, { status: 404 });
    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { userId, iban, phone, newPassword } = await request.json();
    if (!userId) return NextResponse.json({ error: 'Eksik veri.' }, { status: 400 });

    const updateData: any = {};
    if (iban !== undefined) updateData.iban = iban;
    if (phone !== undefined) updateData.phone = phone;
    if (newPassword) updateData.password = newPassword;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: { id: true, name: true, iban: true, phone: true }
    });

    return NextResponse.json({ success: true, message: 'Profil başarıyla güncellendi.', user: updatedUser }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Güncelleme başarısız.' }, { status: 500 });
  }
}
