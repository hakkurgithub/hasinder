import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { demandId, mediatorId, sellerTaxNo, proposedPrice } = body;

    if (!demandId || !mediatorId || !sellerTaxNo || !proposedPrice) {
      return NextResponse.json({ error: 'Lütfen tüm alanları doldurun.' }, { status: 400 });
    }

    // 1. Satıcının platformda kayıtlı olup olmadığını Vergi Numarasından kontrol et
    const seller = await prisma.user.findUnique({
      where: { taxNo: sellerTaxNo }
    });

    if (!seller) {
      return NextResponse.json({ error: 'Girdiğiniz Vergi Numarasına ait bir satıcı sistemde bulunamadı. Lütfen önce tedarikçinizin platforma resmi kaydını yapmasını sağlayın.' }, { status: 404 });
    }

    if (seller.id === mediatorId) {
      return NextResponse.json({ error: 'Kendi kendinize aracılık yapamazsınız.' }, { status: 400 });
    }

    // 2. Komisyon Hesaplama (Örn: Toplam tutarın %2'si Aracıya)
    const priceValue = parseFloat(proposedPrice);
    if (isNaN(priceValue) || priceValue <= 0) {
      return NextResponse.json({ error: 'Lütfen geçerli bir teklif tutarı girin.' }, { status: 400 });
    }
    const commissionAmount = priceValue * 0.02; // %2 Bilgi Komisyonu

    // 3. Eşleştirmeyi (Mediation) Veritabanına Kaydet
    const mediation = await prisma.mediation.create({
      data: {
        demandId,
        mediatorId,
        sellerId: seller.id,
        commissionAmount,
        status: 'BEKLEMEDE' // Yönetim veya Alıcı onayına sunulacak
      }
    });

    // 4. Talebin durumunu 'ESLESTI' olarak güncelle
    await prisma.demand.update({
      where: { id: demandId },
      data: { status: 'ESLESTI' }
    });

    return NextResponse.json({ 
      success: true, 
      message: `✅ Eşleştirme Başarılı! İşlem tamamlandığında hesabınıza ₺${commissionAmount.toFixed(2)} komisyon yatırılacaktır.` 
    }, { status: 201 });

  } catch (error: any) {
    console.error('Eşleştirme Hatası:', error);
    return NextResponse.json({ error: 'Sistemsel bir hata oluştu: ' + error.message }, { status: 500 });
  }
}
