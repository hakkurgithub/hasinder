
'use client';

import { useState } from 'react';

export default function EtkinliklerPage() {
  const [activeFilter, setActiveFilter] = useState('tumu');

  const events = [
    {
      id: 1,
      title: "Hatay Girişimcilik Zirvesi 2024",
      date: "15 Mart 2024",
      time: "09:00 - 17:00",
      location: "Antakya Teknokent",
      category: "zirve",
      image: "https://readdy.ai/api/search-image?query=Modern%20business%20conference%20hall%20with%20entrepreneurs%20networking%2C%20professional%20lighting%2C%20people%20in%20business%20attire%20discussing%20projects%2C%20warm%20atmosphere%2C%20corporate%20event%20setting&width=400&height=300&seq=event1&orientation=landscape",
      attendees: 250,
      price: "Ücretsiz",
      description: "Bölgenin en büyük girişimcilik etkinliği. Yatırımcılar, mentorlar ve girişimciler bir araya geliyor."
    },
    {
      id: 2,
      title: "Yatırım Fırsatları Semineri",
      date: "22 Mart 2024",
      time: "14:00 - 16:00",
      location: "MKÜ Konferans Salonu",
      category: "seminer",
      image: "https://readdy.ai/api/search-image?query=Professional%20seminar%20room%20with%20business%20presentation%2C%20investors%20listening%20to%20speaker%2C%20modern%20meeting%20space%2C%20economic%20charts%20and%20graphs%20displayed&width=400&height=300&seq=event2&orientation=landscape",
      attendees: 80,
      price: "₺150",
      description: "Hatay'daki yatırım fırsatları ve sektörel analizler üzerine uzman sunumları."
    },
    {
      id: 3,
      title: "Teknoloji ve İnovasyon Fuarı",
      date: "5 Nisan 2024",
      time: "10:00 - 18:00",
      location: "Antakya Fuar Merkezi",
      category: "fuar",
      image: "https://readdy.ai/api/search-image?query=Technology%20innovation%20fair%20with%20modern%20exhibition%20booths%2C%20digital%20displays%20showing%20tech%20products%2C%20visitors%20exploring%20innovative%20solutions%2C%20bright%20expo%20lighting&width=400&height=300&seq=event3&orientation=landscape",
      attendees: 500,
      price: "₺75",
      description: "Yenilikçi teknolojiler ve startup'ların tanıtıldığı kapsamlı fuar etkinliği."
    },
    {
      id: 4,
      title: "İş Geliştirme Workshopu",
      date: "12 Nisan 2024",
      time: "13:00 - 17:00",
      location: "Business Center Hatay",
      category: "workshop",
      image: "https://readdy.ai/api/search-image?query=Interactive%20business%20workshop%20with%20participants%20working%20in%20groups%2C%20modern%20training%20room%2C%20professional%20facilitator%20leading%20session%2C%20collaborative%20atmosphere&width=400&height=300&seq=event4&orientation=landscape",
      attendees: 40,
      price: "₺200",
      description: "Pratik iş geliştirme stratejileri ve networking teknikleri üzerine interaktif workshop."
    },
    {
      id: 5,
      title: "Kadın Girişimciler Buluşması",
      date: "20 Nisan 2024",
      time: "15:00 - 18:00",
      location: "Hatay Kadın Kooperatifi",
      category: "bulusma",
      image: "https://readdy.ai/api/search-image?query=Women%20entrepreneurs%20meeting%20in%20modern%20conference%20room%2C%20professional%20women%20discussing%20business%20ideas%2C%20inspiring%20networking%20event%2C%20warm%20welcoming%20atmosphere&width=400&height=300&seq=event5&orientation=landscape",
      attendees: 60,
      price: "Ücretsiz",
      description: "Kadın girişimcilerin deneyim paylaşımı ve networking etkinliği."
    },
    {
      id: 6,
      title: "Dijital Pazarlama Semineri",
      date: "28 Nisan 2024",
      time: "10:00 - 12:00",
      location: "Online & Hibrit",
      category: "seminer",
      image: "https://readdy.ai/api/search-image?query=Digital%20marketing%20seminar%20with%20presenter%20showing%20social%20media%20analytics%2C%20modern%20presentation%20screen%2C%20audience%20taking%20notes%2C%20professional%20learning%20environment&width=400&height=300&seq=event6&orientation=landscape",
      attendees: 120,
      price: "₺100",
      description: "Sosyal medya pazarlama ve dijital stratejiler konulu uzman semineri."
    }
  ];

  const categories = [
    { id: 'tumu', name: 'Tümü', count: events.length },
    { id: 'zirve', name: 'Zirveler', count: events.filter(e => e.category === 'zirve').length },
    { id: 'seminer', name: 'Seminerler', count: events.filter(e => e.category === 'seminer').length },
    { id: 'fuar', name: 'Fuarlar', count: events.filter(e => e.category === 'fuar').length },
    { id: 'workshop', name: 'Workshop', count: events.filter(e => e.category === 'workshop').length },
    { id: 'bulusma', name: 'Buluşmalar', count: events.filter(e => e.category === 'bulusma').length }
  ];

  const filteredEvents = activeFilter === 'tumu' 
    ? events 
    : events.filter(event => event.category === activeFilter);

  const handleEventRegister = (eventId: number) => {
    alert(`Etkinlik kaydınız alındı! Etkinlik ID: ${eventId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1B365D] to-[#2C5F7D] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Etkinlikler</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Hatay'da düzenlenen iş birliği etkinlikleri, seminerler ve networking fırsatlarını keşfedin
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  activeFilter === category.id
                    ? 'bg-[#1B365D] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-[#1B365D] mb-2">24</div>
            <div className="text-gray-600">Bu Ay</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-[#D4AF37] mb-2">1,250</div>
            <div className="text-gray-600">Katılımcı</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
            <div className="text-gray-600">Memnuniyet</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">156</div>
            <div className="text-gray-600">Toplam Etkinlik</div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover object-top"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#D4AF37] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {event.price}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    {event.attendees} kişi
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="ri-calendar-line w-4 h-4 flex items-center justify-center mr-2 text-[#1B365D]"></i>
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="ri-time-line w-4 h-4 flex items-center justify-center mr-2 text-[#1B365D]"></i>
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center mr-2 text-[#1B365D]"></i>
                    {event.location}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleEventRegister(event.id)}
                    className="bg-[#1B365D] text-white px-4 py-2 rounded-lg hover:bg-[#2C5F7D] font-medium whitespace-nowrap cursor-pointer flex-1 mr-2"
                  >
                    Kayıt Ol
                  </button>
                  <button className="p-2 text-gray-400 hover:text-[#D4AF37] cursor-pointer">
                    <i className="ri-share-line w-5 h-5 flex items-center justify-center"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="bg-gradient-to-r from-[#1B365D] to-[#2C5F7D] rounded-xl p-8 text-center text-white mt-16">
          <h3 className="text-2xl font-bold mb-2">Etkinlik Bildirimlerini Kaçırmayın</h3>
          <p className="text-blue-100 mb-6">Yeni etkinlikler hakkında ilk siz haberdar olun</p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
            />
            <button className="bg-[#D4AF37] hover:bg-[#B8941F] px-6 py-3 rounded-r-lg font-medium whitespace-nowrap cursor-pointer">
              Abone Ol
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
