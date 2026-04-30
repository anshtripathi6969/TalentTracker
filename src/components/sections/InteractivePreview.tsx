import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, MoreHorizontal } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const mockCandidates = [
  { id: 1, name: "Elena Rodriguez", role: "Sr. Frontend Eng", score: 94, priority: "P0", match: "98%", status: "Interviewed" },
  { id: 2, name: "David Chen", role: "Fullstack Eng", score: 88, priority: "P1", match: "92%", status: "Technical Task" },
  { id: 3, name: "Sarah Williams", role: "UI/UX Designer", score: 82, priority: "P2", match: "85%", status: "Screening" },
  { id: 4, name: "Michael Chang", role: "Backend Eng", score: 76, priority: "P3", match: "78%", status: "Applied" },
];

export function InteractivePreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal table
      gsap.fromTo(
        tableRef.current,
        { y: 100, opacity: 0, rotateX: 15 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );

      // Stagger rows
      gsap.fromTo(
        rowsRef.current,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: tableRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-dark-800/50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            See the big picture. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-cyan">
              Zoom into the details.
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Interactive tables that feel like magic. Sort, filter, and compare with zero latency.
          </p>
        </div>

        {/* Dashboard UI Wrapper */}
        <div 
          ref={tableRef}
          className="max-w-5xl mx-auto rounded-2xl glass-card border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.1)] perspective-[1000px]"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5">
            <div className="flex gap-4">
              <button className="px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium text-white">All Candidates</button>
              <button className="px-4 py-1.5 rounded-full text-white/50 text-sm font-medium hover:text-white transition-colors">Shortlisted</button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-64 h-9 bg-dark-900/50 rounded-lg border border-white/10 px-3 flex items-center">
                <span className="text-white/30 text-sm">Search candidates...</span>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="w-full bg-dark-900/40 backdrop-blur-sm">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/5 text-xs font-medium text-white/40 uppercase tracking-wider">
              <div className="col-span-4">Candidate</div>
              <div className="col-span-2">Priority</div>
              <div className="col-span-2">Match Score</div>
              <div className="col-span-3">Status</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>

            {/* Table Body */}
            <div className="flex flex-col">
              {mockCandidates.map((candidate, idx) => (
                <motion.div
                  key={candidate.id}
                  ref={(el) => { rowsRef.current[idx] = el; }}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 items-center transition-colors cursor-pointer group"
                >
                  {/* Name & Role */}
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue p-[1px]">
                      <div className="w-full h-full rounded-full bg-dark-900 flex items-center justify-center">
                        <span className="text-sm font-bold">{candidate.name.charAt(0)}</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-white group-hover:text-neon-cyan transition-colors">{candidate.name}</div>
                      <div className="text-xs text-white/50">{candidate.role}</div>
                    </div>
                  </div>

                  {/* Priority Badge */}
                  <div className="col-span-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold
                      ${candidate.priority === 'P0' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 
                        candidate.priority === 'P1' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                        candidate.priority === 'P2' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                        'bg-blue-500/20 text-blue-400 border border-blue-500/30'}
                    `}>
                      {candidate.priority}
                    </span>
                  </div>

                  {/* Match Score */}
                  <div className="col-span-2 flex items-center gap-2">
                    <div className="text-sm font-medium">{candidate.match}</div>
                    <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: candidate.match }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-neon-blue to-neon-cyan" 
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-span-3 flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-400" />
                    <span className="text-sm text-white/70">{candidate.status}</span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex justify-end">
                    <button className="p-1 rounded hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Footer Bar */}
          <div className="p-4 bg-white/5 flex justify-center items-center gap-2 group cursor-pointer hover:bg-white/10 transition-colors">
            <span className="text-sm font-medium text-white/70 group-hover:text-white">View full dashboard</span>
            <ChevronRight size={16} className="text-neon-cyan group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </section>
  );
}
