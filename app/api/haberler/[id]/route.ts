import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await prisma.haber.delete({
      where: { id }
    });
    
    return NextResponse.json({ message: 'Haber başarıyla silindi' });
  } catch (error) {
    console.error('Haber silinirken hata:', error);
    return NextResponse.json({ error: 'Haber silinemedi' }, { status: 500 });
  }
}