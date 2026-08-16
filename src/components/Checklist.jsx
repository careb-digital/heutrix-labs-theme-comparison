import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Checklist() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section className="py-xxl px-lg" id="checklist" ref={containerRef}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-container-max mx-auto bg-primary text-on-primary rounded-xxl p-xl md:p-xxl relative overflow-hidden flex flex-col md:flex-row items-center gap-xl"
      >
        <div className="relative z-10 flex-1">
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-md">Download the Practice Workflow Opportunity Checklist</h2>
          <p className="font-body-lg text-body-lg text-slate-300 mb-xl">Find the admin and operational workflows your practice should stop managing manually. Use this checklist to identify repeated admin, manual follow-up, duplicated data entry, reporting gaps, and unclear handovers.</p>
          <button className="bg-secondary-fixed text-on-secondary-fixed px-xl py-lg rounded-xl font-headline-sm hover:scale-105 transition-transform flex items-center gap-md">
            <span className="material-symbols-outlined" data-icon="download">download</span>
            Download the Checklist
          </button>
        </div>
        <div className="relative z-10 flex-1 hidden lg:block">
          <motion.div style={{ y: parallaxY }} className="bg-white/10 backdrop-blur-md p-lg rounded-xl border border-white/20 rotate-3 transform shadow-2xl">
            <img alt="Checklist Preview" className="rounded-lg w-full h-auto shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPEz3ronE3xNYG45Wfa7YhUbGtQXxRpenB-kBWi1Ee1A7kxMAlEKNFZXX1ECOWMM1gA4irAYTFSzFu3V0_AuViKXAF9vIOrkuMW1KZWHX8_uZGpIPtyp7mPtZFei-X58JeR8o3xayU8CmXKLCvp6ew9UPOVMblg1zwIbH1rHeE3xL-eaEWtgwMcaxr-q3i0l8oMqic0PYPeTBjA2mzCK8ACBDaB2Ic4zN-HWSX1QLT-PTEETSWDcijo7ya9hAqj05jAojImtxsCCzo"/>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
