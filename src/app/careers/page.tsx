"use client"

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rocket, Mail, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CareersPage() {
  return (
    <div className="bg-[#07070D] min-h-screen">
      <Navbar />

      <main className="relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.08),transparent_70%)] pointer-events-none" />

        <section className="max-w-7xl mx-auto px-6 py-32 md:py-48 text-center relative z-10">
          <Badge variant="outline" className="border-primary/30 text-primary uppercase text-[10px] font-black px-4 py-1.5 tracking-[0.2em] mb-8">
            Opportunities
          </Badge>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase mb-8 leading-[0.9]">
            Building the <br /><span className="gradient-text">Future of Intel.</span>
          </h1>
          
          <p className="text-[#8A8AA0] text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed font-medium mb-12">
            We are redefining how the world navigates professional trajectories. While our team is currently focused on core scaling, we are always looking for exceptional talent.
          </p>

          <div className="flex flex-col items-center gap-8">
             <div className="p-10 bg-[#0F0F1A] border border-border rounded-[32px] max-w-xl w-full relative group overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Rocket size={48} className="text-primary mx-auto mb-6 group-hover:scale-110 transition-transform duration-500" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-4">Hiring Soon</h2>
                <p className="text-sm text-[#8A8AA0] leading-relaxed mb-8">
                   We are preparing to open roles in AI Engineering, Product Design, and Growth Strategy. Want to be at the front of the line?
                </p>
                <Link href="mailto:hello@supernova.ai">
                   <Button className="h-14 px-10 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-2xl shadow-primary/20">
                      Join the Waitlist <ArrowRight size={16} className="ml-2" />
                   </Button>
                </Link>
             </div>

             <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mt-12">
                <Sparkles size={14} className="text-accent" />
                Talent always finds a way
                <Sparkles size={14} className="text-accent" />
             </div>
          </div>
        </section>

        {/* Culture Teaser */}
        <section className="py-24 border-t border-border bg-[#0F0F1A]/30">
           <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
              {[
                { title: "Remote First", desc: "Work from anywhere in the world. We value outcomes over hours." },
                { title: "AI Driven", desc: "We use the latest LLMs and custom models to power our internal workflows." },
                { title: "Ownership", desc: "Every team member has a direct impact on the product roadmap." }
              ].map((v, i) => (
                <div key={i} className="space-y-4">
                   <h4 className="text-xl font-black text-white uppercase tracking-tight">{v.title}</h4>
                   <p className="text-sm text-[#8A8AA0] leading-relaxed">{v.desc}</p>
                </div>
              ))}
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
