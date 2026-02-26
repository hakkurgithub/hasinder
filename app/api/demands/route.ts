import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Tüm talepleri listeleme
export async function GET() {
  try {
    const demands = await prisma.demand.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        creator: {
          select: { name: true, sector: true }
        }
      }
    });
    return NextResponse.json(demands, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Talepler çekilirken hata oluştu.' }, { status: 500 });
  }
}

// Yeni talep oluşturma
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, amount, sector, creatorId } = body;

    if (!title || !amount || !sector || !creatorId) {
      return NextResponse.json({ error: 'Tüm alanları doldurmanız zorunludur.' }, { status: 400 });
    }

    const newDemand = await prisma.demand.create({
      data: { title, amount, sector, creatorId }
    });

    return NextResponse.json({ success: true, demand: newDemand }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Talep açılamadı: ' + error.message }, { status: 500 });
  }
}
