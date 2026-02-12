"use client";

interface ElectricTextProps {
  children: React.ReactNode;
  className?: string;
}

const electricStyles = `
  @keyframes electricCharge {
    0%, 100% {
      color: #FFD700;
      text-shadow: 
        0 0 5px rgba(255, 215, 0, 0.4),
        0 0 10px rgba(255, 215, 0, 0.3),
        0 0 15px rgba(255, 215, 0, 0.2),
        0 0 20px rgba(255, 215, 0, 0.15);
      filter: brightness(1.1);
      transform: scale(1);
    }
    50% {
      color: #FFEB3B;
      text-shadow: 
        0 0 8px rgba(255, 215, 0, 0.6),
        0 0 15px rgba(255, 215, 0, 0.5),
        0 0 25px rgba(255, 215, 0, 0.4),
        0 0 35px rgba(255, 215, 0, 0.3),
        0 0 45px rgba(255, 215, 0, 0.2);
      filter: brightness(1.3);
      transform: scale(1.01);
    }
    25%, 75% {
      color: #FFD700;
      text-shadow: 
        0 0 6px rgba(255, 215, 0, 0.5),
        0 0 12px rgba(255, 215, 0, 0.4),
        0 0 18px rgba(255, 215, 0, 0.3);
      filter: brightness(1.2);
      transform: scale(1.005);
    }
  }

  .electric-text-animated {
    display: inline-block;
    animation: electricCharge 60s ease-in-out infinite;
    will-change: transform, filter, text-shadow;
  }
`;

export function ElectricText({ children, className = "" }: ElectricTextProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: electricStyles }} />
      <span className={`electric-text-animated ${className}`}>
        {children}
      </span>
    </>
  );
}
