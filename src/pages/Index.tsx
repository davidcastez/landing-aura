import HeroSection from "@/components/HeroSection";
import FooterSection from "@/components/FooterSection";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground font-body">
    {/* Top qualifier banner */}
    <div className="w-full bg-primary text-primary-foreground text-center px-4 py-3 sm:py-4">
      <p className="font-display text-base sm:text-xl md:text-2xl font-bold uppercase tracking-wide leading-snug">
        Agentes inmobiliarios y Agencias esto es para ustedes...
      </p>
    </div>
    <HeroSection />
    <FooterSection />
  </div>
);

export default Index;
