import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendEmail } from '@/lib/mailer';

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

    // Firmaya Onay/Ret Maili At
    const subject = action === 'APPROVE' ? 'TİB Ağı Üyeliğiniz Onaylandı' : 'TİB Ağı Üyelik Başvurunuz Reddedildi';
    const message = action === 'APPROVE' 
      ? 'Tebrikler, kurumsal siciliniz onaylanmıştır. Sisteme giriş yapıp ticarete ve komisyon kazanmaya başlayabilirsiniz.'
      : 'Üyelik başvurunuz platform standartlarını karşılamadığı için reddedilmiştir.';
    
    await sendEmail(
      updatedUser.email,
      subject,
      `<h2>Yönetim Kurulu Kararı</h2><p>${message}</p>`
    );

    return NextResponse.json({ success: true, user: updatedUser }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'İşlem başarısız.' }, { status: 500 });
  }
}
