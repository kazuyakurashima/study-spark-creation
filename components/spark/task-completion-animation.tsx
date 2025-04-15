"use client"

import { useEffect, useState } from "react"

export function TaskCompletionAnimation() {
  const [animationType, setAnimationType] = useState<number>(0)

  useEffect(() => {
    // Randomly select an animation type
    setAnimationType(Math.floor(Math.random() * 7))
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {animationType === 0 && (
        // Fireworks
        <div className="fireworks-animation">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="firework"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
              }}
            />
          ))}
        </div>
      )}

      {animationType === 1 && (
        // Rainbow
        <div className="rainbow-animation" />
      )}

      {animationType === 2 && (
        // Cherry blossoms
        <div className="cherry-blossom-animation">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="blossom"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 3}s`,
              }}
            />
          ))}
        </div>
      )}

      {animationType === 3 && (
        // Confetti
        <div className="confetti-animation">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {animationType === 4 && (
        // Balloons
        <div className="balloon-animation">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="balloon"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 70%)`,
                animationDelay: `${Math.random() * 1}s`,
                animationDuration: `${Math.random() * 2 + 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {animationType === 5 && (
        // Shooting stars
        <div className="shooting-star-animation">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="shooting-star"
              style={{
                top: `${Math.random() * 50}%`,
                left: `${Math.random() * 30 + 70}%`,
                animationDelay: `${Math.random() * 1}s`,
              }}
            />
          ))}
        </div>
      )}

      {animationType === 6 && (
        // Rocket
        <div className="rocket-animation">
          <div className="rocket">
            <div className="rocket-body" />
            <div className="rocket-window" />
            <div className="rocket-fins" />
            <div className="rocket-exhaust" />
          </div>
        </div>
      )}

      <style jsx>{`
        .fireworks-animation {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .firework {
          position: absolute;
          bottom: 0;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          animation: firework 2s ease-out forwards;
        }
        
        @keyframes firework {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(-50vh);
          }
          60%, 100% {
            transform: translateY(-50vh) scale(30);
            opacity: 0;
          }
        }
        
        .rainbow-animation {
          position: absolute;
          width: 200%;
          height: 200%;
          left: -50%;
          bottom: -50%;
          background: linear-gradient(
            to right,
            rgba(255, 0, 0, 0.7),
            rgba(255, 165, 0, 0.7),
            rgba(255, 255, 0, 0.7),
            rgba(0, 128, 0, 0.7),
            rgba(0, 0, 255, 0.7),
            rgba(75, 0, 130, 0.7),
            rgba(238, 130, 238, 0.7)
          );
          transform: rotate(-30deg);
          animation: rainbow 2s ease-in-out forwards;
        }
        
        @keyframes rainbow {
          0% {
            transform: translateX(-100%) rotate(-30deg);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%) rotate(-30deg);
            opacity: 0;
          }
        }
        
        .cherry-blossom-animation {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .blossom {
          position: absolute;
          top: -10px;
          width: 15px;
          height: 15px;
          background-color: #ffb7c5;
          border-radius: 50%;
          animation: blossom-fall linear forwards;
        }
        
        @keyframes blossom-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        .confetti-animation {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .confetti {
          position: absolute;
          top: -20px;
          animation: confetti-fall linear forwards;
        }
        
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        .balloon-animation {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .balloon {
          position: absolute;
          bottom: -50px;
          width: 30px;
          height: 40px;
          border-radius: 50%;
          animation: balloon-rise ease-out forwards;
        }
        
        .balloon::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 15px;
          background-color: #ccc;
        }
        
        @keyframes balloon-rise {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh);
            opacity: 0;
          }
        }
        
        .shooting-star-animation {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .shooting-star {
          position: absolute;
          width: 100px;
          height: 2px;
          background: linear-gradient(to right, transparent, white, transparent);
          animation: shooting-star 1s ease-out forwards;
        }
        
        @keyframes shooting-star {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateX(-100px) translateY(100px);
            opacity: 0;
          }
        }
        
        .rocket-animation {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .rocket {
          position: absolute;
          bottom: -50px;
          left: 50%;
          transform: translateX(-50%);
          animation: rocket-launch 2s ease-out forwards;
        }
        
        .rocket-body {
          width: 20px;
          height: 60px;
          background-color: #f44336;
          border-radius: 50% 50% 0 0;
        }
        
        .rocket-window {
          position: absolute;
          top: 15px;
          left: 5px;
          width: 10px;
          height: 10px;
          background-color: #fff;
          border-radius: 50%;
        }
        
        .rocket-fins {
          position: absolute;
          bottom: 0;
          left: -5px;
          width: 30px;
          height: 10px;
          background-color: #f44336;
        }
        
        .rocket-exhaust {
          position: absolute;
          bottom: -20px;
          left: 5px;
          width: 10px;
          height: 20px;
          background: linear-gradient(to bottom, #ff9800, transparent);
          animation: rocket-exhaust 0.1s infinite alternate;
        }
        
        @keyframes rocket-launch {
          0% {
            transform: translateX(-50%) translateY(0);
          }
          100% {
            transform: translateX(-50%) translateY(-100vh);
          }
        }
        
        @keyframes rocket-exhaust {
          0% {
            height: 20px;
          }
          100% {
            height: 30px;
          }
        }
      `}</style>
    </div>
  )
}
