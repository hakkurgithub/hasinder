
'use client';

import Link from 'next/link';

interface Company {
  id: number;
  name: string;
  logo: string;
  description: string;
  sector: string;
  location: string;
  phone: string;
  email: string;
  website: string;
  socialLinks: {
    [key: string]: string;
  };
}

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="p-6">
        {/* Logo and Header */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="flex-shrink-0">
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="w-16 h-16 rounded-lg object-cover bg-gray-50"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
              {company.name}
            </h3>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <span className="bg-[#D4AF37]/10 text-[#B8941F] px-2 py-1 rounded-full font-medium">
                {company.sector}
              </span>
              <div className="flex items-center">
                <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center mr-1"></i>
                {company.location}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {company.description}
        </p>

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <i className="ri-phone-line w-4 h-4 flex items-center justify-center mr-2 text-gray-400"></i>
            <span className="truncate">{company.phone}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <i className="ri-mail-line w-4 h-4 flex items-center justify-center mr-2 text-gray-400"></i>
            <span className="truncate">{company.email}</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {company.socialLinks.linkedin && (
              <a
                href={company.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-[#0077B5] text-gray-600 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <i className="ri-linkedin-fill w-4 h-4 flex items-center justify-center"></i>
              </a>
            )}
            {company.socialLinks.twitter && (
              <a
                href={company.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-[#1DA1F2] text-gray-600 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <i className="ri-twitter-fill w-4 h-4 flex items-center justify-center"></i>
              </a>
            )}
            {company.socialLinks.instagram && (
              <a
                href={company.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 text-gray-600 hover:text-white rounded-lg transition-all cursor-pointer"
              >
                <i className="ri-instagram-fill w-4 h-4 flex items-center justify-center"></i>
              </a>
            )}
            {company.socialLinks.facebook && (
              <a
                href={company.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-[#4267B2] text-gray-600 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <i className="ri-facebook-fill w-4 h-4 flex items-center justify-center"></i>
              </a>
            )}
          </div>

          <Link
            href={`/kesfet/${company.id}`}
            className="bg-[#1B365D] text-white px-4 py-2 rounded-lg hover:bg-[#2E5984] transition-colors text-sm font-medium whitespace-nowrap cursor-pointer"
          >
            Detayları Gör
          </Link>
        </div>
      </div>
    </div>
  );
}
