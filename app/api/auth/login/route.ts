import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'E-posta ve şifre zorunludur.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    // Basit doğrulama (Canlıda şifreler hash'li karşılaştırılacak)
    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'Geçersiz e-posta veya şifre.' }, { status: 401 });
    }

    return NextResponse.json({ 
      success: true, 
      user: { id: user.id, name: user.name, role: user.role, sector: user.sector, balance: user.balance } 
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: 'Sunucu hatası: ' + error.message }, { status: 500 });
  }
}
