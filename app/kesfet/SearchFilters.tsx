
'use client';

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedSector: string;
  setSelectedSector: (sector: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  sectors: string[];
  locations: string[];
}

export default function SearchFilters({
  searchTerm,
  setSearchTerm,
  selectedSector,
  setSelectedSector,
  selectedLocation,
  setSelectedLocation,
  sectors,
  locations
}: SearchFiltersProps) {
  return (
    <section className="bg-white shadow-sm border-b border-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <i className="ri-search-line w-5 h-5 flex items-center justify-center absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Firma adı veya açıklama ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B365D] focus:border-transparent text-sm"
                suppressHydrationWarning={true}
              />
            </div>
          </div>

          {/* Sector Filter */}
          <div className="lg:w-48">
            <div className="relative">
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-[#1B365D] focus:border-transparent text-sm cursor-pointer"
                suppressHydrationWarning={true}
              >
                {sectors.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector === 'Tümü' ? 'Tüm Sektörler' : sector}
                  </option>
                ))}
              </select>
              <i className="ri-arrow-down-s-line w-4 h-4 flex items-center justify-center absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            </div>
          </div>

          {/* Location Filter */}
          <div className="lg:w-48">
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-[#1B365D] focus:border-transparent text-sm cursor-pointer"
                suppressHydrationWarning={true}
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location === 'Tümü' ? 'Tüm Şehirler' : location}
                  </option>
                ))}
              </select>
              <i className="ri-arrow-down-s-line w-4 h-4 flex items-center justify-center absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            </div>
          </div>

          {/* Clear Filters */}
          {(searchTerm || selectedSector !== 'Tümü' || selectedLocation !== 'Tümü') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSector('Tümü');
                setSelectedLocation('Tümü');
              }}
              className="lg:w-auto px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium whitespace-nowrap cursor-pointer"
              suppressHydrationWarning={true}
            >
              Filtreleri Temizle
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
