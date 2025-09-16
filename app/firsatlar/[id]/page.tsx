
import SmartFarmDetail from './SmartFarmDetail';

// Static export için gerekli mock data
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: 'akilli-tarim' },
    { id: 'gunes-enerjisi' },
    { id: 'fintech-cozum' },
    { id: 'surdurulebilir-ambalaj' },
    { id: 'saglik-teknoloji' }
  ];
}

export default function OpportunityPage({ params }: { params: { id: string } }) {
  return <SmartFarmDetail opportunityId={params.id} />;
}
