import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Zap, SplitSquareHorizontal, LineChart, Target } from "lucide-react";
import { cn } from "../../lib/utils";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Brain,
    title: "Candidate Insights",
    description: "Deep AI analysis of resumes, portfolios, and interview notes to extract true potential.",
    color: "from-neon-purple/20 to-transparent",
    iconColor: "text-neon-purple",
  },
  {
    icon: Zap,
    title: "Smart Priority Engine",
    description: "Automatically rank candidates into P0-P3 tiers based on your custom hiring criteria.",
    color: "from-neon-blue/20 to-transparent",
    iconColor: "text-neon-blue",
    colSpan: 2,
  },
  {
    icon: SplitSquareHorizontal,
    title: "Side-by-Side Comparison",
    description: "Visually compare top candidates across 20+ data points instantly.",
    color: "from-neon-cyan/20 to-transparent",
    iconColor: "text-neon-cyan",
  },
  {
    icon: LineChart,
    title: "Real-time Scoring",
    description: "Dynamic skill matrix updates as team members submit their evaluations.",
    color: "from-green-500/20 to-transparent",
    iconColor: "text-green-400",
  },
  {
    icon: Target,
    title: "Visual Shortlisting",
    description: "Drag-and-drop kanban boards to manage your hiring pipeline with clarity.",
    color: "from-orange-500/20 to-transparent",
    iconColor: "text-orange-400",
  },
];

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal
      gsap.fromTo(
        cardsRef.current,
        {
          y: 50,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );

      // Title reveal
      gsap.fromTo(
        ".features-header",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" className="py-24 relative" ref={containerRef}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-blue/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="features-header text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Everything you need to <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">
              build a world-class team
            </span>
          </h2>
          <p className="text-lg text-white/60">
            Talent Tracker replaces scattered spreadsheets with a centralized, AI-driven command center for your entire hiring process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={cn(
                "group relative rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.04] hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:border-white/20",
                feature.colSpan === 2 && "md:col-span-2"
              )}
            >
              {/* Hover Glow */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  feature.color
                )}
              />

              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 mb-6 group-hover:scale-110 transition-transform duration-500",
                  feature.iconColor
                )}>
                  <feature.icon size={24} />
                </div>

                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-white/60 leading-relaxed mt-auto">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
