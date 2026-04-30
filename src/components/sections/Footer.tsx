import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, ExternalLink, Mail, Heart, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Demo", href: "#demo" },
  { label: "Pricing", href: "#" },
];

const companyLinks = [
  { label: "About Us", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact", href: "#" },
];

const socialLinks = [
  { icon: Globe, href: "https://github.com/anshtripathi6969", label: "Website" },
  { icon: ExternalLink, href: "https://www.linkedin.com/in/anshtripathi20/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:anshamigo007@gmail.com", label: "Email" },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-content",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="relative border-t border-white/[0.06] bg-dark-900">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-purple/40 to-transparent" />

      <div className="footer-content container mx-auto px-6 pt-14 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <a href="#" className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-neon-purple to-neon-blue flex items-center justify-center shadow-[0_0_15px_rgba(176,38,255,0.25)] group-hover:shadow-[0_0_25px_rgba(176,38,255,0.4)] transition-shadow duration-300">
                <span className="text-white font-bold text-lg leading-none">T</span>
              </div>
              <span className="font-outfit font-bold text-xl tracking-wide text-white">
                Talent{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-cyan">
                  Tracker
                </span>
              </span>
            </a>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
              The AI-powered command center for modern hiring teams.
              Evaluate smarter, decide faster.
            </p>

            {/* Social Icons */}
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/25 mb-5">
              Product
            </h4>
            <ul className="flex flex-col gap-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/45 hover:text-white flex items-center gap-1 group transition-colors duration-200"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 text-neon-cyan"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/25 mb-5">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/45 hover:text-white flex items-center gap-1 group transition-colors duration-200"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 text-neon-cyan"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Back to top */}
          <div className="md:col-span-1 flex md:justify-end items-start">
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/25 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 hover:-translate-y-1"
              aria-label="Back to top"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 12V2M7 2L2.5 6.5M7 2L11.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-[13px] flex items-center gap-1.5">
            © {new Date().getFullYear()} Talent Tracker · Built with
            <Heart size={12} className="text-red-400 fill-red-400 animate-pulse" />
            by <span className="text-white/50 font-medium">Ansh Tripathi</span>
          </p>
          <div className="flex gap-6 text-[13px]">
            <a href="#" className="text-white/25 hover:text-white/60 transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-white/25 hover:text-white/60 transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
