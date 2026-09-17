import React from 'react';
import { motion } from 'framer-motion';

const diagnosticChecks = [
  'what triggers the process',
  'who is involved',
  'what information is needed',
  'where work gets stuck',
  'what decisions need to be made',
  'what tools are already in use',
  'what sensitive information is involved',
  'what can realistically be maintained',
  'what risks need to be controlled'
];

export default function About() {
  return (
    <section className="py-xxl px-lg bg-surface-container-low overflow-hidden" id="about">
      <div className="max-w-container-max mx-auto">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-xxl items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.3 }}>
            {/* About section rewritten from supplied copy and stripped of unsupported social-proof claims. */}
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md">Practical workflow improvement and safe AI support for health practices.</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-md">
              Heutrix Labs helps GP clinics, allied health practices and specialist providers improve the operational work around patient care.
            </p>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg">
              Many practices do not need another vague technology pitch. They need someone to understand the actual workflow, reduce unnecessary manual handling and build something the team can realistically use.
            </p>
            <div className="p-lg bg-error-container text-on-error-container rounded-xl border-l-4 border-error">
              <div className="flex items-start gap-md">
                <span className="material-symbols-outlined mt-1" data-icon="warning">warning</span>
                <div>
                  <p className="font-label-md text-label-md font-bold mb-xs">Clear service boundaries</p>
                  <p className="font-body-sm text-body-sm">
                    Heutrix Labs provides workflow improvement, workflow automation, operations dashboards, safe AI setup and operational systems. It does not provide clinical advice, medical advice, legal advice, financial advice, tax advice, employment advice, regulatory advice, official audit services, NDIS registration readiness, audit readiness, evidence preparation, mock audit support, compliance gap assessments or assurance services.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true, amount: 0.3 }} className="space-y-lg">
            <div className="relative glass-card p-xl rounded-xxl border border-slate-200 shadow-xl overflow-hidden">
              <h3 className="font-headline-md text-headline-md mb-md text-primary">We diagnose before we build.</h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg">
                Good operational improvement starts with understanding the workflow. Before recommending a system, dashboard, automation or AI-supported workflow, we look at:
              </p>
              <ul className="grid sm:grid-cols-2 gap-sm">
                {diagnosticChecks.map((item) => (
                  <li key={item} className="flex items-start gap-xs font-body-md text-body-md text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-[18px]" data-icon="check">check</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-xl rounded-xxl border border-slate-200 shadow-sm">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-sm">Practice process expertise, not just tool setup.</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Heutrix Labs combines operational thinking with practical technology implementation. The work focuses on clearer ownership, fewer repeated admin steps, better visibility, safer AI use, better handovers, documented workflows and maintainable systems.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
