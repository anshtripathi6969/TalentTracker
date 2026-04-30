import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Upload, Cpu, BarChart3, Users } from "lucide-react";
import { cn } from "../../lib/utils";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Upload,
    title: "Upload Candidates",
    description: "Sync with your ATS or upload resumes directly.",
    gradient: "from-neon-purple to-violet-500",
    glow: "rgba(176,38,255,0.35)",
    dot: "bg-neon-purple",
    iconClass: "text-neon-purple bg-neon-purple/10",
  },
  {
    icon: Cpu,
    title: "AI Evaluation",
    description: "Analyzes skills, experience, and potential instantly.",
    gradient: "from-neon-blue to-blue-400",
    glow: "rgba(0,100,255,0.35)",
    dot: "bg-neon-blue",
    iconClass: "text-neon-blue bg-neon-blue/10",
  },
  {
    icon: BarChart3,
    title: "Auto-Prioritize",
    description: "Scored and ranked from P0 (Must Hire) to P3.",
    gradient: "from-neon-cyan to-emerald-400",
    glow: "rgba(0,240,255,0.35)",
    dot: "bg-neon-cyan",
    iconClass: "text-neon-cyan bg-neon-cyan/10",
  },
  {
    icon: Users,
    title: "Shortlist & Hire",
    description: "Collaborate visually and make offers faster.",
    gradient: "from-green-400 to-emerald-500",
    glow: "rgba(34,197,94,0.35)",
    dot: "bg-green-400",
    iconClass: "text-green-400 bg-green-400/10",
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw timeline
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        }
      );

      // Animate each step card
      gsap.utils.toArray<HTMLElement>(".hiw-step").forEach((el, i) => {
        gsap.fromTo(
          el,
          { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
      });

      // Animate dots
      gsap.utils.toArray<HTMLElement>(".hiw-dot").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: { trigger: el, start: "top 80%" },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" className="py-24 relative" ref={containerRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How it Works</h2>
          <p className="text-lg text-white/50">Four simple steps to transform your hiring process.</p>
        </div>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/[0.06] -translate-x-1/2 origin-top">
            <div
              ref={lineRef}
              className="w-full h-full bg-gradient-to-b from-neon-purple via-neon-blue to-neon-cyan origin-top"
              style={{ filter: "drop-shadow(0 0 6px rgba(0,240,255,0.3))" }}
            />
          </div>

          <div className="flex flex-col gap-14">
            {steps.map((step, i) => (
              <div
                key={i}
                className={cn(
                  "hiw-step relative flex items-start gap-6 md:gap-0",
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Timeline Dot */}
                <div className="hiw-dot absolute left-4 md:left-1/2 top-6 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-8 h-8 rounded-full bg-dark-900 border-2 border-white/15 flex items-center justify-center">
                    <div
                      className={cn("w-3 h-3 rounded-full", step.dot)}
                      style={{ boxShadow: `0 0 10px ${step.glow}` }}
                    />
                  </div>
                </div>

                {/* Card */}
                <div
                  className={cn(
                    "flex-1 pl-12 md:pl-0",
                    i % 2 === 0 ? "md:pr-14 md:text-right" : "md:pl-14 md:text-left"
                  )}
                >
                  <div className="glass-card p-6 inline-block w-full max-w-sm group hover:border-white/20 transition-all duration-400 hover:-translate-y-0.5">
                    <div
                      className={cn(
                        "w-11 h-11 rounded-xl flex items-center justify-center border border-white/10 mb-4 group-hover:scale-110 transition-transform duration-300",
                        step.iconClass,
                        i % 2 === 0 ? "md:ml-auto" : ""
                      )}
                    >
                      <step.icon size={20} />
                    </div>
                    <h3 className="text-lg font-bold mb-1.5 text-white">
                      {i + 1}. {step.title}
                    </h3>
                    <p className="text-white/45 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
