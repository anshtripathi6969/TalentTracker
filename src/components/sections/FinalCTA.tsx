import { Button } from "../ui/Button";

export function FinalCTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-dark-900" />

      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-neon-purple via-transparent to-neon-blue" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-cyan/20 blur-[150px] rounded-full animate-pulse-glow" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 max-w-4xl mx-auto leading-tight">
          Ready to build your <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">
            dream team faster?
          </span>
        </h2>
        <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
          Join hundreds of fast-growing companies that use Talent Tracker to make data-driven hiring decisions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button variant="primary" size="lg" className="w-full sm:w-auto px-12 py-5 text-lg">
            Start Hiring Smarter Today
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto px-12 py-5 text-lg">
            Talk to Sales
          </Button>
        </div>
      </div>
    </section>
  );
}
