const Ladybug = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 80 80" className="w-full h-full">
        {/* Body */}
        <ellipse cx="40" cy="45" rx="28" ry="25" fill="#E53935" />
        
        {/* Center line */}
        <line x1="40" y1="22" x2="40" y2="70" stroke="#333" strokeWidth="3" />
        
        {/* Spots */}
        <circle cx="28" cy="38" r="6" fill="#333" />
        <circle cx="52" cy="38" r="6" fill="#333" />
        <circle cx="25" cy="55" r="5" fill="#333" />
        <circle cx="55" cy="55" r="5" fill="#333" />
        <circle cx="40" cy="50" r="4" fill="#333" />
        
        {/* Head */}
        <circle cx="40" cy="22" r="12" fill="#333" />
        
        {/* Eyes */}
        <circle cx="35" cy="20" r="4" fill="white" />
        <circle cx="45" cy="20" r="4" fill="white" />
        <circle cx="36" cy="21" r="2" fill="#333" />
        <circle cx="46" cy="21" r="2" fill="#333" />
        
        {/* Antennae */}
        <path d="M35 12 Q32 5 28 3" stroke="#333" strokeWidth="2" fill="none" />
        <path d="M45 12 Q48 5 52 3" stroke="#333" strokeWidth="2" fill="none" />
        <circle cx="28" cy="3" r="2" fill="#333" />
        <circle cx="52" cy="3" r="2" fill="#333" />
      </svg>
    </div>
  );
};

export default Ladybug;
