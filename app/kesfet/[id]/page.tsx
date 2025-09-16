
import CompanyDetail from './CompanyDetail';

// Static export için gerekli mock data
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: 'agrotech' },
    { id: 'solarmax' },
    { id: 'fintech-pro' },
    { id: 'ecogreen' },
    { id: 'medtech' },
    { id: 'cloudsoft' },
    { id: 'techflow' }
  ];
}

export default function CompanyPage({ params }: { params: { id: string } }) {
  return <CompanyDetail companyId={params.id} />;
}
