import React, { useState, useEffect } from 'react';

const AestheticLoader = () => {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isSpilling, setIsSpilling] = useState(false);
  const [displayText, setDisplayText] = useState('');
  
  const fullText = 'Loading...';
  
  useEffect(() => {
    setMounted(true);
    let textIndex = 0;
    
    // Text animation
    const textInterval = setInterval(() => {
      if (textIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, textIndex));
        textIndex++;
      } else {
        textIndex = 0;  // Reset for continuous effect
      }
    }, 200);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          setIsComplete(true);
          setTimeout(() => setIsSpilling(true), 250);
          setTimeout(() => setShowContent(false), 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  if (!showContent) return null;

  const generateBubbles = () => {
    const bubbles = [];
    const bubbleCount = 30;
    
    for (let i = 0; i < bubbleCount; i++) {
      const size = Math.random() * 12 + 6;
      const startPosition = Math.random() * 100;
      const animationDuration = Math.random() * 3 + 2;
      const animationDelay = Math.random() * -5;
      const opacity = Math.random() * 0.3 + 0.2;

      bubbles.push({
        size,
        startPosition,
        animationDuration,
        animationDelay,
        opacity,
      });
    }
    return bubbles;
  };

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-50 overflow-hidden transition-colors duration-2000 ease-in-out
        ${isComplete ? 'bg-white' : 'bg-gradient-to-r from-red-500 to-red-700'}`}
    >
      <div 
        className={`absolute inset-0 bg-white transition-opacity duration-2000 ease-in-out ${
          isComplete ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="relative w-96 h-96">
        <div 
          className={`absolute inset-0 rounded-full border-8 border-white/20 overflow-hidden backdrop-blur-xl 
            ${isSpilling ? 'animate-container-spill' : ''}`}
        >
          {/* Water fill - now synced exactly with progress */}
          <div 
            className={`absolute bottom-0 w-full transition-all duration-300 ease-in-out overflow-hidden
              ${isSpilling ? 'animate-water-spill' : ''}`}
            style={{
              height: `${progress}%`,
              background: `linear-gradient(180deg, 
                rgba(255, 255, 255, 0.15) 0%,
                rgba(255, 255, 255, 0.1) 50%,
                rgba(255, 255, 255, 0.05) 100%)`,
              backdropFilter: 'blur(8px)',
            }}
          >
            {/* Enhanced wave layers */}
            <svg className="absolute inset-0 w-full h-40" style={{ bottom: '-20px' }}>
              <defs>
                <linearGradient id="waveGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
                </linearGradient>
              </defs>
              {[...Array(3)].map((_, index) => (
                <path
                  key={index}
                  className={`wave-path-${index}`}
                  fill="url(#waveGradient)"
                  d="M0,40 C100,30 200,50 300,40 C400,30 500,50 600,40 L600,100 L0,100 Z"
                  style={{
                    transform: `translateX(${-index * 20}px)`,
                    opacity: 1 - index * 0.2,
                  }}
                />
              ))}
            </svg>

            {generateBubbles().map((bubble, index) => (
              <div
                key={index}
                className={`absolute ${isSpilling ? 'animate-bubble-spill' : ''}`}
                style={{
                  width: `${bubble.size}px`,
                  height: `${bubble.size}px`,
                  left: `${bubble.startPosition}%`,
                  bottom: '0',
                  animation: `curved-bubble-rise ${bubble.animationDuration}s infinite`,
                  animationDelay: `${bubble.animationDelay}s`,
                }}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, 
                      rgba(255, 255, 255, ${bubble.opacity + 0.2}), 
                      rgba(255, 255, 255, ${bubble.opacity * 0.3}))`,
                    boxShadow: '0 0 4px rgba(255, 255, 255, 0.4)',
                    filter: 'blur(0.5px)',
                  }}
                />
              </div>
            ))}
          </div>

          {isSpilling && (
            <div className="absolute inset-x-0 -bottom-64 animate-spill-spread">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full h-64 animate-spill-wave"
                  style={{
                    background: `radial-gradient(ellipse at center, 
                      rgba(255, 255, 255, ${0.1 - i * 0.01}) 0%, 
                      transparent 70%)`,
                    animationDelay: `${i * 0.1}s`,
                    transform: `scale(${1 + i * 0.1})`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Enhanced progress display with typewriter effect */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
          isComplete ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="text-center z-10 transform">
            <div className="relative mb-6">
              <span className="font-mono text-7xl font-bold text-white/90 drop-shadow-lg">
                {progress}
              </span>
              <span className="absolute -right-8 top-2 text-3xl text-white/70">%</span>
            </div>
            <div className="relative h-8">
              <div className="mt-4 text-xl text-white/80 tracking-[0.3em] uppercase font-light">
                {displayText}
                <span className="inline-block w-1 h-4 ml-1 bg-white/80 animate-blink"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }

        .wave-path-0 {
          animation: wave-0 8s infinite ease-in-out;
        }
        .wave-path-1 {
          animation: wave-1 10s infinite ease-in-out;
        }
        .wave-path-2 {
          animation: wave-2 12s infinite ease-in-out;
        }
        
        @keyframes wave-0 {
          0%, 100% { transform: translateX(0) scaleY(1); }
          50% { transform: translateX(-25%) scaleY(0.9); }
        }
        @keyframes wave-1 {
          0%, 100% { transform: translateX(-20px) scaleY(1); }
          50% { transform: translateX(-35%) scaleY(1.1); }
        }
        @keyframes wave-2 {
          0%, 100% { transform: translateX(-40px) scaleY(1); }
          50% { transform: translateX(-15%) scaleY(0.95); }
        }
        @keyframes curved-bubble-rise {
          0% { 
            transform: translate(0, 0) scale(0.8);
            opacity: 0; 
          }
          20% {
            opacity: 1;
            transform: translate(${Math.random() * 10}px, -20%) scale(0.9);
          }
          60% {
            transform: translate(${Math.random() * 20 - 10}px, -60%) scale(1);
          }
          100% { 
            transform: translate(${Math.random() * 30 - 15}px, -100%) scale(0.8);
            opacity: 0;
          }
        }
        @keyframes container-spill {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(15deg) translateY(20%); }
        }
        @keyframes water-spill {
          0% { transform: rotate(0deg); clip-path: inset(0 0 0 0); }
          100% { 
            transform: rotate(-15deg) translateY(40%);
            clip-path: inset(0 -50% -100% -50%);
          }
        }
        @keyframes spill-wave {
          0% { 
            opacity: 0.8;
            transform: translateY(0) scale(1);
          }
          100% { 
            opacity: 0;
            transform: translateY(100%) scale(1.5);
          }
        }
        @keyframes spill-spread {
          0% { transform: scale(0.5) translateY(-50%); }
          100% { transform: scale(1.5) translateY(0); }
        }
        @keyframes bubble-spill {
          100% { 
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 + 100}px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AestheticLoader;