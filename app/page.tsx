"use client";

import { useEffect, useState, useCallback } from "react";
import { Mail, ArrowRight, MapPin, Check, Star } from "lucide-react";
import Image from "next/image";
import HeroImage from "@/public/meetings.jpg";

export default function ComingSoonHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Expected launch date - 10am on March 30, 2025 Indian Standard Time (UTC+5:30)
  const launchDate = new Date("2025-03-30T10:00:00+05:30");
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setIsVisible(true);

    const countdownTimer = setInterval(() => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(countdownTimer);
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeRemaining({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      
      try {
        const response = await fetch("/api/mail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        
        if (response.ok) {
          setIsSubmitted(true);
          setTimeout(() => {
            setEmail("");
            setIsSubmitted(false);
          }, 3000);
        } else {
          console.error("Failed to subscribe:", await response.text());
        }
      } catch (error) {
        console.error("Error submitting email:", error);
      }
    },
    [email]
  );

  return (
    <section className="h-screen w-screen bg-[#0a1525] relative flex items-center justify-center overflow-hidden">
      {/* Enhanced dynamic background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/noise-pattern.png')] opacity-5 mix-blend-soft-light"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#112242]/40 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-t from-[#071020]/70 to-transparent"></div>

        {/* Enhanced animated elements */}
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-[#1c3b6d]/20 blur-[100px] animate-float-slow"></div>
        <div className="absolute top-1/3 -right-32 h-[800px] w-[800px] rounded-full bg-[#a48f5c]/15 blur-[120px] animate-float-medium"></div>
        <div className="absolute -bottom-60 left-1/4 h-[500px] w-[500px] rounded-full bg-[#1c3b6d]/20 blur-[100px] animate-float-fast"></div>

        {/* Particle effect canvas */}
        <div className="absolute inset-0 opacity-30 particles-container"></div>

        {/* Refined grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 z-10 h-full flex items-center">
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-center h-full py-4 sm:py-6 md:py-0">
          {/* Left content - Enhanced for mobile */}
          <div
            className={`lg:col-span-6 flex flex-col space-y-4 sm:space-y-5 md:space-y-6 transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
          >
            {/* Enhanced brand badge */}
            <div className="flex items-center gap-2 mb-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-glow animate-pulse-subtle">
                <Star
                  className="h-3.5 w-3.5 text-[#f0cb76] drop-shadow-glow"
                  fill="#f0cb76"
                />
                <span className="text-xs sm:text-sm font-medium text-white/95">
                  Proudly Canadian
                </span>
              </div>
              <div className="h-px flex-grow bg-gradient-to-r from-white/20 to-transparent"></div>
            </div>

            {/* Enhanced launch date badge */}
            <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 text-white rounded-full text-xs sm:text-sm backdrop-blur-xl shadow-glow border border-white/20 w-fit">
              <div className="w-2 h-2 rounded-full bg-[#f0cb76] mr-2 animate-pulse"></div>
              Coming Soon...
            </div>

            {/* Enhanced typography */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block text-white drop-shadow-text">
                  Excellence in
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#f0cb76] to-[#a48f5c] mt-1 drop-shadow-text">
                  Canadian Law
                </span>
              </h1>

              <p className="text-white/80 text-base sm:text-lg mt-3 sm:mt-4 max-w-xl leading-relaxed">
                Soon bringing distinguished expertise in Corporate Law, Civil
                Litigation, Immigration, and Real Estate across Ontario with
                unwavering commitment to excellence.
              </p>
            </div>

            {/* Enhanced countdown timer */}
            <div className="flex flex-col space-y-2">
              <h3 className="text-xs font-medium text-white/60 uppercase tracking-widest">
                Launching In
              </h3>
              <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md">
                {Object.entries(timeRemaining).map(([label, value]) => (
                  <div
                    key={label}
                    className="group flex flex-col items-center p-2 sm:p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-glow"
                  >
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-[#f0cb76] transition-colors">
                      {value.toString().padStart(2, "0")}
                    </span>
                    <span className="text-[9px] sm:text-[10px] uppercase text-white/60 mt-1">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Practice areas - Enhanced */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-md">
              {[
                "Corporate Law",
                "Civil Litigation",
                "Immigration",
                "Real Estate",
              ].map((area) => (
                <div key={area} className="flex items-center gap-2 group">
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#f0cb76]/20 transition-all duration-300">
                    <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#f0cb76]" />
                  </div>
                  <span className="text-xs sm:text-sm text-white/80 group-hover:text-white transition-colors">
                    {area}
                  </span>
                </div>
              ))}
            </div>

            {/* Enhanced email signup form */}
            <div className="max-w-md w-full">
              <form onSubmit={handleSubmit} className="relative mt-2">
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-white/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full h-12 sm:h-14 pl-10 sm:pl-12 pr-28 sm:pr-36 rounded-full bg-white/10 border border-white/20 focus:border-[#f0cb76] focus:ring focus:ring-[#f0cb76]/20 focus:outline-none text-sm sm:text-base text-white placeholder:text-white/40 backdrop-blur-xl shadow-glow"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 h-8 sm:h-10 px-3 sm:px-5 rounded-full bg-gradient-to-r from-[#f0cb76] to-[#a48f5c] text-[#0a1525] font-medium text-xs sm:text-sm shadow-glow transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#f0cb76] group overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      {isSubmitted ? "Thank You!" : "Notify Me"}
                      {!isSubmitted && (
                        <ArrowRight className="ml-1 sm:ml-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      )}
                      {isSubmitted && (
                        <Check className="ml-1 sm:ml-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right image column - Enhanced and more responsive */}
          <div
            className={`lg:col-span-6 relative hidden md:block transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
          >
            {/* Enhanced floating cards */}
            <div className="absolute -left-8 top-12 z-20 bg-white/10 backdrop-blur-xl rounded-xl shadow-glow-intense border border-white/20 py-3 px-4 max-w-[180px] animate-float scale-in">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-[#f0cb76] rounded-full mr-2"></div>
                <h4 className="font-medium text-sm text-white">
                  Client-Centered
                </h4>
              </div>
              <p className="text-xs text-white/70">
                Tailored legal solutions for your unique needs
              </p>
            </div>

            <div className="absolute -right-4 bottom-20 z-20 bg-white/10 backdrop-blur-xl rounded-xl shadow-glow-intense border border-white/20 py-3 px-4 max-w-[180px] animate-float-reverse scale-in">
              <div className="flex items-center mb-2">
                <MapPin className="w-3 h-3 text-[#f0cb76] mr-2" />
                <h4 className="font-medium text-sm text-white">Ontario-Wide</h4>
              </div>
              <p className="text-xs text-white/70">
                Serving clients across the province
              </p>
            </div>

            <div className="relative h-[500px] overflow-hidden rounded-3xl shadow-glow transform transition-all duration-700 hover:shadow-glow-intense group">
              <Image
                src={HeroImage}
                alt="Legal professionals in conference room"
                fill
                className="object-cover origin-center transition-transform duration-1000 scale-110 group-hover:scale-105"
                priority
                quality={95}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0a1525]/90 via-[#0a1525]/70 to-transparent mix-blend-multiply">
                <div className="absolute inset-0 bg-[#0a1525]/30 backdrop-filter backdrop-brightness-75"></div>

                {/* Enhanced professional badge */}
                <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 shadow-glow text-sm font-medium text-white border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 mr-2 text-[#f0cb76]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12,2L4,5v6.09c0,5.05,3.41,9.76,8,10.91c4.59-1.15,8-5.86,8-10.91V5L12,2z M10.94,15.54L7.4,12l1.41-1.41l2.12,2.12 l4.24-4.24l1.41,1.41L10.94,15.54z" />
                    </svg>
                    Licensed by the Law Society of Ontario
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS animations */}
      <style jsx global>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) rotate(-1deg);
          }
          50% {
            transform: translateY(-20px) rotate(1deg);
          }
        }
        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0) rotate(1deg);
          }
          50% {
            transform: translateY(-15px) rotate(-1deg);
          }
        }
        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0) rotate(-0.5deg);
          }
          50% {
            transform: translateY(-10px) rotate(0.5deg);
          }
        }
        @keyframes pulse-subtle {
          0%,
          100% {
            opacity: 0.9;
            box-shadow: 0 0 15px rgba(240, 203, 118, 0.2);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 25px rgba(240, 203, 118, 0.4);
          }
        }
        @keyframes scale-in {
          0% {
            transform: scale(0.9);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 12s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 9s ease-in-out infinite;
        }
        .animate-float {
          animation: float-medium 7s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-medium 8s ease-in-out infinite reverse;
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 4s ease-in-out infinite;
        }
        .scale-in {
          animation: scale-in 1s ease-out forwards;
        }
        .shadow-glow {
          box-shadow: 0 0 20px rgba(240, 203, 118, 0.15);
        }
        .shadow-glow-intense {
          box-shadow: 0 0 30px rgba(240, 203, 118, 0.3),
            0 0 60px rgba(240, 203, 118, 0.1);
        }
        .drop-shadow-text {
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5),
            0 0 30px rgba(0, 0, 0, 0.2);
        }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 5px rgba(240, 203, 118, 0.5));
        }
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M0 0h40v40H0V0zm1 1v38h38V1H1z' fill='%23ffffff' fill-opacity='0.05'/%3E%3C/svg%3E");
          background-size: 40px 40px;
        }

        /* Particle effect styles */
        .particles-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at center,
            transparent 0%,
            transparent 100%
          );
        }

        /* Mobile optimization */
        @media (max-width: 768px) {
          .h-screen {
            height: 100vh;
            height: 100dvh; /* Dynamic viewport height for mobile */
          }
        }
      `}</style>
    </section>
  );
}
