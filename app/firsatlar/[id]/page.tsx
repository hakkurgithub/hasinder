'use client';

import SmartFarmDetail from './SmartFarmDetail';
import { use } from 'react';

export default function OpportunityPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return <SmartFarmDetail opportunityId={resolvedParams.id} />;
}