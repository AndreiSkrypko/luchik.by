const Sun = () => {
  return (
    <div className="absolute -top-20 right-0 md:right-10 lg:right-20 w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72">
      {/* Sun rays */}
      <div className="absolute inset-0 animate-sun-rays">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-2 md:w-3 h-16 md:h-24 bg-gradient-to-t from-sun-yellow to-transparent origin-bottom"
            style={{
              transform: `translateX(-50%) rotate(${i * 30}deg)`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>
      
      {/* Sun body */}
      <div className="absolute inset-8 md:inset-12 lg:inset-16 rounded-full sun-glow animate-pulse-soft" />
      
      {/* Sun face */}
      <div className="absolute inset-8 md:inset-12 lg:inset-16 rounded-full bg-gradient-to-br from-sun-yellow via-sun-yellow to-sun-orange flex items-center justify-center">
        {/* Eyes */}
        <div className="absolute top-1/3 left-1/4 w-2 h-3 md:w-3 md:h-4 bg-text-dark rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-2 h-3 md:w-3 md:h-4 bg-text-dark rounded-full" />
        {/* Smile */}
        <div className="absolute bottom-1/3 w-8 md:w-12 h-4 md:h-6 border-b-4 border-text-dark rounded-b-full" />
      </div>
    </div>
  );
};

export default Sun;
