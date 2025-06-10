import HeroSection from "../components/HeroSection";
import SearchContainer from "../components/SearchContainer";
import MapSection from "../components/MapSection";
import ToolsSections from '../components/ToolsSection';
import Faqs from '../components/Faqs';

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
