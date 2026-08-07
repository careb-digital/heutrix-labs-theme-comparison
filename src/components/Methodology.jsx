import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const StickySection = ({ title, eyebrow, children, bgColor = "bg-surface" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [50, 0, 0, -50]);
  
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.85, 1], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0.1, 0.25, 0.85, 1], [100, 0, 0, -100]);
  const contentFilter = useTransform(scrollYProgress, [0.1, 0.25, 0.85, 1], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);

  const titleColor = bgColor === "bg-primary" ? "text-white" : "text-primary";

  return (
    <section ref={ref} className={`h-[250vh] ${bgColor} relative z-20`}>
      <div className="sticky top-0 h-screen flex flex-col md:flex-row items-center justify-center px-lg gap-xl max-w-container-max mx-auto overflow-hidden">
        <motion.div style={{ opacity: titleOpacity, y: titleY }} className="flex-1">
          {eyebrow && <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed mb-sm block">{eyebrow}</span>}
          <h2 className={`font-headline-md text-headline-md ${titleColor}`}>{title}</h2>
        </motion.div>
        <motion.div style={{ opacity: contentOpacity, y: contentY, filter: contentFilter }} className="flex-1 w-full max-w-2xl">
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default function Methodology() {
  const capabilities = [
    "Workflow diagnostics",
    "Admin process mapping",
    "Workflow automation",
    "Operations dashboards",
    "Internal trackers and registers",
    "Evidence registers",
    "Incident and complaint tracking workflows",
    "Staff handover systems",
    "Onboarding workflows",
    "Reporting preparation workflows",
    "Safe AI rules and staff guidance",
    "Lightweight internal workflow tools"
  ];

  const methodSteps = [
    { title: "Diagnostics", desc: "Understanding core problems and finding workflow gaps." },
    { title: "Triage", desc: "Pinpoint and prioritise crucial bottlenecks." },
    { title: "Automation", desc: "Automate and reduce repeated admin." },
    { title: "Handover", desc: "Guidance with your new solution." }
  ];

  return (
    <div className="bg-surface relative" id="methodology">
      
      {/* Section 1: Methodology - We diagnose before we build */}
      <StickySection eyebrow="Workflow first" title="We diagnose before we build." bgColor="bg-surface-container-low">
        <div className="space-y-lg bg-white p-xl rounded-xxl shadow-xl border border-slate-200">
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Good operational improvement starts with understanding the workflow. Before recommending a system, dashboard, automation or AI-supported workflow, we look at what triggers the process, who is involved, where work gets stuck, and what risks need to be controlled. Then we recommend the simplest useful solution.
          </p>
          <p className="font-label-md text-primary font-bold">Built for Australian care-related providers</p>
          
          <div className="mt-xl space-y-md">
            <h3 className="font-headline-sm text-primary border-b border-slate-100 pb-sm">The Heutrix Method</h3>
            <div className="space-y-sm">
              {methodSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-sm">
                  <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-sm shrink-0">{i + 1}</div>
                  <div>
                    <span className="font-bold text-primary">{step.title}</span> <span className="text-on-surface-variant">— {step.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </StickySection>

      {/* Section 2: What Heutrix Labs does */}
      <StickySection title="What Heutrix Labs does" bgColor="bg-primary">
        <div className="bg-white/10 backdrop-blur-md p-xl rounded-xxl border border-white/20">
          <p className="font-body-lg text-white mb-xl">
            Heutrix Labs helps care-related service providers improve the internal systems that sit around client care and service delivery. We are not here to replace your core practice, client or case management software.
          </p>
          <ul className="grid sm:grid-cols-2 gap-sm">
            {capabilities.map((item, i) => (
              <li key={i} className="flex items-start gap-xs font-body-sm text-white/90">
                <span className="material-symbols-outlined text-secondary-fixed text-[18px] shrink-0 mt-0.5" data-icon="check_circle">check_circle</span> 
                {item}
              </li>
            ))}
          </ul>
        </div>
      </StickySection>

      {/* Section 3: Cinematic Typography Blocks for Outro */}
      <section className="py-xxl px-lg max-w-5xl mx-auto space-y-[15vh] relative z-20 bg-surface my-[10vh]">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, amount: 0.5 }}>
          <h2 className="font-headline-md text-headline-md text-primary mb-md">Make your organisation easier to run without compromising trust.</h2>
          <p className="font-headline-md text-headline-md text-on-surface-variant font-normal">
            Allied health practices and disability support providers do not need technology for its own sake. They need systems that support the people already doing the work.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, amount: 0.5 }}>
          <p className="font-headline-md text-headline-md text-on-surface-variant font-normal">
            As services grow, the operational work around client care and service delivery can become harder to coordinate. Enquiries need follow-up. Referrals need tracking. Documents need to be collected. Staff need clear handovers. Managers need to know what is happening without chasing updates.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, amount: 0.5 }}>
          <p className="font-headline-md text-headline-md text-on-surface-variant font-normal">
            Heutrix Labs starts by understanding how your work actually happens, then recommends practical improvements that are safe, maintainable and useful in daily operations.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, amount: 0.5 }} className="bg-surface-container-low p-xl rounded-xl border border-slate-200">
          <h3 className="font-headline-sm text-primary mb-md">Who we help</h3>
          <ul className="grid sm:grid-cols-2 gap-y-sm gap-x-lg">
            {[
              "Allied health practices",
              "Disability support providers",
              "Specialist health providers",
              "Multidisciplinary care teams",
              "Practice managers and operations leads",
              "Provider owners managing growth, admin risk or reporting pressure"
            ].map((who, i) => (
              <li key={i} className="flex items-center gap-xs font-body-md text-on-surface-variant">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>
                {who}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

    </div>
  );
}
