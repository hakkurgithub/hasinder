'use client';

import CompanyDetail from './CompanyDetail';
import { use } from 'react';

export default function CompanyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return <CompanyDetail companyId={resolvedParams.id} />;
}