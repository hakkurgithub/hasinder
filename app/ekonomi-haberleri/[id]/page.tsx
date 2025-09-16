
import EkonomiHaberDetay from './EkonomiHaberDetay';

export async function generateStaticParams() {
  // Sadece temel ID'leri oluştur
  const staticParams = [];
  
  // 1-100 arası basit ID'ler
  for (let i = 1; i <= 100; i++) {
    staticParams.push({ id: i.toString() });
  }
  
  // Timestamp tabanlı ID'ler için sınırlı sayıda örnek
  const currentTimestamp = Date.now();
  for (let i = 0; i < 50; i++) {
    staticParams.push({ id: (currentTimestamp + i).toString() });
  }
  
  return staticParams;
}

export default function EkonomiHaberPage({ params }: { params: { id: string } }) {
  return <EkonomiHaberDetay haberId={params.id} />;
}
