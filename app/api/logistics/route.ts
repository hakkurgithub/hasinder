import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const routes = await prisma.logisticsRoute.findMany({
      where: { status: 'AKTIF' },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(routes, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Lojistik rotaları çekilirken hata oluştu.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { origin, destination, vehicleType, capacity, targetPrice } = body;

    if (!origin || !destination || !vehicleType || !capacity) {
      return NextResponse.json({ error: 'Lütfen zorunlu lojistik alanlarını doldurun.' }, { status: 400 });
    }

    const priceValue = targetPrice ? parseFloat(targetPrice) : null;

    const newRoute = await prisma.logisticsRoute.create({
      data: {
        origin,
        destination,
        vehicleType,
        capacity,
        targetPrice: priceValue,
        status: 'AKTIF'
      }
    });

    return NextResponse.json({ success: true, route: newRoute }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Rota oluşturulamadı: ' + error.message }, { status: 500 });
  }
}
