import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendEmail } from '@/lib/mailer';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, taxNo, sector, role, email, password } = body;

    // Basit Güvenlik Kontrolü
    if (!name || !taxNo || !email || !password || !sector || !role) {
      return NextResponse.json({ error: 'Tüm B2B alanlarını doldurmanız zorunludur.' }, { status: 400 });
    }

    // Firma Vergi No veya E-posta ile daha önce kayıt olmuş mu?
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { taxNo }]
      }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Bu vergi numarası veya e-posta ile zaten kayıtlı bir firma var.' }, { status: 400 });
    }

    // Yeni Firmayı/Üyeyi Veritabanına Kaydet
    const newUser = await prisma.user.create({
      data: {
        name,
        taxNo,
        sector,
        role,
        email,
        password, // Not: Canlı sürümde bu şifre kriptolanacaktır.
      }
    });

    // Yönetime Bildirim Maili At
    await sendEmail(
      'kurt.hakki@gmail.com',
      'TİB Ağı - Yeni Kurumsal Kayıt Başvurusu',
      `<h2>Yeni Firma Onay Bekliyor</h2><p><b>Firma Adı:</b> ${name}</p><p><b>Vergi No:</b> ${taxNo}</p><p><b>Sektör:</b> ${sector}</p><p>Lütfen Admin panelinden başvuruyu inceleyin.</p>`
    );

    return NextResponse.json({ success: true, message: '✅ Kurumsal Kaydınız Alındı. Yönetim onayından sonra sisteme giriş yapabilirsiniz.' }, { status: 201 });
  } catch (error: any) {
    console.error('Kayıt Hatası:', error);
    return NextResponse.json({ error: 'Sunucu hatası: ' + error.message }, { status: 500 });
  }
}
