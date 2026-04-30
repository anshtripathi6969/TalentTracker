import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, Database, ShieldCheck, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  { icon: Clock, value: "60%", label: "Reduction in hiring time", suffix: "" },
  { icon: Database, value: "100", label: "Data points per candidate", suffix: "+" },
  { icon: ShieldCheck, value: "0%", label: "Bias in initial screening", suffix: "" },
  { icon: TrendingUp, value: "10", label: "Candidates evaluated simultaneously", suffix: "k+" },
];

export function Benefits() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      countersRef.current.forEach((counter) => {
        if (!counter) return;
        const target = parseInt(counter.getAttribute("data-target") || "0", 10);

        gsap.to(counter, {
          innerHTML: target,
          duration: 2,
          snap: { innerHTML: 1 },
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });
      });

      gsap.fromTo(
        ".benefit-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-40 bg-neon-purple/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Talent Tracker?</h2>
          <p className="text-lg text-white/60">Measurable impact on your recruitment pipeline.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {benefits.map((item, i) => (
            <div key={i} className="benefit-item text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center border border-white/10 mb-6 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <item.icon size={28} className="text-neon-cyan" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 font-outfit text-white">
                <span
                  ref={el => { countersRef.current[i] = el; }}
                  data-target={item.value.replace(/\D/g, '')}
                >
                  0
                </span>
                {item.suffix}
                {item.value.includes('%') && '%'}
              </div>
              <p className="text-sm text-white/60 font-medium max-w-[150px]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
