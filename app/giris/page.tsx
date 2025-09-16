'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function GirisPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setMessage('Lütfen e-posta ve şifrenizi girin');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      // Gerçek backend'e gönder
      const response = await fetch('/api/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage('Giriş başarılı! Yönlendiriliyorsunuz...');
        
        // Yönlendirme
        setTimeout(() => {
          window.location.href = result.redirect || '/dashboard';
        }, 1500);
      } else {
        setMessage(result.message || 'Giriş başarısız');
      }
    } catch (error) {
      setMessage('Bağlantı hatası. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          
          {/* Başlık */}
          <div className="text-center mb-8">
            <div className="text-3xl font-bold text-[#1B365D] mb-2" style={{fontFamily: 'Pacifico, serif'}}>
              logo
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Üye Girişi</h2>
            <p className="text-gray-600">E-posta ve şifrenizle giriş yapın</p>
          </div>

          {/* Giriş Formu */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Mesaj */}
              {message && (
                <div className={`p-3 rounded-lg text-sm ${
                  message.includes('başarılı') 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {message}
                </div>
              )}

              {/* E-posta */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B365D] focus:border-transparent"
                  placeholder="ornek@email.com"
                  disabled={isLoading}
                />
              </div>

              {/* Şifre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şifre
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B365D] focus:border-transparent"
                  placeholder="Şifrenizi girin"
                  disabled={isLoading}
                />
              </div>

              {/* Giriş Butonu */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1B365D] text-white py-3 px-4 rounded-lg hover:bg-[#2C5F7D] font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Giriş yapılıyor...
                  </>
                ) : (
                  'Giriş Yap'
                )}
              </button>
            </form>

            {/* Şifremi Unuttum */}
            <div className="text-center mt-4">
              <Link href="/sifremi-unuttum" className="text-sm text-[#1B365D] hover:text-[#D4AF37] cursor-pointer">
                Şifremi unuttum
              </Link>
            </div>
          </div>

          {/* Üye Ol Linki */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Hesabınız yok mu?{' '}
              <Link href="/kayit-ol" className="text-[#1B365D] hover:text-[#D4AF37] font-medium cursor-pointer">
                Hemen üye olun
              </Link>
            </p>
          </div>

          {/* Güvenlik Bilgisi */}
          <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
            <div className="flex items-center mb-3">
              <i className="ri-shield-check-line w-5 h-5 flex items-center justify-center mr-2 text-green-600"></i>
              <h3 className="text-lg font-semibold text-gray-900">Güvenli Giriş</h3>
            </div>
            <div className="text-sm text-gray-600">
              Bilgileriniz SSL şifreleme ile korunmaktadır.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}