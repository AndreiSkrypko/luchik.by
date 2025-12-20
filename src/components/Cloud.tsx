interface CloudProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Cloud = ({ className = '', size = 'md' }: CloudProps) => {
  const sizeClasses = {
    sm: 'w-24 h-12',
    md: 'w-40 h-20',
    lg: 'w-56 h-28',
    xl: 'w-80 h-40',
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <div className="absolute bottom-0 left-[10%] w-[35%] h-[70%] bg-cloud rounded-full" />
      <div className="absolute bottom-0 left-[30%] w-[45%] h-[90%] bg-cloud rounded-full" />
      <div className="absolute bottom-0 left-[55%] w-[40%] h-[75%] bg-cloud rounded-full" />
      <div className="absolute bottom-0 left-0 w-full h-[50%] bg-cloud rounded-full" />
    </div>
  );
};

export default Cloud;
