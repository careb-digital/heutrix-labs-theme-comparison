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
    <section className="relative overflow-hidden min-h-[795px] flex items-center px-lg pt-[132px] pb-xxl" id="home">
      <div className="max-w-container-max mx-auto w-full relative z-10 grid lg:grid-cols-2 gap-xl items-center">
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          {/* Updated from supplied production copy: sharper audience, offer, and CTA language. */}
          <motion.div variants={item} className="inline-flex items-center gap-sm bg-secondary-container text-on-secondary-container px-md py-xs rounded-full mb-lg shadow-sm border border-on-secondary-container/10">
            <span className="material-symbols-outlined text-[18px]" data-icon="verified">verified</span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest">Workflow systems for Australian health practices</span>
          </motion.div>
          <motion.h1 variants={item} className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md leading-tight">
            Workflow systems, automation and safe AI support for Australian health practices.
          </motion.h1>
          <motion.p variants={item} className="font-body-lg text-body-lg text-on-surface-variant mb-md max-w-xl">
            Heutrix Labs helps GP clinics, allied health practices and specialist providers clean up messy admin, scattered spreadsheets, manual follow-up and unsafe AI use.
          </motion.p>
          <motion.p variants={item} className="font-body-lg text-body-lg text-on-surface-variant mb-md max-w-xl">
            We map how the work actually happens, then build practical improvements such as workflow trackers, dashboards, automations, handover systems and safe AI rules.
          </motion.p>
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-md mb-md">
            <a className="flex items-center justify-center gap-sm bg-primary text-on-primary px-xl py-lg rounded-xl font-headline-sm hover:opacity-90 transition-all shadow-md group whitespace-nowrap" href="#contact">
              Book a free fit call
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">arrow_forward</span>
            </a>
            <a className="flex items-center justify-center gap-sm border-2 border-primary text-primary px-xl py-lg rounded-xl font-headline-sm hover:bg-primary hover:text-on-primary transition-all" href="#checklist">
              Download the workflow checklist
            </a>
          </motion.div>
          <motion.p variants={item} className="font-body-sm text-body-sm text-on-surface-variant italic max-w-xl">
            For practice owners and managers who need clearer workflows, better visibility and safer use of technology without disrupting patient care.
          </motion.p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
          className="hidden lg:block"
        >
          <div className="relative p-lg rounded-xxl overflow-hidden bg-white shadow-2xl border border-slate-200">
            <img alt="Operations Dashboard" className="rounded-xl w-full h-[500px] object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZE6OKQ5bJ9PCNRZbFYz_Wv9wn5UwhHvktLaV1sU0ihN5G_3ly6hMBVxeRO35AU-eyp0c7FNEBSCbSXNHUF1XcFTFi74M6xPGnkf9qhKDF__rPoWWYGTxalDg69nzb6HFMbWtYsedzAj0U_KLeiim0JKwhdi9u820K8pCe3f861GgGk-EW1Nyq8C7VojOMp0BUj7YFQsf6l0cPfFYlYXrg2LPkdbVh3aqHGnoo-sKY-TvycYmoT0mpwoDn5tBAY3NvWJKrPaus_t85"/>
            <div className="absolute bottom-12 left-12 right-12 bg-white/90 backdrop-blur-md p-lg rounded-xl border border-slate-200 shadow-xl">
              <div className="flex items-center gap-md">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined" data-icon="visibility">visibility</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-primary">Workflow first. Technology second.</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Practical systems for daily practice work</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
