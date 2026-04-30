import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function DemoShowcase() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".demo-container",
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // When modal opens, play from start; when it closes, pause
  useEffect(() => {
    if (isVideoOpen && modalVideoRef.current) {
      modalVideoRef.current.currentTime = 0;
      modalVideoRef.current.play();
    }
  }, [isVideoOpen]);

  return (
    <section id="demo" className="py-24 relative" ref={containerRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">See it in action</h2>
          <p className="text-lg text-white/60">A 2-minute walkthrough of the Talent Tracker platform.</p>
        </div>

        <div
          className="demo-container max-w-5xl mx-auto relative rounded-3xl overflow-hidden glass-card border border-white/20 aspect-video flex items-center justify-center group cursor-pointer shadow-[0_0_50px_rgba(176,38,255,0.15)] hover:shadow-[0_0_70px_rgba(176,38,255,0.25)] transition-shadow duration-500"
          onClick={() => setIsVideoOpen(true)}
        >
          {/* Actual video preview — muted, looping, auto-play */}
          <video
            ref={previewVideoRef}
            src="/demo.mp4"
            muted
            loop
            autoPlay
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-dark-900/40 group-hover:bg-dark-900/20 transition-colors duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-dark-900/30" />

          {/* Play button */}
          <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-white/15 transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            <div className="absolute inset-0 rounded-full border-2 border-neon-cyan/50 animate-ping opacity-30" />
            <Play size={32} className="text-white ml-1.5 drop-shadow-lg" fill="currentColor" />
          </div>

          {/* Bottom label */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
            <span className="text-white/50 text-sm font-medium bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
              Click to watch full demo
            </span>
          </div>
        </div>
      </div>

      {/* Fullscreen video modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-900/95 backdrop-blur-xl p-6"
            onClick={(e) => { if (e.target === e.currentTarget) setIsVideoOpen(false); }}
          >
            <button
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition-all duration-200"
              onClick={() => setIsVideoOpen(false)}
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-6xl aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 relative shadow-[0_0_80px_rgba(0,0,0,0.5)]"
            >
              <video
                ref={modalVideoRef}
                src="/demo.mp4"
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
