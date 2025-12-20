import Cloud from './Cloud';
import Sun from './Sun';
import Bee from './Bee';
import Ladybug from './Ladybug';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen gradient-sky overflow-hidden pt-20">
      {/* Sun */}
      <Sun />
      
      {/* Decorative Clouds */}
      <Cloud 
        size="lg" 
        className="absolute top-24 left-4 md:left-10 animate-float opacity-90" 
      />
      <Cloud 
        size="md" 
        className="absolute top-40 right-20 md:right-40 animate-float-delayed opacity-80 hidden sm:block" 
      />
      <Cloud 
        size="sm" 
        className="absolute top-60 left-1/4 animate-float-slow opacity-70 hidden md:block" 
      />
      
      {/* Bee */}
      <Bee className="absolute left-4 md:left-20 bottom-48 md:bottom-60 w-20 h-16 md:w-28 md:h-24 animate-float-slow" />
      
      {/* Content */}
      <div className="container mx-auto px-4 pt-20 md:pt-32 lg:pt-40 pb-40 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-text-navy leading-tight mb-6">
            Детский центр
            <br />
            современных знаний
          </h1>
          
          {/* Subtitle with Ladybug */}
          <div className="relative inline-block mb-10">
            <p className="text-lg sm:text-xl md:text-2xl text-text-navy/80 max-w-2xl mx-auto pr-12 md:pr-16">
              Откройте мир технологий и креативности
              <br />
              вашего ребёнка!
            </p>
            <Ladybug className="absolute right-0 md:-right-4 top-0 w-10 h-10 md:w-14 md:h-14 animate-wiggle" />
          </div>
          
          {/* CTA Button */}
          <button className="btn-cta text-base sm:text-lg md:text-xl">
            ОСТАВИТЬ ЗАЯВКУ
          </button>
        </div>
      </div>
      
      {/* Bottom Clouds Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        {/* Large clouds at bottom */}
        <div className="relative h-32 md:h-48">
          <Cloud size="xl" className="absolute -bottom-10 -left-20 md:-left-10" />
          <Cloud size="lg" className="absolute -bottom-8 left-20 md:left-40" />
          <Cloud size="xl" className="absolute -bottom-12 left-1/3" />
          <Cloud size="lg" className="absolute -bottom-6 left-1/2" />
          <Cloud size="xl" className="absolute -bottom-10 right-1/4" />
          <Cloud size="lg" className="absolute -bottom-8 right-10" />
          <Cloud size="xl" className="absolute -bottom-12 -right-20 md:-right-10" />
        </div>
        
        {/* Solid cloud base */}
        <div className="h-16 md:h-24 bg-cloud" />
      </div>
    </section>
  );
};

export default HeroSection;
