import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const pendingMediations = await prisma.mediation.findMany({
      where: { status: 'BEKLEMEDE' },
      include: {
        demand: { select: { title: true } },
        mediator: { select: { name: true } },
        seller: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(pendingMediations, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Eşleşmeler çekilemedi.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { mediationId } = await request.json();
    if (!mediationId) return NextResponse.json({ error: 'Eksik veri.' }, { status: 400 });

    // 1. Eşleşmeyi ONAYLANDI yap
    const mediation = await prisma.mediation.update({
      where: { id: mediationId },
      data: { status: 'ONAYLANDI' }
    });

    // 2. Komisyon tutarını aracının (Ahmet'in) cüzdanına ekle (Gerçek Para Transferi Simülasyonu)
    await prisma.user.update({
      where: { id: mediation.mediatorId },
      data: { balance: { increment: mediation.commissionAmount } }
    });

    // 3. Talebi TAMAMLANDI yap
    await prisma.demand.update({
      where: { id: mediation.demandId },
      data: { status: 'TAMAMLANDI' }
    });

    return NextResponse.json({ success: true, message: 'Komisyon dağıtıldı ve ticaret tamamlandı.' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'İşlem başarısız.' }, { status: 500 });
  }
}
