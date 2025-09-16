
'use client';

import { useState } from 'react';

interface Company {
  id: number;
  name: string;
  email: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company;
}

export default function ContactModal({ isOpen, onClose, company }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate message length before submission
    if (formData.message.length > 500) {
      setSubmitStatus('error');
      setSubmitMessage('Mesaj 500 karakteri aşamaz.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      // Submit form data using application/x-www-form-urlencoded encoding format
      const formDataToSend = new URLSearchParams();
      formDataToSend.append('company_name', company.name);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone || 'Belirtilmemiş');
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('timestamp', new Date().toISOString());

      const response = await fetch('https://readdy.ai/api/form/d1sdru982bnvqr3eodng', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataToSend.toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Mesajınız başarıyla gönderildi!');
        // Reset form data on success
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
        setSubmitMessage('Form gönderiminde sorun yaşandı, lütfen tekrar deneyin.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Bağlantı hatası oluştu, lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Limit textarea to 500 characters
    if (name === 'message' && value.length > 500) {
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error status when user starts typing
    if (submitStatus === 'error') {
      setSubmitStatus('idle');
      setSubmitMessage('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {company.name} ile İletişim
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <i className="ri-close-line w-5 h-5 flex items-center justify-center"></i>
            </button>
          </div>

          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-4">
                <i className="ri-check-line w-8 h-8 flex items-center justify-center text-green-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Mesajınız Gönderildi!
              </h3>
              <p className="text-gray-600 mb-6">
                {company.name} firması en kısa sürede size dönüş yapacaktır.
              </p>
              <button
                onClick={onClose}
                className="bg-[#1B365D] text-white px-6 py-2 rounded-lg hover:bg-[#2E5984] transition-colors cursor-pointer"
              >
                Tamam
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} id="contact-form" data-readdy-form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adınız Soyadınız *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1B365D] focus:border-transparent disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1B365D] focus:border-transparent disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1B365D] focus:border-transparent disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konu *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1B365D] focus:border-transparent disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mesajınız *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  maxLength={500}
                  rows={4}
                  disabled={isSubmitting}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1B365D] focus:border-transparent resize-none disabled:opacity-50"
                  placeholder="Mesajınızı buraya yazın... (maksimum 500 karakter)"
                />
                <div className="flex justify-between items-center mt-1">
                  <div className={`text-xs ${formData.message.length >= 500 ? 'text-red-500' : 'text-gray-500'}`}>
                    {formData.message.length}/500 karakter
                  </div>
                  {formData.message.length >= 500 && (
                    <div className="text-xs text-red-500">
                      Karakter limiti aşıldı
                    </div>
                  )}
                </div>
              </div>

              {/* Display submission status feedback on the current page */}
              {submitMessage && (
                <div className={`rounded-lg p-3 ${
                  submitStatus === 'error' 
                    ? 'bg-red-50 border border-red-200' 
                    : 'bg-green-50 border border-green-200'
                }`}>
                  <p className={`text-sm ${
                    submitStatus === 'error' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {submitMessage}
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium cursor-pointer disabled:opacity-50"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || formData.message.length > 500}
                  className="flex-1 bg-[#1B365D] text-white py-2 rounded-lg hover:bg-[#2E5984] transition-colors font-medium disabled:opacity-50 cursor-pointer whitespace-nowrap"
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                </button>
              </div>

              {/* Contact info */}
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2 text-blue-700 text-sm">
                  <i className="ri-information-line w-4 h-4 flex items-center justify-center"></i>
                  <span>Mesajınız güvenli bir şekilde gönderilecektir.</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
