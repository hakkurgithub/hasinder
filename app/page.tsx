
'use client';

import { useState } from 'react';
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import PlatformFeatures from './PlatformFeatures';
import OpportunitiesSlider from './OpportunitiesSlider';
import MembershipPlans from './MembershipPlans';
import AboutSection from './AboutSection';
import MissionVision from './MissionVision';
import BusinessStats from './BusinessStats';
import SuccessStories from './SuccessStories';
import MembershipModal from '../components/MembershipModal';

export default function Home() {
  const [showMembershipModal, setShowMembershipModal] = useState(false);

  const openMembershipModal = () => {
    setShowMembershipModal(true);
  };

  return (
    <main className="min-h-screen">
      <div className="pt-16">
        {/* Hero Section */}
        <HeroSection onMembershipClick={openMembershipModal} />
        <StatsSection />
        <PlatformFeatures />
        <OpportunitiesSlider />
        <div id="uyelik">
          <MembershipPlans />
        </div>
        <div id="hakkimizda">
          {/* About Section */}
          <AboutSection />
        </div>
        <MissionVision />
        <BusinessStats />
        <SuccessStories />
      </div>

      <MembershipModal 
        isOpen={showMembershipModal} 
        onClose={() => setShowMembershipModal(false)} 
      />
    </main>
  );
}
