import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('API: Haberler getiriliyor...');
    
    const haberler = await prisma.haber.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    console.log('API: Bulunan haber sayısı:', haberler.length);
    
    return NextResponse.json(haberler);
  } catch (error) {
    console.error('API Hatası:', error);
    return NextResponse.json({ 
      error: 'Haberler yüklenemedi',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { baslik, icerik, resim } = await request.json();
    
    console.log('API: Yeni haber ekleniyor:', { baslik });
    
    const haber = await prisma.haber.create({
      data: {
        baslik,
        icerik,
        resim: resim || null
      }
    });
    
    console.log('API: Haber eklendi:', haber.id);
    
    return NextResponse.json({ message: 'Haber başarıyla eklendi', haber }, { status: 201 });
  } catch (error) {
    console.error('API Hatası (POST):', error);
    return NextResponse.json({ 
      error: 'Haber eklenemedi',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 });
  }
}