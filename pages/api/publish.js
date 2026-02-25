/**
 * Hatay Sanayici Veri Havuzu - Yayınlama API'si
 */

import { publishToAll } from '../../lib/services/socialPublisher';

export default async function handler(req, res) {
  // Sadece POST isteklerine izin ver
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // İstek gövdesinden verileri al
    const { message, link, title, videoPath } = req.body;

    // Basit doğrulama
    if (!message) {
      return res.status(400).json({ success: false, error: 'Mesaj içeriği zorunludur.' });
    }

    console.log("��� API İsteği Alındı:", message);

    // Servisi Tetikle
    const results = await publishToAll({
      message,
      link,
      title,
      videoPath
    });

    // Başarılı yanıt dön
    res.status(200).json({
      success: true,
      data: results
    });

  } catch (error) {
    console.error("API Hatası:", error);
    res.status(500).json({ 
      success: false, 
      error: 'Sunucu tarafında bir hata oluştu.',
      details: error.message 
    });
  }
}