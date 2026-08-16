import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15 } }
  };

  return (
    <section className="relative overflow-hidden min-h-[795px] flex items-center px-lg pt-[120px] pb-xxl lg:pt-[140px]" id="home">
      <div className="max-w-container-max mx-auto w-full relative z-10 grid lg:grid-cols-2 gap-xl items-center mt-lg lg:mt-0">
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="min-w-0">
          <motion.div variants={item} className="inline-flex items-center gap-sm bg-secondary-container text-on-secondary-container px-md py-xs rounded-full mb-lg shadow-sm border border-on-secondary-container/10">
            <span className="material-symbols-outlined text-[18px]" data-icon="settings_suggest">settings_suggest</span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest">Workflow systems for care-related service providers</span>
          </motion.div>
          <motion.h1 variants={item} className="font-display-lg text-display-lg-mobile md:text-[40px] lg:text-display-lg text-primary mb-md leading-tight">
            Practical workflow systems for allied health practices and disability support providers.
          </motion.h1>
          <motion.p variants={item} className="font-body-lg text-body-lg text-on-surface-variant mb-md max-w-xl">
            Heutrix Labs helps Australian care-related service providers clean up messy admin, scattered spreadsheets, manual follow-up, reporting gaps and unsafe AI use.
          </motion.p>
          <motion.p variants={item} className="font-body-lg text-body-lg text-on-surface-variant mb-xl max-w-xl">
            We map how the work actually happens, then build practical improvements such as workflow trackers, dashboards, automations, handover systems, evidence registers and safe AI rules.
          </motion.p>
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-md mb-md">
            <a className="flex items-center justify-center gap-sm bg-primary text-on-primary px-xl py-lg rounded-xl font-headline-sm hover:opacity-90 transition-all shadow-md group" href="#contact">
              Book a free fit call
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">arrow_forward</span>
            </a>
            <a className="flex items-center justify-center gap-sm border-2 border-primary text-primary px-xl py-lg rounded-xl font-headline-sm hover:bg-primary hover:text-on-primary transition-all" href="#services">
              View Services
            </a>
          </motion.div>
          <motion.p variants={item} className="font-body-sm text-body-sm text-on-surface-variant italic max-w-xl">
            For practice managers, provider owners and operational leads who need clearer workflows, better visibility and safer use of technology without disrupting service delivery.
          </motion.p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
          className="hidden lg:block relative min-w-0"
        >
          <div className="relative p-lg rounded-xxl overflow-hidden bg-white shadow-2xl border border-slate-200 h-[500px] flex flex-col">
            <div className="border-b border-slate-100 pb-4 mb-4 flex flex-col xl:flex-row xl:justify-between xl:items-end gap-3">
              <div>
                <h3 className="font-headline-sm text-primary">Operations dashboard</h3>
                <p className="text-body-sm text-on-surface-variant">Work that needs attention • Provider view</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-error-container text-error px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">Overdue — 3</span>
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">Needs review — 4</span>
                <span className="bg-surface-variant text-on-surface-variant px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">Waiting — 2</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto rounded-lg border border-slate-100 bg-surface">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container text-primary font-label-md">
                  <tr>
                    <th className="p-4 border-b border-slate-200">Workflow</th>
                    <th className="p-4 border-b border-slate-200">Status</th>
                    <th className="p-4 border-b border-slate-200">Next action</th>
                  </tr>
                </thead>
                <tbody className="text-body-sm text-on-surface-variant divide-y divide-slate-100 bg-white">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-primary">Referral tracker</td>
                    <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Owner set</span></td>
                    <td className="p-4 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-400"></span>Next action due</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-primary">Onboarding checklist</td>
                    <td className="p-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">In review</span></td>
                    <td className="p-4 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-400"></span>Two tasks open</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-primary">Reporting preparation</td>
                    <td className="p-4"><span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">Inputs received</span></td>
                    <td className="p-4 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-slate-400"></span>Manager review</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-md rounded-xl border border-slate-200 shadow-xl max-w-[240px]">
              <p className="font-label-md text-primary font-bold mb-1">Workflow first. Technology second.</p>
              <p className="font-body-sm text-on-surface-variant leading-tight">Built around ownership, handover, privacy and realistic maintenance.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
