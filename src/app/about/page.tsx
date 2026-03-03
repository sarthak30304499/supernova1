
"use client"

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Target, Shield, Globe, ArrowRight, Linkedin } from "lucide-react";
import Link from "next/link";

const founders = [
  {
    name: "Sarthak Palgotra",
    role: "Co-Founder & Visionary",
    bio: "Driving the core AI intelligence and product vision behind Supernova. Sarthak specializes in neural-matching and user-centric career strategy.",
    linkedin: "https://www.linkedin.com/in/sarthakpalgotra/"
  },
  {
    name: "Mohit",
    role: "Co-Founder & Strategist",
    bio: "Architecting the global operations and growth frameworks. Mohit focuses on market intelligence and ensuring enterprise-grade platform scalability.",
    linkedin: "https://www.linkedin.com/in/mohith-kumar-s-a18b6230b/"
  }
];

export default function AboutPage() {
  return (
    <div className="bg-[#07070D] min-h-screen">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative py-24 md:py-40 flex flex-col items-center justify-center px-6 text-center max-w-7xl mx-auto overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.1),transparent_70%)] pointer-events-none" />
          
          <Badge variant="outline" className="border-primary/30 text-primary uppercase text-[10px] font-black px-4 py-1.5 tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
            Our Origin Story
          </Badge>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Built for the <br /><span className="gradient-text">Next Generation.</span>
          </h1>
          
          <p className="text-[#8A8AA0] text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium animate-in fade-in duration-700 delay-200">
            SUPERNOVA was born from a simple realization: the professional world is accelerating, but career tools are stuck in the past. We built a unified workspace to give every professional an unfair advantage.
          </p>
        </section>

        {/* Vision & Values */}
        <section className="py-24 border-y border-border bg-[#0F0F1A]/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { icon: Zap, title: "Precision", desc: "No generic advice. We use semantic AI to deliver hyper-specific career intelligence tailored to your unique profile." },
                { icon: Shield, title: "Integrity", desc: "Your data is your most valuable asset. We use enterprise-grade security to ensure your privacy is never compromised." },
                { icon: Globe, title: "Access", desc: "Democratizing elite career coaching. We make high-end market insights accessible to everyone, everywhere." }
              ].map((val, i) => (
                <div key={i} className="space-y-6 group">
                   <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <val.icon size={28} />
                   </div>
                   <h3 className="text-xl font-black uppercase tracking-tight text-white">{val.title}</h3>
                   <p className="text-[#8A8AA0] leading-relaxed text-sm">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-24">
             <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white mb-6">Meet the <span className="text-primary">Founders</span></h2>
             <p className="text-[#8A8AA0] max-w-xl mx-auto font-medium">The minds behind the intelligence. We are dedicated to redefining how professionals navigate their career trajectory.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
             {founders.map((founder, i) => (
               <Card key={i} className="bg-[#0F0F1A] border-border overflow-hidden card-hover-effect">
                 <CardContent className="p-10 space-y-6">
                    <div className="flex justify-between items-start">
                       <div>
                         <h4 className="text-2xl font-black text-white tracking-tight">{founder.name}</h4>
                         <p className="text-primary text-xs font-black uppercase tracking-widest mt-1">{founder.role}</p>
                       </div>
                       <Link 
                        href={founder.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-3 bg-muted rounded-xl text-[#8A8AA0] hover:text-primary hover:bg-primary/10 transition-all duration-300"
                       >
                         <Linkedin size={24} />
                       </Link>
                    </div>
                    <p className="text-sm text-[#8A8AA0] leading-relaxed font-medium">
                      {founder.bio}
                    </p>
                 </CardContent>
               </Card>
             ))}
          </div>
        </section>

        {/* Stats / Impact */}
        <section className="py-24 border-t border-border">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
             {[
               { label: "Profiles Optimized", val: "50k+" },
               { label: "Global Users", val: "120k" },
               { label: "Success Rate", val: "94%" },
               { label: "Market Insights", val: "2M+" }
             ].map((stat, i) => (
               <div key={i} className="space-y-2">
                  <p className="text-4xl font-black text-white tracking-tighter">{stat.val}</p>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{stat.label}</p>
               </div>
             ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-6">
           <div className="max-w-4xl mx-auto p-12 md:p-24 bg-primary/5 border border-primary/20 rounded-[40px] text-center relative overflow-hidden group">
              <div className="absolute -bottom-24 -right-24 p-24 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
                 <Target size={400} className="text-primary" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-10 relative z-10">
                Join us in the <br /><span className="gradient-text">Future of Work.</span>
              </h2>
              <div className="relative z-10">
                 <Link href="/signup">
                    <Button size="lg" className="h-16 px-12 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-2xl shadow-primary/20">
                        Get Started Now <ArrowRight size={16} className="ml-2" />
                    </Button>
                 </Link>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Button({ children, className, ...props }: any) {
  return (
    <button
      className={`inline-flex items-center justify-center transition-all disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
