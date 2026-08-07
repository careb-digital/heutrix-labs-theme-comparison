import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function ScrollytellingSection() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  const examples = [
    {
      title: "Referral tracking",
      before: "Referral status is spread across emails, spreadsheets, inbox notes and verbal updates.",
      after: "The team has one referral tracker showing status, owner, next action, due date and overdue items."
    },
    {
      title: "Staff onboarding",
      before: "New starter tasks depend on memory and repeated reminders.",
      after: "The organisation has a clear onboarding checklist, task ownership, handover steps and visibility for managers."
    },
    {
      title: "Incident and complaint tracking",
      before: "Incidents and complaints are recorded inconsistently across forms, folders and spreadsheets.",
      after: "The organisation has a structured register showing status, owner, review steps, due dates and follow-up actions."
    },
    {
      title: "Reporting preparation",
      before: "Reports take too long because information is pulled from multiple places manually.",
      after: "The organisation has a clearer reporting workflow with defined inputs, review steps and fewer repeated manual checks."
    },
    {
      title: "Safe AI use",
      before: "Staff use AI tools informally without clear rules about privacy, review or suitable use.",
      after: "The organisation has approved AI use rules, prompt guidance, human review expectations and clear boundaries for sensitive information."
    }
  ];

  return (
    <section id="examples" ref={containerRef} className="bg-background-soft relative z-20" style={{ height: `${(examples.length * 100) + 100}vh` }}>
      
      <div className="sticky top-0 h-screen flex flex-col justify-center px-lg max-w-container-max mx-auto overflow-hidden">
        
        <div className="text-center mb-xl">
          <h2 className="font-headline-md text-headline-md text-primary mb-sm">Before and after examples</h2>
          <p className="font-body-lg text-on-surface-variant">See how scattered processes turn into clear systems.</p>
        </div>

        <div className="relative h-[60vh] max-w-5xl mx-auto w-full">
          {examples.map((ex, index) => {
            const start = index / examples.length;
            const end = start + (1 / examples.length);
            
            const opacity = useTransform(
              smoothProgress, 
              [Math.max(0, start - 0.1), start, end - 0.1, Math.min(1, end + 0.1)], 
              [0, 1, 1, 0]
            );
            
            const scale = useTransform(
              smoothProgress,
              [Math.max(0, start - 0.1), start, end - 0.1, Math.min(1, end + 0.1)],
              [0.9, 1, 1, 0.95]
            );

            // Animate Before -> After transition inside the card
            const beforeOpacity = useTransform(
              smoothProgress,
              [start, start + 0.05, start + 0.1],
              [1, 1, 0.3]
            );
            
            const afterOpacity = useTransform(
              smoothProgress,
              [start + 0.05, start + 0.15],
              [0, 1]
            );
            
            const afterY = useTransform(
              smoothProgress,
              [start + 0.05, start + 0.15],
              [20, 0]
            );

            return (
              <motion.div 
                key={index} 
                style={{ opacity, scale }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-white rounded-xxl p-xl border border-slate-200 shadow-2xl w-full flex flex-col gap-lg">
                  <h3 className="font-headline-lg text-primary text-center border-b border-slate-100 pb-md">{ex.title}</h3>
                  
                  <div className="grid md:grid-cols-2 gap-xl">
                    <motion.div style={{ opacity: beforeOpacity }} className="bg-error-container/30 p-lg rounded-xl border border-error/10">
                      <div className="flex items-center gap-sm mb-sm text-error">
                        <span className="material-symbols-outlined">warning</span>
                        <span className="font-bold uppercase tracking-widest text-xs">Before</span>
                      </div>
                      <p className="font-body-lg text-on-surface-variant">{ex.before}</p>
                    </motion.div>
                    
                    <motion.div style={{ opacity: afterOpacity, y: afterY }} className="bg-secondary-container p-lg rounded-xl border border-secondary/20 shadow-md">
                      <div className="flex items-center gap-sm mb-sm text-secondary-fixed-dim">
                        <span className="material-symbols-outlined">check_circle</span>
                        <span className="font-bold uppercase tracking-widest text-xs">After</span>
                      </div>
                      <p className="font-body-lg text-on-surface-variant text-primary font-medium">{ex.after}</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
