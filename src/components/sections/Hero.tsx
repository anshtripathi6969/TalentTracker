import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { ArrowRight, Play, LayoutDashboard, Users, Settings, TrendingUp, Search } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Grid Parallax and Pulse
      gsap.to(gridRef.current, {
        y: "10%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Hero Content Animation Sequence
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-badge",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.2 }
      )
        .fromTo(
          ".hero-title",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          ".hero-desc",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".hero-actions",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.6"
        )
        .fromTo(
          dashboardRef.current,
          { y: 100, opacity: 0, rotateX: 10 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.2, ease: "expo.out" },
          "-=0.4"
        );

      // Dashboard Hover floating effect
      gsap.to(dashboardRef.current, {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!gridRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const xPos = (clientX / innerWidth - 0.5) * 20;
    const yPos = (clientY / innerHeight - 0.5) * 20;

    gsap.to(gridRef.current, {
      x: xPos,
      y: yPos,
      rotationY: xPos * 0.5,
      rotationX: -yPos * 0.5,
      ease: "power2.out",
      duration: 1
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-32 pb-20 overflow-hidden flex flex-col items-center justify-center perspective-[1000px]"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 z-0 overflow-hidden perspective-[1000px]">
        <div
          ref={gridRef}
          className="absolute inset-[-50%] w-[200%] h-[200%] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [transform-style:preserve-3d] [transform:rotateX(60deg)_translateY(-100px)_translateZ(-200px)] animate-grid opacity-40"
          style={{
            maskImage: "radial-gradient(ellipse at center, black 10%, transparent 60%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 10%, transparent 60%)"
          }}
        />

        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[40%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-neon-cyan/20 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div ref={contentRef} className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center mt-10">



        <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold max-w-5xl leading-[1.1] mb-6">
          Hire Smarter. <br />
          <span className="text-gradient">Decide Faster.</span>
        </h1>

        <p className="hero-desc text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed">
          Evaluate, compare, and shortlist top candidates with a powerful visual hiring dashboard designed for modern teams.
        </p>

        <div className="hero-actions flex flex-col sm:flex-row items-center gap-4">
          <Link to="/dashboard">
            <Button variant="primary" size="lg">
              Get Started
              <ArrowRight size={18} />
            </Button>
          </Link>
          <a href="#demo">
            <Button variant="outline" size="lg" className="group">
              <Play size={18} className="text-neon-cyan group-hover:text-white transition-colors" fill="currentColor" />
              View Demo
            </Button>
          </a>
        </div>
      </div>

      {/* Mock Dashboard Preview */}
      <div className="w-full max-w-6xl mx-auto px-6 mt-20 relative z-10 perspective-[1200px]">
        <div
          ref={dashboardRef}
          className="relative rounded-2xl glass-card border border-white/20 p-2 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu"
        >
          {/* Dashboard Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="h-6 w-48 bg-white/5 rounded mx-auto border border-white/5" />
            <div className="w-8 h-8 rounded-full bg-white/10" />
          </div>

          {/* Dashboard Content Mock */}
          <div className="p-6 bg-dark-900/50 flex gap-6 h-[400px] md:h-[500px]">
            {/* Sidebar */}
            <div className="hidden md:flex flex-col w-48 border-r border-white/10 pr-4">
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/10 text-white mb-2 shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/5">
                <LayoutDashboard size={18} className="text-neon-cyan" />
                <span className="font-medium text-sm">Dashboard</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/50 hover:bg-white/5 hover:text-white transition-colors mb-2 cursor-pointer group">
                <Users size={18} className="group-hover:text-neon-blue transition-colors" />
                <span className="font-medium text-sm">Candidates</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/50 hover:bg-white/5 hover:text-white transition-colors mb-8 cursor-pointer group">
                <TrendingUp size={18} className="group-hover:text-neon-purple transition-colors" />
                <span className="font-medium text-sm">Analytics</span>
              </div>
              <div className="mt-auto flex items-center gap-3 px-3 py-2 rounded-lg text-white/50 hover:bg-white/5 hover:text-white transition-colors cursor-pointer">
                <Settings size={18} />
                <span className="font-medium text-sm">Settings</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Stats Row */}
              <div className="flex gap-4">
                {[
                  { label: "Total Applicants", value: "2,405", trend: "+12%", color: "neon-purple" },
                  { label: "Shortlisted", value: "142", trend: "+5%", color: "neon-blue" },
                  { label: "Interviews", value: "38", trend: "+2%", color: "neon-cyan" }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.08)" }}
                    className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden group cursor-pointer transition-colors shadow-lg"
                  >
                    <div className="text-white/50 text-xs font-medium mb-2">{stat.label}</div>
                    <div className="flex items-end justify-between relative z-10">
                      <div className="text-2xl md:text-3xl font-bold text-white font-outfit">{stat.value}</div>
                      <div className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/20">{stat.trend}</div>
                    </div>
                    <div className="absolute right-0 bottom-0 w-24 h-24 bg-gradient-to-tl from-white/5 to-transparent rounded-full translate-x-8 translate-y-8 pointer-events-none" />
                    {i === 1 && <div className="absolute right-0 bottom-0 w-32 h-32 bg-neon-purple/10 blur-2xl group-hover:bg-neon-purple/20 transition-colors duration-500" />}
                  </motion.div>
                ))}
              </div>

              {/* Table Mock */}
              <div className="flex-1 bg-white/[0.02] border border-white/10 rounded-xl p-5 flex flex-col gap-4 relative overflow-hidden shadow-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-semibold text-sm text-white/90">Recent Candidates</div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-dark-900 border border-white/10 rounded-full px-3 py-1.5 hover:border-white/20 transition-colors cursor-text">
                      <Search size={14} className="text-white/40" />
                      <span className="text-xs text-white/40">Search...</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {[
                    { name: "Alex Johnson", role: "Frontend Dev", score: 98, status: "P0", bg: "from-neon-purple to-neon-blue" },
                    { name: "Samantha Lee", role: "Product Designer", score: 92, status: "P1", bg: "from-neon-blue to-neon-cyan" },
                    { name: "Marcus Chen", role: "Backend Eng", score: 85, status: "P2", bg: "from-green-400 to-emerald-500" },
                  ].map((row, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 + idx * 0.15, ease: "easeOut" }}
                      whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.1)" }}
                      className="flex items-center gap-4 p-3 rounded-lg bg-white/[0.03] border border-white/5 cursor-pointer transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-dark-900 flex items-center justify-center border border-white/10 shrink-0 font-bold text-sm bg-gradient-to-br from-white/10 to-transparent group-hover:border-white/20 transition-colors">
                        {row.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white group-hover:text-neon-cyan transition-colors truncate">{row.name}</div>
                        <div className="text-xs text-white/50 truncate">{row.role}</div>
                      </div>
                      <div className="hidden sm:block">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider
                          ${row.status === 'P0' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                            row.status === 'P1' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}
                        >
                          {row.status}
                        </span>
                      </div>
                      <div className="w-24 sm:w-32 flex items-center gap-3">
                        <div className="flex-1 h-2 bg-dark-900 rounded-full overflow-hidden border border-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${row.score}%` }}
                            transition={{ duration: 1.5, delay: 2 + idx * 0.1, ease: "easeOut" }}
                            className={`h-full bg-gradient-to-r ${row.bg}`}
                          />
                        </div>
                        <span className="text-xs font-medium text-white/70 w-6">{row.score}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Animated Live Pulse overlay */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
                  </span>
                  <span className="text-[10px] text-neon-cyan font-medium uppercase tracking-wider">Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
