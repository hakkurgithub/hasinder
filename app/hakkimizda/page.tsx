
import AboutSection from '../AboutSection';
import MissionVision from '../MissionVision';
import BusinessStats from '../BusinessStats';

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <AboutSection />
      <MissionVision />
      <BusinessStats />
    </div>
  );
}
