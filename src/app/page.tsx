'use client'

import dynamic from 'next/dynamic'
import HeroSection from "../components/HeroSection";
import SearchContainer from "../components/SearchContainer";
import ToolsSections from '../components/ToolsSection';
import Faqs from '../components/Faqs';


const MapSection = dynamic(() => import('@/src/components/MapSection'), {
    ssr: false,
  })

export default function Home() {
  return (
    <div>
      <HeroSection />
      <SearchContainer />
      <MapSection />
      <ToolsSections />
      <Faqs />
    </div>
  );
}
