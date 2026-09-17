import React from 'react';
import { motion } from 'framer-motion';

export default function Problem() {
  // Pain-point list condensed from the supplied "Does this sound familiar?" section for faster scanning.
  const issues = [
    "follow-ups tracked in inboxes, spreadsheets or memory",
    "the same information copied between systems",
    "managers unable to see what is waiting, overdue or stuck",
    "handovers that depend on the person rather than the process",
    "inconsistent onboarding or admin steps",
    "reports that take too long to prepare",
    "risk, incident, complaint or evidence tracking gaps",
    "staff using AI tools without clear practice rules"
  ];

  return (
    <section className="py-xxl px-lg bg-primary text-on-primary relative z-20" id="problem">
      <div className="max-w-container-max mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.2 }} className="max-w-4xl mb-xxl">
          <h2 className="font-headline-md text-headline-md text-white mb-md drop-shadow-lg">Does this sound familiar?</h2>
          <p className="font-body-lg text-body-lg text-on-primary-fixed-variant">
            Even capable teams lose visibility when important work is spread across memory, inboxes and spreadsheets.
          </p>
        </motion.div>

        <h3 className="font-headline-md text-headline-md text-secondary-fixed mb-xl">You may notice:</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {issues.map((issue, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl p-lg border border-white/10 flex items-start gap-md hover:bg-white/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-secondary-fixed/20 text-secondary-fixed flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">adjust</span>
              </div>
              <p className="font-headline-sm text-headline-sm text-white pt-1">{issue}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.2 }} className="mt-xxl max-w-4xl">
          <p className="font-body-lg text-body-lg text-white font-medium border-l-4 border-secondary pl-lg">
            Heutrix Labs helps turn these pressure points into clearer workflows, practical tracking systems, safer AI guidance and better operational visibility.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
