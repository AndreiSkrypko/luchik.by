const Bee = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 80" className="w-full h-full">
        {/* Wings */}
        <ellipse cx="35" cy="25" rx="18" ry="12" fill="rgba(255,255,255,0.7)" stroke="#333" strokeWidth="1" />
        <ellipse cx="45" cy="20" rx="15" ry="10" fill="rgba(255,255,255,0.7)" stroke="#333" strokeWidth="1" />
        
        {/* Body */}
        <ellipse cx="50" cy="45" rx="25" ry="20" fill="#FFD700" />
        
        {/* Stripes */}
        <path d="M30 40 Q50 35 70 40 Q70 50 50 48 Q30 50 30 40" fill="#333" />
        <path d="M32 52 Q50 48 68 52 Q68 62 50 60 Q32 62 32 52" fill="#333" />
        
        {/* Head */}
        <circle cx="50" cy="25" r="12" fill="#333" />
        
        {/* Eyes */}
        <circle cx="45" cy="23" r="4" fill="white" />
        <circle cx="55" cy="23" r="4" fill="white" />
        <circle cx="46" cy="24" r="2" fill="#333" />
        <circle cx="56" cy="24" r="2" fill="#333" />
        
        {/* Antennae */}
        <path d="M43 15 Q40 5 35 3" stroke="#333" strokeWidth="2" fill="none" />
        <path d="M57 15 Q60 5 65 3" stroke="#333" strokeWidth="2" fill="none" />
        <circle cx="35" cy="3" r="3" fill="#333" />
        <circle cx="65" cy="3" r="3" fill="#333" />
        
        {/* Stinger */}
        <path d="M50 65 L50 75" stroke="#333" strokeWidth="3" />
      </svg>
    </div>
  );
};

export default Bee;
