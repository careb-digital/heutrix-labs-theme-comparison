import React from 'react';
import { motion } from 'framer-motion';
import { resources } from '../siteContent';

export default function Checklist() {
  const scorecard = resources[0];

  return (
    <section className="bg-surface-container-low px-lg py-xxl" id="workflow-scorecard">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative mx-auto grid max-w-container-max gap-xl overflow-hidden rounded-xxl bg-primary p-xl text-on-primary shadow-xl md:p-xxl lg:grid-cols-[1.2fr_0.8fr] lg:items-center"
      >
        <div className="relative z-10">
          <p className="mb-sm font-label-md text-label-md uppercase text-secondary-fixed">Free, ungated workflow tool</p>
          <h2 className="mb-md font-display-lg text-display-lg-mobile text-white md:text-display-lg">{scorecard.title}</h2>
          <p className="mb-md font-body-lg text-body-lg text-inverse-on-surface">{scorecard.summary}</p>
          <p className="mb-xl font-body-md text-body-md text-inverse-on-surface">{scorecard.outcome}</p>
          <div className="flex flex-col gap-md sm:flex-row sm:flex-wrap">
            <a
              className="inline-flex items-center justify-center gap-sm rounded-xl border border-secondary-fixed bg-secondary-fixed px-lg py-md font-headline-sm text-[18px] leading-6 text-on-secondary-fixed shadow-md transition-opacity hover:opacity-95"
              href={scorecard.guideHref}
              download
              data-resource-id={scorecard.id}
              data-resource-format="pdf"
            >
              <span>Download the PDF guide</span>
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">download</span>
            </a>
            <a
              className="inline-flex items-center justify-center gap-sm rounded-xl border border-white bg-transparent px-lg py-md font-headline-sm text-[18px] leading-6 text-white transition-colors hover:bg-white hover:text-primary"
              href={scorecard.workbookHref}
              download
              data-resource-id={scorecard.id}
              data-resource-format="xlsx"
            >
              <span>Download the workbook</span>
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">table_view</span>
            </a>
          </div>
          <p className="mt-md font-body-sm text-body-sm text-inverse-on-surface">
            No email required. Use general, non-sensitive workflow descriptions only.
          </p>
        </div>
        <div className="relative z-10 rounded-xl border border-white/15 bg-white/10 p-lg backdrop-blur-sm">
          <p className="mb-md font-headline-sm text-headline-sm text-white">What it scores</p>
          <ul className="grid gap-sm font-body-md text-body-md text-inverse-on-surface sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {['Frequency', 'Staff effort', 'Handoffs', 'Delay impact', 'Error and rework', 'Visibility gap', 'Change feasibility', 'Evidence confidence'].map((item) => (
              <li key={item} className="flex items-center gap-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-secondary-fixed" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a className="mt-lg inline-flex items-center gap-sm font-label-md text-label-md text-secondary-fixed underline decoration-secondary-fixed/60 underline-offset-4" href="/resources">
            View all three starter resources
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
